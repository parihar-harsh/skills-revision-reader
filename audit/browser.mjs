import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Use an existing Playwright installation; the application has no runtime dependencies.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const live = 'https://parihar-harsh.github.io/skills-revision-reader/';
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const output = process.argv[2] || 'baseline';
const sources = ['baseline', 'final-comparison'].includes(output) ? { local: new URL('../index.html', import.meta.url).href, live }
  : { local: new URL('../index.html', import.meta.url).href };
const result = { captured: new Date().toISOString(), commit: execFileSync('git', ['rev-parse', 'HEAD'], {cwd:root,encoding:'utf8'}).trim() };
try {
  for (const [name, url] of Object.entries(sources)) {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: {width:1440,height:900} });
    const page = await context.newPage();
    const errors = [], failures = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => {if (['error','warning'].includes(m.type())) errors.push(m.text());});
    page.on('response', r => {if(r.status() >= 400) failures.push({url:r.url(),status:r.status()});});
    await page.goto(url, {waitUntil:'load'});
    await page.waitForSelector('#q-419', {state:'attached'});
    const html = await page.locator('html').evaluate(e=>e.outerHTML);
    const inventory = await page.evaluate(() => ({
      sections: [...document.querySelectorAll('[data-section-button]')].map(e=>({id:e.dataset.sectionButton,title:e.querySelector('.section-nav-title')?.textContent.trim()})),
      questions: [...document.querySelectorAll('.question-block')].map(e=>({
        number: Number(e.dataset.number), id:e.id, section:e.dataset.section, priority:e.dataset.frequency,
        title:e.querySelector('.question-title').textContent.trim(), answer:[...e.querySelectorAll('.part-body')].map(e=>e.textContent.trim()).join('\n'),
        answerParts:e.querySelectorAll('.answer-part').length, labels:[...e.querySelectorAll('.part-label')].map(e=>e.textContent.trim()), search:e.dataset.search,
      })),
      roleOptions: [...document.querySelector('#position-filter').options].map(e=>({id:e.value,title:e.textContent})),
    }));
    const roles = {};
    for(const option of inventory.roleOptions) {
      await page.selectOption('#position-filter', option.id);
      await page.click('[data-frequency-filter="all"]');
      await page.click('[data-section-button="all"]');
      roles[option.id || 'all'] = await page.locator('.question-block:not([hidden])').evaluateAll(es=>es.map(e=>Number(e.dataset.number)));
    }
    for (const q of inventory.questions) q.roles = Object.entries(roles).filter(([r,ids])=>r!=='all'&&ids.includes(q.number)).map(([r])=>r);
    assert.equal(new Set(inventory.questions.map(q=>q.id)).size,inventory.questions.length);
    assert.deepEqual(inventory.questions.map(q=>q.number).sort((a,b)=>a-b),Array.from({length:inventory.questions.length},(_,i)=>i+1));
    assert(inventory.questions.every(q=>q.title&&q.answer));
    result[name] = { url: name === 'local' ? 'index.html' : url, ...inventory, roles, errors, failures, renderedHash:createHash('sha256').update(html).digest('hex') };
    await context.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(root,'audit',`${output}.json`),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output,...Object.fromEntries(Object.entries(sources).map(([name])=>[name,{
  count:result[name].questions.length, priority:result[name].questions.filter(q=>q.priority==='high').length,
  roles:Object.fromEntries(Object.entries(result[name].roles).map(([r,ids])=>[r,ids.length])),errors:result[name].errors,failures:result[name].failures,
}])), match:result.live ? JSON.stringify(result.local.questions)===JSON.stringify(result.live.questions):undefined},null,2));
