import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=name=>fs.readFileSync(root+name,'utf8');
const before=JSON.parse(read('audit/baseline.json'));
const final=JSON.parse(read('audit/final-comparison.json'));
const fixes=JSON.parse(read('audit/corrections.json'));
const report={captured:new Date().toISOString(),checks:[],syntax:[]};
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.js'))){
  execFileSync(process.execPath,['--check',root+file]);report.syntax.push(file);
}
for(const file of fs.readdirSync(root+'audit/').filter(f=>f.endsWith('.mjs'))){
  execFileSync(process.execPath,['--check',root+'audit/'+file]);report.syntax.push('audit/'+file);
}
let i=0;
for(const m of read('index.html').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){
  if(!m[1].trim())continue;
  new vm.Script(m[1],{filename:'index.html:inline-'+(++i)});
}
report.inlineScripts=i;
for(const name of ['local','live']){
  const {questions:q}=final[name];
  assert.equal(q.length,419);
  assert.equal(new Set(q.map(q=>q.id)).size,419);
  assert.equal(new Set(q.map(q=>q.title.toLowerCase())).size,419);
  assert.deepEqual(q.map(q=>q.number).sort((a,b)=>a-b),Array.from({length:419},(_,i)=>i+1));
  assert(q.every(q=>q.answer.trim()&&q.title.trim()&&q.labels.filter(l=>l==='INTERVIEW ANSWER').length===1));
  assert(q.every(q=>!q.labels.some(l=>/^EXAMPLE/.test(l))));
  for(let j=0;j<q.length;j++)for(const key of ['id','number','title','section','priority','roles'])assert.deepEqual(q[j][key],before.local.questions[j][key]);
  assert.deepEqual(final[name].roles,before.local.roles);
  assert.deepEqual(final[name].errors,[]);assert.deepEqual(final[name].failures,[]);
}
assert.deepEqual(final.live.questions,before.live.questions);
const changed=final.local.questions.filter((q,j)=>q.answer!==before.local.questions[j].answer).map(q=>q.number).sort((a,b)=>a-b);
assert.deepEqual(changed,Object.keys(fixes).map(Number).sort((a,b)=>a-b));
assert.equal(execFileSync('git',['diff','--check'],{cwd:root,encoding:'utf8'}),'');
report.checks=['419 nonempty questions and one primary answer each, both local and live','Unique IDs and exact titles; sequential 1-419 numeric set','No example-labelled section; IDs, DOM order, titles, roles, sections and priority preserved','17 documented answer changes only; live unchanged from baseline','JavaScript syntax and git diff --check'];
report.changedAnswers=changed;
report.gitDiffCheck='pass';
fs.writeFileSync(root+'audit/structure.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
