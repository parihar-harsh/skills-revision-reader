import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const before=JSON.parse(fs.readFileSync(path.join(root,'audit/final-comparison.json'))).local;
const retired=new Set(JSON.parse(fs.readFileSync(path.join(root,'audit/retired-questions.json'))).questions.map(q=>q.number));
const baseline=structuredClone(before);
baseline.questions=baseline.questions.filter(q=>!retired.has(q.number));
const banker=baseline.questions.find(q=>q.number===388);
banker.section='section-15';banker.roles=['sde-1'];
baseline.questions=baseline.questions.filter(q=>q.number!==388);
baseline.questions.splice(baseline.questions.findIndex(q=>q.section==='section-16'),0,banker);
delete baseline.roles['devops-engineer'];
for(const [role,ids] of Object.entries(baseline.roles))baseline.roles[role]=baseline.questions.filter(q=>ids.includes(q.number)||(role==='sde-1'&&q.number===388)).map(q=>q.number);
const total=baseline.questions.length;
assert.equal(total,358);assert.equal(retired.size,61);
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
const report={captured:new Date().toISOString(),url:base,tests:[],errors:[],matrix:[],network:[]};
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
    assert.equal(await p.locator('.question-block').count(),total);
    const actual=await p.locator('.question-block').evaluateAll(es=>es.map(e=>({number:+e.dataset.number,id:e.id,title:e.querySelector('.question-title').textContent.trim(),section:e.dataset.section,priority:e.dataset.frequency})));
    assert.deepEqual(actual,baseline.questions.map(({number,id,title,section,priority})=>({number,id,title,section,priority})));
  });
  await test('252 role/section/priority combinations and progress',async()=>{
    const result=await p.evaluate(b=>{
      const errors=[];let count=0;
      for(const [role,ids] of Object.entries(b.roles))for(const freq of ['all','high'])for(const s of b.sections){
        const select=document.querySelector('#position-filter');select.value=role==='all'?'':role;select.dispatchEvent(new Event('change'));
        document.querySelector(`[data-frequency-filter='${freq}']`).click();document.querySelector(`[data-section-button='${s.id}']`).click();
        const scope=b.questions.filter(q=>ids.includes(q.number)&&(freq==='all'||q.priority==='high'));
        const sectionQuestions=scope.filter(q=>s.id==='all'||q.section===s.id);
        const expected=(sectionQuestions.length?sectionQuestions:scope).map(q=>q.number);
        const actual=[...document.querySelectorAll('.question-block:not([hidden])')].map(e=>+e.dataset.number);
        if(JSON.stringify(expected)!==JSON.stringify(actual)||document.querySelector('#view-progress-copy').textContent!==`0 of ${expected.length} reviewed`)errors.push({role,freq,section:s.id});
        if(s.id!=='all'&&document.querySelector(`[data-section-progress='${s.id}']`).textContent!==`0/${sectionQuestions.length}`)errors.push({role,freq,section:s.id,sidebar:true});
        const sections=new Set(scope.map(q=>q.section));
        for(const button of document.querySelectorAll('[data-section-button]')){
          const shouldShow=button.dataset.sectionButton==='all'||sections.has(button.dataset.sectionButton);
          if(button.hidden===shouldShow||(getComputedStyle(button).display!=='none')!==shouldShow)errors.push({role,freq,category:button.dataset.sectionButton,visibility:true});
        }
        if(document.querySelector('#visible-category-count').textContent!==String(sections.size))errors.push({role,freq,categoryCount:true});
        count++;
      }return {count,errors};
    },baseline);assert.deepEqual(result.errors,[]);assert.equal(result.count,252);
  });
  await test('scoped category summary',async()=>{
    await p.selectOption('#position-filter','sde-1');await p.click('[data-frequency-filter="all"]');await p.click('[data-section-button="all"]');
    const count=new Set(baseline.questions.filter(q=>q.roles.includes('sde-1')).map(q=>q.section)).size;
    assert((await p.locator('#view-meta').textContent()).includes(`across ${count} skill categories`));
  });
  await test('Next preserves All sections and search',async()=>{
    await all(p);await p.locator('#q-1 summary').click();await p.locator('#q-1 [data-question-nav="next"]').click();
    await p.waitForTimeout(100);assert.equal(await p.locator('[data-section-button="all"]').getAttribute('aria-pressed'),'true');
    assert.equal((await visible(p)).length,total);
    await p.fill('#search','what is');const before=await visible(p);
    const n=before[0];await p.locator(`#q-${n} details`).evaluate(e=>e.open=true);await p.locator(`#q-${n} [data-question-nav="next"]`).click();
    await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');assert.deepEqual(await visible(p),before);
    await p.goBack();await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');
    await p.goForward();await p.waitForTimeout(100);assert.equal(await p.inputValue('#search'),'what is');
  });
  await test('exact question-number search and clear',async()=>{
    await all(p);for(const query of ['1','Q1','q-1','419']) {await p.fill('#search',query);assert.deepEqual(await visible(p),[query==='419'?419:1]);}
    await p.press('#search','Escape');assert.equal((await visible(p)).length,total);
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
    await p.locator('#q-419 .review-button').click();assert.equal(await p.locator('#overall-progress').textContent(),'1/358');
    await p.check('#hide-reviewed');assert.equal(await p.locator('#q-419').isVisible(),false);
    await p.click('#jump-button');assert.equal(await p.locator('#q-419').isVisible(),true);
    await p.click('button[data-mode="recall"]');assert.equal(await p.locator('#q-419 .answer-content').isVisible(),false);
    await p.locator('#q-419 .reveal-answer').click();await p.waitForTimeout(300);await p.reload();
    assert.equal(await p.locator('#q-419 .answer-content').isVisible(),true);assert.equal(await p.locator('#overall-progress').textContent(),'1/358');
    assert.equal(await p.inputValue('#position-filter'),'');
  });
  await test('first/last, invalid jump, expansion and rapid toggles',async()=>{
    await all(p);await p.fill('#search','');await p.click('#expand-visible');
    assert.equal(await p.locator('.question-block details[open]').count(),total);
    assert.equal(await p.locator('#q-1 [data-question-nav="previous"]').getAttribute('aria-disabled'),'true');
    assert.equal(await p.locator('#q-408 [data-question-nav="next"]').getAttribute('aria-disabled'),'true');
    await p.click('#collapse-visible');assert.equal(await p.locator('.question-block details[open]').count(),0);
    const before=await visible(p);await p.fill('#jump-input','420');await p.click('#jump-button');assert.deepEqual(await visible(p),before);
    await p.locator('#q-1 summary').click();await p.locator('#q-1 .reveal-answer').click();
    await p.locator('#q-1 .review-button').evaluate(e=>{for(let i=0;i<20;i++)e.click();});
    assert.equal(await p.locator('#q-1 .review-button').getAttribute('aria-pressed'),'false');
  });
  await test('reset confirmation cancel/accept',async()=>{
    p.once('dialog',d=>d.dismiss());await p.click('#reset-progress');assert.equal(await p.locator('#overall-progress').textContent(),'1/358');
    p.once('dialog',d=>d.accept());await p.click('#reset-progress');assert.equal(await p.locator('#overall-progress').textContent(),'0/358');
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
    fs.mkdirSync(path.join(root,'audit/scope-screenshots'),{recursive:true});
    for(const width of [320,390,720,999,1000,1180,1440])for(const theme of ['light','dark']){
      await p.setViewportSize({width,height:900});if(await p.locator('html').getAttribute('data-theme')!==theme)await p.click('#theme-button');
      await p.fill('#jump-input','2');await p.click('#jump-button');await p.click('button[data-mode="review"]');
      assert.equal(await p.locator('body').getAttribute('data-mode'),'review');
      assert.equal(await p.locator('button[data-mode="review"]').getAttribute('aria-pressed'),'true');
      await p.evaluate(()=>window.scrollTo(0,0));
      const layout=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,ids:[...document.querySelectorAll('[id]')].map(e=>e.id)}));
      assert(layout.scroll<=width+1);assert.equal(new Set(layout.ids).size,layout.ids.length);
      await p.screenshot({path:path.join(root,`audit/scope-screenshots/${width}-${theme}.png`)});
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
    await page.locator('#q-1 summary').click();await page.locator('#q-1 .review-button').click();assert.equal(await page.locator('#overall-progress').textContent(),'1/358');
  });
  await test('zero, partial and full progress storage size',async()=>{
    const sizes=[];
    for(const count of [0,100,419]){
      await p.evaluate(count=>{localStorage.clear();localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');localStorage.setItem('skills-reader-reviewed-v2',JSON.stringify(Array.from({length:count},(_,i)=>i+1)));history.replaceState(null,'',location.pathname);},count);
      await p.reload();await p.waitForTimeout(100);
      assert.equal(await p.locator('#overall-progress').textContent(),`${baseline.questions.filter(q=>q.number<=count).length}/${total}`);
      sizes.push(await p.evaluate(count=>({count,utf16Bytes:Object.keys(localStorage).reduce((n,k)=>n+2*(k.length+localStorage.getItem(k).length),0),progressCharacters:localStorage.getItem('skills-reader-reviewed-v2').length}),count));
    }
    report.storageSizes=sizes;
  });
  await test('search time for 358 entries',async()=>{
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
    assert.equal(await p.locator('#view-progress-copy').textContent(),'358 of 358 reviewed');
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
    await p.screenshot({path:path.join(root,'audit/scope-screenshots/390-focus.png')});
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

  await test('retired questions removed from DOM, source arrays and every role',async()=>{
    assert.equal(await p.locator('#position-filter option[value="devops-engineer"]').count(),0);
    assert.equal(await p.locator('[data-section-button="section-17"] .section-nav-title').textContent(),'GIT AND DELIVERY BASICS');
    assert.equal(await p.locator('#q-388').getAttribute('data-section'),'section-15');
    const data=await p.evaluate(()=>({ai:window.GFG_GENAI_QUESTIONS.map(q=>q.number),ops:window.GFG_DEVOPS_QUESTIONS.map(q=>q.number),retired:window.READER_RETIRED_QUESTION_IDS}));
    assert.equal(data.ai.length,30);assert.equal(data.ops.length,20);
    for(const id of retired){assert.equal(await p.locator('#q-'+id).count(),0);assert(!data.ai.includes(id)&&!data.ops.includes(id));}
    assert.equal(data.retired.length,61);
  });
  await test('archived reviewed IDs survive active review toggles and reload',async()=>{
    const page=await fresh({},()=>{
      if(localStorage.getItem('audit-scope-seeded'))return;
      localStorage.setItem('audit-scope-seeded','yes');
      localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');
      localStorage.setItem('skills-reader-reviewed-v2','[241,377,419]');
    });
    assert.equal(await page.locator('#overall-progress').textContent(),'1/358');
    await page.locator('#q-1 summary').click();await page.locator('#q-1 .review-button').click();
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('skills-reader-reviewed-v2'))),[1,241,377,419]);
    await page.reload();assert.equal(await page.locator('#overall-progress').textContent(),'2/358');
    await page.locator('#q-1 .review-button').click();
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('skills-reader-reviewed-v2'))),[241,377,419]);
  });
  await test('retired direct link and jump explain removal; Q419 still opens',async()=>{
    const page=await fresh();
    await page.goto(base+'#q-241');assert.equal(await page.locator('#question-unavailable').isVisible(),true);
    assert((await page.locator('#question-unavailable').textContent()).includes('removed'));
    await page.fill('#jump-input','377');await page.click('#jump-button');
    assert((await page.locator('#question-unavailable').textContent()).includes('Q377'));
    await page.fill('#jump-input','419');await page.click('#jump-button');
    assert.equal(await page.locator('#q-419').isVisible(),true);assert.equal(await page.locator('#question-unavailable').isVisible(),false);
  });
  await test('saved specialist role falls back without losing reviewed history',async()=>{
    const page=await fresh({},()=>{
      localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');
      localStorage.setItem('skills-reader-view-state-v1',JSON.stringify({activeRole:'devops-engineer',activeSection:'section-17'}));
      localStorage.setItem('skills-reader-reviewed-v2','[352,360,399,419]');
    });
    assert.equal(await page.inputValue('#position-filter'),'sde-1');
    assert.equal(await page.locator('#overall-progress').textContent(),'3/358');
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('skills-reader-reviewed-v2'))),[352,360,399,419]);
  });

  await test('changing section clears a retired-question notice',async()=>{
    const page=await fresh();await page.goto(base+'#q-241');
    assert.equal(await page.locator('#question-unavailable').isVisible(),true);
    await page.click('[data-section-button="section-15"]');
    assert.equal(await page.locator('#question-unavailable').isVisible(),false);
    await page.fill('#search','banker');assert.deepEqual(await visible(page),[388]);
    await page.locator('#q-388 summary').click();
    assert.equal(await page.locator('#q-388 .answer-content').isVisible(),true);
  });
  await test('missing retirement metadata fails closed without changing progress',async()=>{
    const c=await browser.newContext();contexts.push(c);
    await c.addInitScript(()=>localStorage.setItem('skills-reader-reviewed-v2','[241,419]'));
    await c.route('**/question-retirements.js*',route=>route.abort());
    const page=await c.newPage();await page.goto(base);
    assert.equal(await page.locator('#question-load-error').isVisible(),true);
    assert.equal(await page.locator('#question-list').isVisible(),false);
    assert.equal(await page.evaluate(()=>localStorage.getItem('skills-reader-reviewed-v2')),'[241,419]');
  });
  await test('retained answers unchanged by scope reduction',async()=>{
    const actual=await p.locator('.question-block').evaluateAll(es=>es.map(e=>({number:+e.dataset.number,title:e.querySelector('.question-title').textContent.trim(),answer:[...e.querySelectorAll('.part-body')].map(e=>e.textContent.trim()).join('\n')})));
    for(const q of actual){const original=before.questions.find(o=>o.number===q.number);assert.equal(q.title,original.title);assert.equal(q.answer,original.answer);}
  });
  await test('role switch hides empty category and selects All with correct totals',async()=>{
    const page=await fresh();await all(page);await page.click('[data-section-button="section-4"]');
    await page.selectOption('#position-filter','sde-1');
    assert.equal(await page.locator('[data-section-button="section-4"]').isVisible(),false);
    assert.equal(await page.locator('[data-section-button="all"]').getAttribute('aria-pressed'),'true');
    assert.deepEqual(await visible(page),baseline.roles['sde-1']);
    assert.equal(await page.locator('#view-progress-copy').textContent(),'0 of 164 reviewed');
    await page.waitForTimeout(300);await page.reload();
    assert.equal(await page.locator('[data-section-button="all"]').getAttribute('aria-pressed'),'true');
    await page.selectOption('#position-filter','frontend-react');
    assert.equal(await page.locator('[data-section-button="section-4"]').isVisible(),true);
    assert.equal(await page.locator('[data-section-button="section-15"]').isVisible(),false);
    await all(page);assert.equal(await page.locator('[data-section-button]:not([hidden])').count(),18);
  });
  await test('saved empty role category falls back while preserving review history',async()=>{
    const page=await fresh({},()=>{
      localStorage.setItem('skills-reader-question-schema-v1','gfg-genai-50-devops-61');
      localStorage.setItem('skills-reader-view-state-v1',JSON.stringify({activeRole:'sde-1',activeSection:'section-13'}));
      localStorage.setItem('skills-reader-reviewed-v2','[1,241,419]');
    });
    assert.equal(await page.locator('[data-section-button="all"]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-section-button="section-13"]').isVisible(),false);
    assert.equal(await page.locator('#overall-progress').textContent(),'2/358');
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('skills-reader-reviewed-v2'))),[1,241,419]);
  });
  await test('empty search and hide reviewed keep the role category navigation stable',async()=>{
    const page=await fresh();
    const categories=()=>page.locator('[data-section-button]:not([hidden])').evaluateAll(es=>es.map(e=>e.dataset.sectionButton));
    const before=await categories();await page.fill('#search','no-such-question-xxxx');
    assert.deepEqual(await categories(),before);assert.deepEqual(await visible(page),[]);
    await page.fill('#search','');await page.locator('#q-1 summary').click();await page.locator('#q-1 .review-button').click();
    await page.check('#hide-reviewed');assert.deepEqual(await categories(),before);
    assert.equal(await page.locator('#q-1').isVisible(),false);
  });
  await test('direct link reveals a category outside the selected role',async()=>{
    const page=await fresh();assert.equal(await page.locator('[data-section-button="section-13"]').isVisible(),false);
    await page.goto(base+'#q-238');
    assert.equal(await page.inputValue('#position-filter'),'');
    assert.equal(await page.locator('[data-section-button="section-13"]').isVisible(),true);
    assert.equal(await page.locator('[data-section-button="section-13"]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('#q-238').isVisible(),true);
  });
  await test('mobile role categories remain hidden and excluded from keyboard navigation',async()=>{
    const page=await fresh({viewport:{width:390,height:844}});await page.click('#menu-button');
    await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-section-button="section-13"]').isVisible(),false);
    await page.locator('.product-link').first().focus();
    const expected=await page.locator('#sidebar a[href], #sidebar button:not([hidden]):not([disabled])').count();
    const visited=new Set();
    for(let i=0;i<expected;i++){
      const state=await page.evaluate(()=>({hidden:document.activeElement.hidden,inSidebar:!!document.activeElement.closest('#sidebar'),key:document.activeElement.dataset.sectionButton||document.activeElement.id||document.activeElement.getAttribute('href')}));
      assert.equal(state.hidden,false,JSON.stringify(state));assert.equal(state.inSidebar,true,JSON.stringify(state));visited.add(state.key);await page.keyboard.press('Tab');
    }
    assert.equal(visited.size,expected);assert(!visited.has('section-13'));
    await page.click('[data-section-button="section-15"]');
    assert.equal(await page.locator('#view-title').textContent(),'OPERATING SYSTEMS');
    assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
  });
  await test('role-filtered category viewport and theme matrix',async()=>{
    const page=await fresh();report.roleMatrix=[];
    const expected=new Set(baseline.questions.filter(q=>q.roles.includes('sde-1')&&q.priority==='high').map(q=>q.section));
    for(const width of [320,390,720,999,1000,1180,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:900});
      if(await page.locator('html').getAttribute('data-theme')!==theme)await page.click('#theme-button');
      if(width<=900)await page.click('#menu-button');
      await page.waitForTimeout(200);
      const actual=await page.locator('[data-section-button]:not([hidden])').evaluateAll(es=>es.map(e=>e.dataset.sectionButton));
      assert.deepEqual(new Set(actual),new Set(['all',...expected]));
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.screenshot({path:path.join(root,`audit/scope-screenshots/role-${width}-${theme}.png`)});
      report.roleMatrix.push({width,theme,categories:expected.size,overflow:0});
      if(width<=900)await page.keyboard.press('Escape');
    }
  });
} finally { for(const c of contexts)await c.close();await browser.close();await new Promise(r=>server.close(r)); }
fs.writeFileSync(path.join(root,`audit/${process.env.AUDIT_RESULT||'scope-regression'}.json`),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.tests.some(t=>!t.pass)||report.errors.length)process.exitCode=1;
