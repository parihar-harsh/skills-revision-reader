import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=fileURLToPath(new URL('../',import.meta.url));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const report={captured:new Date().toISOString(),states:[],errors:[],checks:[]};
const context=await browser.newContext({viewport:{width:390,height:900},reducedMotion:'reduce'});
const p=await context.newPage();
p.on('pageerror',e=>report.errors.push(e.message));
p.on('console',m=>{if(['error','warning'].includes(m.type()))report.errors.push(m.text());});
async function capture(name){
  await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  if(name.includes('drawer')) {
    await p.locator('#sidebar').evaluate(e=>Promise.all(e.getAnimations().map(a=>a.finished)));
    await p.waitForTimeout(200);
    const box=await p.locator('#sidebar').boundingBox();
    assert(box.x>=-1&&box.y>=-1&&box.width>200);
    report.drawers??=[];
    report.drawers.push(await p.locator('#sidebar').evaluate(e=>({
      descendants:[...e.querySelectorAll('h1,.section-nav-item,.section-nav-title')].map(n=>({text:n.textContent.trim(),visibility:getComputedStyle(n).visibility,display:getComputedStyle(n).display,rect:n.getBoundingClientRect().toJSON()}))
    })));
  }
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.screenshot({path:root+'audit/screenshots/'+name+'.png'});
  report.states.push(name);
}
try {
  await p.goto(new URL('../index.html',import.meta.url).href);
  await p.waitForSelector('#q-419',{state:'attached'});
  await p.selectOption('#position-filter','');
  await p.click('[data-frequency-filter="all"]');
  await p.click('#menu-button');
  await p.click('[data-section-button="all"]');
  for(const theme of ['light','dark']) {
    if(await p.locator('html').getAttribute('data-theme')!==theme)await p.click('#theme-button');
    await p.fill('#jump-input','397');await p.click('#jump-button');
    await capture('390-long-'+theme);
    await p.fill('#search','no-matching-entry-audit');await p.evaluate(()=>scrollTo(0,0));
    assert.equal(await p.locator('#empty-state').isVisible(),true);
    await capture('390-empty-'+theme);
    await p.fill('#search','');await p.click('#menu-button');
    await capture('390-drawer-'+theme);await p.keyboard.press('Escape');
  }
  await p.setViewportSize({width:320,height:900});
  await p.fill('#jump-input','2');await p.click('#jump-button');
  await p.locator('#q-2 .comparison pre').evaluate(e=>e.scrollLeft=0);
  await capture('320-comparison-dark');
  await p.setViewportSize({width:1440,height:900});
  await p.fill('#jump-input','399');await p.click('#jump-button');
  await capture('1440-long-dark');
  report.semantics=await p.evaluate(()=>({
    unnamedInputs:[...document.querySelectorAll('input,select')].filter(e=>!e.labels.length&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).map(e=>e.id),
    unnamedButtons:[...document.querySelectorAll('button')].filter(e=>!e.textContent.trim()&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).map(e=>e.id),
    brokenAriaReferences:[...document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby]')].flatMap(e=>['aria-controls','aria-labelledby','aria-describedby'].flatMap(a=>(e.getAttribute(a)||'').split(/\s+/).filter(Boolean).filter(id=>!document.getElementById(id)))),
    invalidPressed:[...document.querySelectorAll('[aria-pressed]')].filter(e=>!['true','false','mixed'].includes(e.getAttribute('aria-pressed'))).map(e=>e.id),
    progressText:document.querySelector('#view-progress-copy').textContent,
    decorativeProgressTracks:[...document.querySelectorAll('.progress-track,.section-progress-track,.view-progress-track')].every(e=>e.getAttribute('aria-hidden')==='true'),
    reducedScroll:getComputedStyle(document.documentElement).scrollBehavior,
    headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({level:e.tagName,text:e.textContent.trim()})),
  }));
  for(const key of ['unnamedInputs','unnamedButtons','brokenAriaReferences','invalidPressed'])assert.deepEqual(report.semantics[key],[]);
  assert.equal(report.semantics.reducedScroll,'auto');
  report.checks.push('Native control labels, ARIA references and pressed states, reduced motion');
  report.colors=[];
  for(const theme of ['light','dark']){
    if(await p.locator('html').getAttribute('data-theme')!==theme)await p.click('#theme-button');
    await p.keyboard.press('/');await p.waitForTimeout(100);
    const data=await p.evaluate(()=>{
      const style=getComputedStyle(document.documentElement);
      const vars=['--text','--muted','--surface','--surface-subtle','--focus','--answer','--answer-soft','--comparison','--comparison-soft'];
      return {tokens:Object.fromEntries(vars.map(v=>[v,style.getPropertyValue(v).trim()])),focus:getComputedStyle(document.querySelector('#search')).outline};
    });
    const lum=hex=>{const rgb=hex.replace('#','').match(/../g).map(c=>parseInt(c,16)/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;};
    const pairs=[['--text','--surface'],['--muted','--surface-subtle'],['--answer','--answer-soft'],['--comparison','--comparison-soft'],['--focus','--surface']];
    data.contrast=pairs.map(([a,b])=>{const l=[lum(data.tokens[a]),lum(data.tokens[b])].sort((a,b)=>b-a);return {pair:a+' / '+b,ratio:(l[0]+0.05)/(l[1]+0.05)};});
    assert(data.contrast.every(v=>v.ratio>= (v.pair.startsWith('--focus')?3:4.5)));
    await p.locator('#position-filter').focus();await p.keyboard.press('ArrowDown');
    assert.equal(await p.locator('#position-filter').evaluate(e=>getComputedStyle(e).outlineWidth),'3px');
    report.colors.push({theme,...data});
  }
  await p.setViewportSize({width:390,height:900});
  report.touchTargets=await p.locator('.toolbar button,.toolbar select,.toolbar input').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>({id:e.id||e.textContent.trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
  report.checks.push('Sampled text/focus color-token contrast in both themes; role select keyboard focus');
  await p.evaluate(()=>{localStorage.setItem('skills-reader-reviewed-v2',JSON.stringify(Array.from({length:419},(_,i)=>i+1)));});
  await p.reload();await p.selectOption('#position-filter','');await p.click('[data-frequency-filter="all"]');await p.click('#menu-button');await p.click('[data-section-button="all"]');await p.check('#hide-reviewed');
  assert.equal(await p.locator('#continue-unreviewed').textContent(),'View complete');
  await p.evaluate(()=>scrollTo(0,0));await capture('390-complete');
  report.checks.push('Long title/answer, empty, drawer, comparison and completed screenshots captured');
} finally {await context.close();await browser.close();}
fs.writeFileSync(root+'audit/visual-check.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
assert.deepEqual(report.errors,[]);
