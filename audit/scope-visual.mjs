import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=fileURLToPath(new URL('../',import.meta.url));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const c=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});
const p=await c.newPage();
const errors=[];p.on('pageerror',e=>errors.push(e.message));
try {
  await p.goto(new URL('../index.html',import.meta.url).href);
  await p.selectOption('#position-filter','');await p.click('[data-frequency-filter="all"]');
  for(const width of [390,1440])for(const theme of ['light','dark']){
    await p.setViewportSize({width,height:900});
    if(await p.locator('html').getAttribute('data-theme')!==theme)await p.click('#theme-button');
    for(const section of ['section-13','section-17']){
      if(width===390)await p.click('#menu-button');
      await p.click(`[data-section-button="${section}"]`);
      await p.locator('.question-block:not([hidden]) summary').first().click();
      await p.waitForTimeout(200);
      assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await p.screenshot({path:root+`audit/scope-screenshots/${width}-${theme}-${section}.png`});
    }
    if(width===390){
      await p.click('#menu-button');await p.locator('[data-section-button="section-17"]').scrollIntoViewIfNeeded();await p.waitForTimeout(200);
      await p.screenshot({path:root+`audit/scope-screenshots/390-${theme}-drawer.png`});await p.keyboard.press('Escape');
    }
  }
  assert.deepEqual(errors,[]);
} finally {await c.close();await browser.close();}
console.log('10 scope screenshots captured; no page errors or horizontal overflow');
