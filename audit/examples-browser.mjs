import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=fileURLToPath(new URL('../',import.meta.url));
const baseline=JSON.parse(fs.readFileSync(root+'audit/scope-inventory.json')).local;
const report={tests:[],errors:[],network:[],matrix:[],captured:new Date().toISOString()};
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname.replace(/^\/skills-revision-reader/, '');
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.svg')?'image/svg+xml':'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}/skills-revision-reader/`;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const contexts=[];
async function fresh(setup){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});contexts.push(context);
  if(setup)await context.addInitScript(setup);
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)report.network.push({url:r.url(),status:r.status()});});
  return page;
}
async function test(name,fn){try{await fn();report.tests.push({name,pass:true});}catch(e){report.tests.push({name,pass:false,error:e.message});}}
async function jump(page,id){await page.fill('#jump-input',String(id));await page.click('#jump-button');}
try {
  const page=await fresh();await page.goto(url);
  await test('every question has one lazy disclosure and unchanged answer',async()=>{
    const actual=await page.locator('.question-block').evaluateAll(es=>es.map(e=>({number:+e.dataset.number,title:e.querySelector('.question-title').textContent.trim(),answer:[...e.querySelectorAll('.part-body')].map(n=>n.textContent.trim()).join('\n'),toggles:e.querySelectorAll('[data-example-toggle]').length,empty:!e.querySelector('.question-example').childElementCount})));
    assert.equal(actual.length,358);
    for(const q of actual){const old=baseline.questions.find(o=>o.number===q.number);assert.equal(q.title,old.title);assert.equal(q.answer,old.answer);assert.equal(q.toggles,1);assert.equal(q.empty,true);}
  });
  await test('all 358 disclosures render exact text and valid associations',async()=>{
    const result=await page.evaluate(()=>{
      const failures=[];
      for(const q of document.querySelectorAll('.question-block')){
        const n=+q.dataset.number, data=window.READER_QUESTION_EXAMPLES[n];
        const toggle=q.querySelector('[data-example-toggle]');toggle.click();
        const panel=document.getElementById(toggle.getAttribute('aria-controls'));
        if(panel.hidden||toggle.getAttribute('aria-expanded')!=='true'||panel.querySelector('code').textContent!==data.code||panel.querySelector('.example-explanation').textContent!==data.explanation)failures.push(n);
        if(!panel.querySelector('a').href.startsWith('https://')||!panel.querySelector('a').rel.includes('noopener'))failures.push(n);
        toggle.click();if(!panel.hidden)failures.push(n);
      }return failures;
    });assert.deepEqual(result,[]);
  });
  await test('recall hides both code and diagrams until revealed',async()=>{
    for(const id of [8,315]){
      await jump(page,id);await page.locator(`#q-${id} .example-toggle`).click();
      await page.click('[data-mode="recall"]');
      assert.equal(await page.locator(`#q-${id} .question-example`).isVisible(),false);
      await page.locator(`#q-${id} .reveal-answer`).click();
      assert.equal(await page.locator(`#q-${id} .question-example`).isVisible(),true);
      await page.click('[data-mode="review"]');
    }
  });
  await test('disclosures, review state and explicit All persist on reload',async()=>{
    await page.selectOption('#position-filter','');await jump(page,8);
    await page.locator('#q-8 .review-button').click();await page.waitForTimeout(300);await page.reload();
    assert.equal(await page.locator('#q-8 .example-toggle').getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('#q-315 .example-toggle').getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('#overall-progress').textContent(),'1/358');
    assert.equal(await page.inputValue('#position-filter'),'');
  });
  await test('copy exact snippet and denied clipboard fallback',async()=>{
    await page.context().grantPermissions(['clipboard-read','clipboard-write']);
    await page.locator('#q-8 .example-copy').click();
    await page.waitForFunction(()=>document.querySelector('#q-8 .example-copy-status').textContent==='Copied');
    assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),await page.locator('#q-8 code').textContent());
    await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('denied'))}});});
    await page.locator('#q-8 .example-copy').click();
    await page.waitForFunction(()=>document.querySelector('#q-8 .example-copy-status').textContent.startsWith('Selected'));
    assert.equal(await page.evaluate(()=>window.getSelection().toString()),await page.locator('#q-8 code').textContent());
  });
  await test('keyboard disclosure, rapid toggles and no accidental review',async()=>{
    const toggle=page.locator('#q-8 .example-toggle');await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    await page.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    await toggle.evaluate(e=>{for(let i=0;i<20;i++)e.click();});assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('#overall-progress').textContent(),'1/358');
  });
  await test('role order agrees across sidebar, groups and next navigation',async()=>{
    const expected={
      'sde-1':[14,11,15,16,1,10,2,17],
      'frontend-react':[1,4,3,2,9,5,6],
      'backend-node':[1,7,9,11,10,12,8,2],
      'genai-app':[13,9,7,1,12,2,8,4,3],
    };
    await page.click('[data-frequency-filter="all"]');
    for(const [role,order] of Object.entries(expected)){
      await page.selectOption('#position-filter',role);await page.click('[data-section-button="all"]');
      const actual=await page.locator('[data-section-button]:not([hidden])').evaluateAll(es=>es.map(e=>e.dataset.sectionButton).filter(s=>s!=='all').map(s=>+s.split('-')[1]));assert.deepEqual(actual,order);
      const result=await page.evaluate(()=>{
        const qs=[...document.querySelectorAll('.question-block:not([hidden])')];
        return {order:[...new Set(qs.map(q=>+q.dataset.section.split('-')[1]))],bad:qs.filter((q,i)=>q.querySelector('[data-question-nav="next"]').getAttribute('href')!==(qs[i+1]?'#'+qs[i+1].id:'#')).map(q=>q.id)};
      });assert.deepEqual(result.order,order);assert.deepEqual(result.bad,[]);
    }
  });
  await test('example text is searchable while still collapsed',async()=>{
    await page.selectOption('#position-filter','');await page.click('[data-section-button="all"]');await page.fill('#search','makeCounter');
    assert.equal(await page.locator('#q-8').isVisible(),true);await page.fill('#search','');
  });
  await test('open code and diagram at seven widths in both themes',async()=>{
    fs.mkdirSync(root+'audit/examples-screenshots',{recursive:true});
    for(const width of [320,390,720,999,1000,1180,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:1000});
      if(await page.locator('html').getAttribute('data-theme')!==theme)await page.click('#theme-button');
      for(const id of [8,315]){
        await jump(page,id);
        if(await page.locator(`#q-${id} .example-toggle`).getAttribute('aria-expanded')==='false')await page.locator(`#q-${id} .example-toggle`).click();
        await page.locator(`#q-${id} .example-toggle`).scrollIntoViewIfNeeded();
        const layout=await page.evaluate(id=>{
          const q=document.getElementById('q-'+id),pre=q.querySelector('pre.example-code'),toggle=q.querySelector('.example-toggle'),copy=q.querySelector('.example-copy');
          const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
          return {overflow:document.documentElement.scrollWidth-innerWidth,toggleHeight:toggle.getBoundingClientRect().height,copyHeight:copy.getBoundingClientRect().height,codeWidth:pre.clientWidth,scrollWidth:pre.scrollWidth,unique:new Set(ids).size===ids.length};
        },id);
        assert(layout.overflow<=1);assert(layout.unique);assert(layout.toggleHeight>=44&&layout.copyHeight>=44);
        if(layout.scrollWidth>layout.codeWidth){await page.locator(`#q-${id} .example-code`).evaluate(e=>e.scrollLeft=e.scrollWidth);assert(await page.locator(`#q-${id} .example-code`).evaluate(e=>e.scrollLeft>0));await page.locator(`#q-${id} .example-code`).evaluate(e=>e.scrollLeft=0);}
        await page.screenshot({path:root+`audit/examples-screenshots/${width}-${theme}-${id}.png`});
        report.matrix.push({width,theme,id,...layout});
      }
    }
  });
  await test('all 358 expanded examples fit the page at every width and theme',async()=>{
    await page.setViewportSize({width:1440,height:1000});
    await page.selectOption('#position-filter','');await page.click('[data-frequency-filter="all"]');await page.click('[data-section-button="all"]');await page.fill('#search','');
    await page.evaluate(()=>{for(const q of document.querySelectorAll('.question-block')){q.querySelector('details').open=true;const toggle=q.querySelector('.example-toggle');if(toggle.getAttribute('aria-expanded')==='false')toggle.click();}});
    report.allExamplesMatrix=[];
    for(const width of [320,390,720,999,1000,1180,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:1000});
      if(await page.locator('html').getAttribute('data-theme')!==theme)await page.click('#theme-button');
      const layout=await page.evaluate(()=>{
        const bad=[];
        for(const q of document.querySelectorAll('.question-block')){
          const panel=q.querySelector('.question-example');const rect=panel.getBoundingClientRect();
          const copy=panel.querySelector('.example-copy').getBoundingClientRect();
          if(rect.right>innerWidth+1||rect.left<0||copy.right>rect.right+1||copy.left<rect.left||panel.hidden)bad.push(q.id);
        }
        return {bad,overflow:document.documentElement.scrollWidth-innerWidth,count:document.querySelectorAll('.question-example:not([hidden])').length};
      });assert.deepEqual(layout.bad,[]);assert(layout.overflow<=1);assert.equal(layout.count,358);report.allExamplesMatrix.push({width,theme,...layout});
    }
  });
  await test('untrusted example content remains inert',async()=>{
    const p=await fresh();await p.route('**/question-examples.js*',route=>route.fulfill({contentType:'text/javascript',body:fs.readFileSync(root+'question-examples.js','utf8')+'\nwindow.READER_QUESTION_EXAMPLES[1].code="<img src=x onerror=window.injected=true>";'}));
    await p.goto(url+'#q-1');await p.locator('#q-1 .example-toggle').click();assert.equal(await p.locator('#q-1 img').count(),0);assert.equal(await p.evaluate(()=>window.injected),undefined);
  });
  await test('missing examples do not prevent reading or reviewing',async()=>{
    const p=await fresh();await p.route('**/question-examples.js*',route=>route.fulfill({contentType:'text/javascript',body:''}));
    await p.goto(url+'#q-1');assert.equal(await p.locator('.example-warning').isVisible(),true);
    await p.locator('#q-1 .review-button').click();assert.equal(await p.locator('#overall-progress').textContent(),'1/358');
  });
  await test('malformed example state and denied storage remain usable',async()=>{
    for(const invalid of ['wrong type',[1,1,241,999,null,'8']]){
      const p=await fresh();await p.addInitScript(value=>{localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');localStorage.setItem('skills-reader-reviewed-v2','[1,241,419]');localStorage.setItem('skills-reader-view-state-v1',JSON.stringify({exampleQuestions:value}));Storage.prototype.setItem=()=>{throw Error('denied');};},invalid);
      await p.goto(url+'#q-1');await p.locator('#q-1 .example-toggle').click();assert.equal(await p.locator('#overall-progress').textContent(),'2/358');
    }
  });
}finally{for(const c of contexts)await c.close();await browser.close();await new Promise(r=>server.close(r));}
fs.writeFileSync(root+'audit/examples-browser.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,matrix:report.matrix.length},null,2));
if(report.tests.some(t=>!t.pass)||report.errors.length||report.network.length)process.exitCode=1;
