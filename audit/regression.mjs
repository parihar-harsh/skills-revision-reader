import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const baseline=JSON.parse(fs.readFileSync(path.join(root,'audit/baseline.json'))).local;
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/skills-revision-reader/,''));
  if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404).end();return;}
  const target=fs.statSync(file).isDirectory()?path.join(file,'index.html'):file;
  res.setHeader('Content-Type',target.endsWith('.js')?'text/javascript':target.endsWith('.svg')?'image/svg+xml':'text/html');
  res.end(fs.readFileSync(target));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=process.env.AUDIT_URL||`http://127.0.0.1:${server.address().port}/skills-revision-reader/`;
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const report={url:base,tests:[],errors:[],matrix:[],network:[]};
const contexts=[];
async function fresh(options={},setup) {
  const c=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',...options});contexts.push(c);
  if(setup)await c.addInitScript(setup);
  const p=await c.newPage();
  p.on('pageerror',e=>report.errors.push(e.message));
  p.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await p.goto(base,{waitUntil:'load'});return p;
}
async function test(name,fn){try{await fn();report.tests.push({name,pass:true});}catch(e){report.tests.push({name,pass:false,error:e.message});}}
const visible=p=>p.locator('.question-block:not([hidden])').evaluateAll(es=>es.map(e=>Number(e.dataset.number)));
async function all(p){await p.selectOption('#position-filter','');await p.click('[data-frequency-filter="all"]');await p.click('[data-section-button="all"]');}
try {
  const p=await fresh();
  await test('default SDE and inventory identity',async()=>{
    assert.equal(await p.inputValue('#position-filter'),'sde-1');
    assert.equal(await p.locator('.question-block').count(),419);
    const actual=await p.locator('.question-block').evaluateAll(es=>es.map(e=>({number:+e.dataset.number,id:e.id,title:e.querySelector('.question-title').textContent.trim(),section:e.dataset.section,priority:e.dataset.frequency})));
    assert.deepEqual(actual,baseline.questions.map(({number,id,title,section,priority})=>({number,id,title,section,priority})));
  });
  await test('288 role/section/priority combinations and progress',async()=>{
    const result=await p.evaluate(b=>{
      const errors=[];let count=0;
      for(const [role,ids] of Object.entries(b.roles))for(const freq of ['all','high'])for(const s of b.sections){
        const select=document.querySelector('#position-filter');select.value=role==='all'?'':role;select.dispatchEvent(new Event('change'));
        document.querySelector(`[data-frequency-filter='${freq}']`).click();document.querySelector(`[data-section-button='${s.id}']`).click();
        const expected=b.questions.filter(q=>ids.includes(q.number)&&(s.id==='all'||q.section===s.id)&&(freq==='all'||q.priority==='high')).map(q=>q.number);
        const actual=[...document.querySelectorAll('.question-block:not([hidden])')].map(e=>+e.dataset.number);
        if(JSON.stringify(expected)!==JSON.stringify(actual)||document.querySelector('#view-progress-copy').textContent!==`0 of ${expected.length} reviewed`)errors.push({role,freq,section:s.id});
        if(s.id!=='all'&&document.querySelector(`[data-section-progress='${s.id}']`).textContent!==`0/${expected.length}`)errors.push({role,freq,section:s.id,sidebar:true});count++;
      }return {count,errors};
    },baseline);assert.deepEqual(result.errors,[]);assert.equal(result.count,288);
  });
  await test('scoped category summary',async()=>{
    await p.selectOption('#position-filter','sde-1');await p.click('[data-frequency-filter="all"]');await p.click('[data-section-button="all"]');
    const count=new Set(baseline.questions.filter(q=>q.roles.includes('sde-1')).map(q=>q.section)).size;
    assert((await p.locator('#view-meta').textContent()).includes(`across ${count} skill categories`));
  });
  await test('Next preserves All sections and search',async()=>{
    await all(p);await p.locator('#q-1 summary').click();await p.locator('#q-1 [data-question-nav="next"]').click();
    await p.waitForTimeout(100);assert.equal(await p.locator('[data-section-button="all"]').getAttribute('aria-pressed'),'true');
    assert.equal((await visible(p)).length,419);
    await p.fill('#search','what is');const before=await visible(p);
    const n=before[0];await p.locator(`#q-${n} details`).evaluate(e=>e.open=true);await p.locator(`#q-${n} [data-question-nav="next"]`).click();
    await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');assert.deepEqual(await visible(p),before);
    await p.goBack();await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');
    await p.goForward();await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');
  });
  await test('exact question-number search and clear',async()=>{
    await all(p);for(const query of ['1','Q1','q-1','419']) {await p.fill('#search',query);assert.deepEqual(await visible(p),[query==='419'?419:1]);}
    await p.press('#search','Escape');assert.equal((await visible(p)).length,419);
  });
  await test('title, answer, topic, XSS string and empty state',async()=>{
    await all(p);
    for(const query of ['closure','lexical environment','TYPESCRIPT','<img src=x onerror=alert(1)>','no-such-question-xxxx']) {
      await p.fill('#search',query);const expected=await p.locator('.question-block').evaluateAll((es,q)=>es.filter(e=>e.dataset.search.includes(q.toLowerCase())).map(e=>+e.dataset.number),query);
      assert.deepEqual(await visible(p),expected);
    }
    assert.equal(await p.locator('#continue-unreviewed').textContent(),'No questions');
    assert.equal(await p.locator('#continue-unreviewed').isDisabled(),true);
  });
  await test('review/hide/recall/reveal/refresh and explicit All persistence',async()=>{
    await all(p);await p.fill('#search','');await p.fill('#jump-input','419');await p.click('#jump-button');
    await p.locator('#q-419 .review-button').click();assert.equal(await p.locator('#overall-progress').textContent(),'1/419');
    await p.check('#hide-reviewed');assert.equal(await p.locator('#q-419').isVisible(),false);
    await p.click('#jump-button');assert.equal(await p.locator('#q-419').isVisible(),true);
    await p.click('button[data-mode="recall"]');assert.equal(await p.locator('#q-419 .answer-content').isVisible(),false);
    await p.locator('#q-419 .reveal-answer').click();await p.waitForTimeout(300);await p.reload();
    assert.equal(await p.locator('#q-419 .answer-content').isVisible(),true);assert.equal(await p.locator('#overall-progress').textContent(),'1/419');
    assert.equal(await p.inputValue('#position-filter'),'');
  });
  await test('first/last, invalid jump, expansion and rapid toggles',async()=>{
    await all(p);await p.fill('#search','');await p.click('#expand-visible');
    assert.equal(await p.locator('.question-block details[open]').count(),419);
    assert.equal(await p.locator('#q-1 [data-question-nav="previous"]').getAttribute('aria-disabled'),'true');
    assert.equal(await p.locator('#q-408 [data-question-nav="next"]').getAttribute('aria-disabled'),'true');
    await p.click('#collapse-visible');assert.equal(await p.locator('.question-block details[open]').count(),0);
    const before=await visible(p);await p.fill('#jump-input','420');await p.click('#jump-button');assert.deepEqual(await visible(p),before);
    await p.locator('#q-1 summary').click();await p.locator('#q-1 .reveal-answer').click();
    await p.locator('#q-1 .review-button').evaluate(e=>{for(let i=0;i<20;i++)e.click();});
    assert.equal(await p.locator('#q-1 .review-button').getAttribute('aria-pressed'),'false');
  });
  await test('reset confirmation cancel/accept',async()=>{
    p.once('dialog',d=>d.dismiss());await p.click('#reset-progress');assert.equal(await p.locator('#overall-progress').textContent(),'1/419');
    p.once('dialog',d=>d.accept());await p.click('#reset-progress');assert.equal(await p.locator('#overall-progress').textContent(),'0/419');
  });
  await test('mobile closed drawer excluded from keyboard focus',async()=>{
    await p.setViewportSize({width:390,height:844});
    assert.equal(await p.locator('#sidebar').evaluate(e=>e.inert||getComputedStyle(e).visibility==='hidden'),true);
    await p.click('#menu-button');await p.waitForTimeout(50);assert.equal(await p.locator('#menu-button').getAttribute('aria-expanded'),'true');
    await p.keyboard.press('Escape');assert.equal(await p.locator('#menu-button').getAttribute('aria-expanded'),'false');
    assert.equal(await p.locator('#menu-button').evaluate(e=>e===document.activeElement),true);
    await p.click('#menu-button');await p.setViewportSize({width:1000,height:900});
    assert.equal(await p.locator('body').evaluate(e=>e.classList.contains('sidebar-open')),false);
  });
  await test('matrix, theme persistence, no overflow or duplicate IDs',async()=>{
    fs.mkdirSync(path.join(root,'audit/screenshots'),{recursive:true});
    for(const width of [320,390,720,999,1000,1180,1440])for(const theme of ['light','dark']){
      await p.setViewportSize({width,height:900});if(await p.locator('html').getAttribute('data-theme')!==theme)await p.click('#theme-button');
      await p.fill('#jump-input','2');await p.click('#jump-button');await p.click('button[data-mode="review"]');
      assert.equal(await p.locator('body').getAttribute('data-mode'),'review');
      assert.equal(await p.locator('button[data-mode="review"]').getAttribute('aria-pressed'),'true');
      await p.evaluate(()=>window.scrollTo(0,0));
      const layout=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,ids:[...document.querySelectorAll('[id]')].map(e=>e.id)}));
      assert(layout.scroll<=width+1);assert.equal(new Set(layout.ids).size,layout.ids.length);
      await p.screenshot({path:path.join(root,`audit/screenshots/${width}-${theme}.png`)});
      report.matrix.push({width,theme,overflow:layout.scroll-width});
    }
    await p.reload();assert.equal(await p.locator('html').getAttribute('data-theme'),'dark');
  });
  await test('linked companion pages',async()=>{
    for(const file of ['roadmap.html','live-coding.html']) {
      const link=p.locator(`.product-link[href="${file}"]`);assert.equal(await link.count(),1);
      const r=await p.request.get(new URL(file,base).href);assert.equal(r.status(),200);report.network.push({file,status:r.status()});
    }
  });
  for(const fixture of [
    {name:'current progress and saved All',schema:true,progress:[1,238,348,419],expected:[1,238,348,419],state:{activeRole:null,activeSection:'all'}},
    {name:'legacy renumbering',progress:[1,238,254,313],expected:[1,250,288,347],state:{activeRole:null,activeSection:'all'}},
    {name:'malformed state with valid progress',schema:true,progress:[419],expected:[419],raw:'{bad'},
    {name:'invalid IDs ignored',schema:true,progress:[0,1,419,420,-1,'2',null,1.5],expected:[1,419],state:{activeRole:'bogus',activeSection:'bogus'}},
    {name:'saved frontend',schema:true,progress:[89],expected:[89],state:{activeRole:'frontend-react',activeSection:'section-4',search:'props',openQuestions:[91],revealedQuestions:[91]}},
    {name:'legacy readable storage with denied writes',progress:[238,254],expected:[250,288],denyWrites:true,state:{activeRole:null,activeSection:'all'}},
  ])await test(fixture.name,async()=>{
    const c=await browser.newContext();contexts.push(c);
    await c.addInitScript(f=>{
      if(f.schema)localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');
      localStorage.setItem('skills-reader-reviewed-v2',JSON.stringify(f.progress));
      localStorage.setItem('skills-reader-view-state-v1',f.raw||JSON.stringify(f.state||{}));
      if(f.denyWrites)Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError');};
    },fixture);
    const page=await c.newPage();await page.goto(base);
    assert.deepEqual((await page.locator('.question-block.reviewed').evaluateAll(es=>es.map(e=>+e.dataset.number))).sort((a,b)=>a-b),fixture.expected);
    if(fixture.state?.activeRole===null)assert.equal(await page.inputValue('#position-filter'),'');
    if(fixture.name==='saved frontend'){assert.equal(await page.inputValue('#position-filter'),'frontend-react');assert.equal(await page.inputValue('#search'),'props');}
  });
  await test('storage disabled: memory-only progress still usable',async()=>{
    const page=await fresh({},()=>{Storage.prototype.getItem=()=>{throw Error('denied');};Storage.prototype.setItem=()=>{throw Error('denied');};});
    await page.locator('#q-1 summary').click();await page.locator('#q-1 .review-button').click();assert.equal(await page.locator('#overall-progress').textContent(),'1/419');
  });
  await test('zero, partial and full progress storage size',async()=>{
    const sizes=[];
    for(const count of [0,100,419]){
      await p.evaluate(count=>{localStorage.clear();localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');localStorage.setItem('skills-reader-reviewed-v2',JSON.stringify(Array.from({length:count},(_,i)=>i+1)));history.replaceState(null,'',location.pathname);},count);
      await p.reload();await p.waitForTimeout(100);
      assert.equal(await p.locator('#overall-progress').textContent(),`${count}/419`);
      sizes.push(await p.evaluate(count=>({count,utf16Bytes:Object.keys(localStorage).reduce((n,k)=>n+2*(k.length+localStorage.getItem(k).length),0),progressCharacters:localStorage.getItem('skills-reader-reviewed-v2').length}),count));
    }
    report.storageSizes=sizes;
  });
  await test('search time for 419 entries',async()=>{
    await all(p);report.searchTiming=await p.evaluate(()=>{
      const field=document.querySelector('#search'),times=[];
      for(let i=0;i<50;i++){field.value=i%2?'state':'what';const t=performance.now();field.dispatchEvent(new Event('input'));times.push(performance.now()-t);}
      times.sort((a,b)=>a-b);return {iterations:50,medianMs:times[25],p95Ms:times[47],maxMs:times[49]};
    });assert(report.searchTiming.p95Ms<150);
  });
  for(const failingKey of ['skills-reader-migration-v1','skills-reader-reviewed-v2','skills-reader-view-state-v1','skills-reader-question-schema-v1'])await test(`interrupted migration recovery: ${failingKey}`,async()=>{
    const c=await browser.newContext();contexts.push(c);
    await c.addInitScript(key=>{
      if(localStorage.getItem('audit-seeded'))return;
      localStorage.setItem('audit-seeded','yes');
      localStorage.setItem('skills-reader-reviewed-v2','[238,254,313]');
      localStorage.setItem('skills-reader-view-state-v1',JSON.stringify({activeRole:null,activeSection:'all',openQuestions:[254]}));
      const native=Storage.prototype.setItem;
      Storage.prototype.setItem=function(k,v){if(k===key)throw new DOMException('Full','QuotaExceededError');return native.call(this,k,v);};
    },failingKey);
    const page=await c.newPage();await page.goto(base);
    const reviewed=()=>page.locator('.question-block.reviewed').evaluateAll(es=>es.map(e=>+e.dataset.number).sort((a,b)=>a-b));
    assert.deepEqual(await reviewed(),[250,288,347]);assert.equal(await page.locator('#storage-warning').isVisible(),true);
    await page.reload();assert.deepEqual(await reviewed(),[250,288,347]);
    assert.equal(await page.evaluate(()=>localStorage.getItem('skills-reader-migration-v1')),null);
    await page.reload();assert.deepEqual(await reviewed(),[250,288,347]);
  });
  await test('dynamic answer escaping',async()=>{
    const c=await browser.newContext();contexts.push(c);
    await c.route('**/genai-questions.js*',async route=>{
      await route.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(root,'genai-questions.js'),'utf8')+'\nwindow.GFG_GENAI_QUESTIONS[0].answer="<img src=x onerror=window.auditInjected=true>";'});
    });
    const page=await c.newPage();await page.goto(base+'#q-238');
    assert.equal(await page.locator('#q-238 img').count(),0);
    assert.equal(await page.locator('#q-238 .part-body').textContent(),'<img src=x onerror=window.auditInjected=true>');
    assert.equal(await page.evaluate(()=>window.auditInjected),undefined);
  });
  await test('script load failure preserves stored progress and shows error',async()=>{
    const c=await browser.newContext();contexts.push(c);
    await c.addInitScript(()=>{localStorage.setItem('skills-reader-reviewed-v2','[238,254]');});
    await c.route('**/genai-questions.js*',route=>route.abort());
    const page=await c.newPage();await page.goto(base);
    assert.equal(await page.locator('#question-load-error').isVisible(),true);
    assert((await page.locator('#question-load-error').boundingBox()).y<900);
    assert.equal(await page.locator('#question-list').isVisible(),false);
    assert.equal(await page.locator('#position-filter').isDisabled(),true);
    assert.equal(await page.evaluate(()=>localStorage.getItem('skills-reader-reviewed-v2')),'[238,254]');
  });
  await test('JavaScript-disabled notice',async()=>{
    const page=await fresh({javaScriptEnabled:false});assert.equal(await page.locator('noscript').isVisible(),true);
  });
  await test('external links and script dependencies',async()=>{
    await p.fill('#search','');await all(p);
    const links=await p.locator('a[target="_blank"]').evaluateAll(es=>es.map(e=>({href:e.href,rel:e.rel})));
    assert(links.every(l=>/noopener|noreferrer/.test(l.rel)));
    const scripts=await p.locator('script[src]').evaluateAll(es=>es.map(e=>e.src));assert(scripts.every(url=>new URL(url).origin===new URL(base).origin));
  });
  await test('eight SDE delivery questions by title',async()=>{
    const expected=['What is CI/CD?','Explain the concept of branching in Git.','What is Git stash?','What is a GIT Repository?',"What's the difference between Git fetch and Git pull?",'What is a merge conflict in Git?','Explain the architecture of Docker.','What is the difference between Git Merge and Git Rebase?'];
    await p.fill('#search','');await p.selectOption('#position-filter','sde-1');await p.click('[data-frequency-filter="all"]');await p.click('[data-section-button="section-17"]');
    assert.deepEqual(await p.locator('.question-block:not([hidden]) .question-title').allTextContents(),expected);
  });
  await test('all-reviewed completion distinct from empty filter',async()=>{
    await all(p);await p.check('#hide-reviewed');assert.equal((await visible(p)).length,0);
    assert.equal(await p.locator('#continue-unreviewed').textContent(),'View complete');
    assert.equal(await p.locator('#view-progress-copy').textContent(),'419 of 419 reviewed');
    await p.fill('#search','unknown-no-match');assert.equal(await p.locator('#continue-unreviewed').textContent(),'No questions');
    await p.fill('#search','');await p.uncheck('#hide-reviewed');
  });
  await test('all rendered search content and removed orphan outputs',async()=>{
    const mismatch=await p.locator('.question-block').evaluateAll(es=>es.filter(e=>{
      const parts=[e.dataset.number,'q'+e.dataset.number,e.closest('[data-section-group]').querySelector('h3').textContent.trim(),...[...e.querySelectorAll('.question-title,.part-body')].map(e=>e.textContent.trim())];
      return e.dataset.search!==parts.join(' ').toLocaleLowerCase();
    }).map(e=>+e.dataset.number));assert.deepEqual(mismatch,[]);
    assert.equal(await p.locator('#q-2 .answer-part.result').count(),0);
    assert.equal(await p.locator('.answer-part.example').count(),0);
  });
  await test('keyboard focus and drawer trap',async()=>{
    await p.setViewportSize({width:390,height:900});await p.click('#menu-button');await p.waitForTimeout(100);
    const controls=p.locator('#sidebar a[href],#sidebar button:not([disabled])');
    await controls.first().focus();await p.keyboard.press('Shift+Tab');assert.equal(await controls.last().evaluate(e=>e===document.activeElement),true);
    await p.keyboard.press('Tab');assert.equal(await controls.first().evaluate(e=>e===document.activeElement),true);
    await p.keyboard.press('Escape');await p.keyboard.press('/');assert.equal(await p.locator('#search').evaluate(e=>e===document.activeElement),true);
    report.focusOutline=await p.locator('#search').evaluate(e=>({width:getComputedStyle(e).outlineWidth,style:getComputedStyle(e).outlineStyle,color:getComputedStyle(e).outlineColor,token:getComputedStyle(e).getPropertyValue('--focus'),visible:e.matches(':focus-visible')}));
    assert.equal(report.focusOutline.width,'3px');
    await p.screenshot({path:path.join(root,'audit/screenshots/390-focus.png')});
  });
  await test('comparison rows retain columns at narrow widths',async()=>{
    for(const width of [320,390,720,999,1000,1180,1440]){
      await p.setViewportSize({width,height:900});await p.fill('#jump-input','2');await p.click('#jump-button');
      const table=p.locator('#q-2 .comparison pre');
      assert.equal(await table.evaluate(e=>getComputedStyle(e).whiteSpace),'pre');
      await table.evaluate(e=>{e.scrollLeft=e.scrollWidth;});
      const sizes=await table.evaluate(e=>({scroll:e.scrollWidth,client:e.clientWidth,left:e.scrollLeft}));
      if(sizes.scroll>sizes.client)assert(sizes.left>0);
      assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
  });
} finally { for(const c of contexts)await c.close();await browser.close();await new Promise(r=>server.close(r)); }
fs.writeFileSync(path.join(root,`audit/${process.env.AUDIT_RESULT||'regression'}.json`),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.tests.some(t=>!t.pass)||report.errors.length)process.exitCode=1;
