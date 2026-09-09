import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=f=>fs.readFileSync(root+'audit/'+f,'utf8');
const before=JSON.parse(read('baseline.json')).local;
const after=JSON.parse(read('final-comparison.json')).local;
const fixes=JSON.parse(read('corrections.json'));
const notes=new Map(read('review-notes.txt').trim().split('\n').map(line=>{const i=line.indexOf('|');return [+line.slice(0,i),line.slice(i+1)];}));
assert.equal(notes.size,419);
assert.deepEqual(before.roles,after.roles,'No role membership changes');
const uncertainty=new Set([205,234,245,264,269,382,395]);
const roleGaps=new Set([144,157,163,173,179,204,288,307,335,388]);
const overlap=new Map([[293,305],[305,293],[338,377],[377,338],[368,386],[386,368],[380,392],[392,380],[131,132],[132,131],[253,272],[272,253]]);
const pw=new Set([2,3,4,11,13,24,28,29,34,56,91,92,93,98,99,101,104,109,110,113,118,123,413]);
const de=new Set([204,220,288,293,296,298,305,316,317,416,417,418,419]);
const technicalBackground={
  'section-1':'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
  'section-2':'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
  'section-4':'https://react.dev/reference/react',
  'section-5':'https://nextjs.org/docs/app/glossary',
  'section-7':'https://nodejs.org/api/events.html',
  'section-8':'https://expressjs.com/en/5x/api/application/',
  'section-9':'https://www.rfc-editor.org/rfc/rfc9110.html',
  'section-12':'https://www.mongodb.com/docs/manual/reference/read-concern/',
};
const checkedReferences={
  263:['https://huggingface.co/docs/inference-providers/providers/hf-inference'],
  363:['https://dora.dev/guides/dora-metrics/'],
};
const sectionNames=Object.fromEntries(before.sections.map(s=>[s.id,s.title]));
const ledger=after.questions.map(q=>{
  const b=before.questions.find(b=>b.number===q.number);
  for(const key of ['number','id','title','section','priority','roles'])assert.deepEqual(q[key],b[key]);
  const changed=q.answer!==b.answer;
  assert.equal(changed,!!fixes[q.number],`Q${q.number} change matches documented corrections`);
  return {
    id:q.id,number:q.number,title:q.title,section:sectionNames[q.section],currentRoles:q.roles,
    answerReviewed:true,answerVerdict:changed?'Corrected locally':uncertainty.has(q.number)?'Reviewed; qualification or evidence limit noted':'Reviewed; no confirmed defect found',
    rationale:notes.get(q.number),correction:fixes[q.number]?.reason||null,
    roleRelevance:q.number===388?'OS fundamental inside DevOps section; propose scope review, unchanged':
      q.number>=416?'C++/CS fundamental; relevant to C++ SDE preparation':
      ['section-14','section-15','section-16','section-10','section-11'].includes(q.section)?'General SDE foundation; stack-specific filters are not complete interview coverage':
      ['section-1','section-2'].includes(q.section)?'Language-specific SDE foundation for JS/TS roles':
      q.section==='section-13'?'AI/RAG specialization or resume-project follow-up; not universally required for SDE':
      q.section==='section-17'?(q.roles.includes('sde-1')?'Selected Git/delivery fundamental':'DevOps specialization or project-dependent engineering practice'):
      'Web-stack-specific: frontend/backend/full-stack relevance depends on job and resume',
    scopeProposal:roleGaps.has(q.number)?'Review complementary core/stack scope; no membership change made':null,
    overlapWith:overlap.get(q.number)||null,
    priority:q.priority==='high'?'Curated priority':'Outside curated priority',
    priorityEvidence:'No quantitative interview-frequency evidence independently established',
    occurrenceEvidence:pw.has(q.number)?'Topic reported in PW Frontend SDE1, September 2025; self-reported, not measured prevalence':de.has(q.number)?'Related topic reported in DE Shaw new-grad, May 2025; self-reported, not exact universal wording':'No role-matched occurrence report established for this individual entry in this audit',
    sources:fixes[q.number]?.sources||checkedReferences[q.number]||[],
    sourceVerification:changed?'Primary documentation supports the correction; not a proof of every clause':q.number===363?'DORA metrics page independently checked':q.number===263?'HF Inference naming independently checked':'Manual content assessment; not independently verified claim-by-claim against external sources',
    backgroundReference:technicalBackground[q.section]||null,
    occurrenceReference:pw.has(q.number)?'https://leetcode.com/discuss/post/7241620/':de.has(q.number)?'https://leetcode.com/discuss/post/6637806/':null,
  };
});
assert(ledger.every(q=>q.rationale));
fs.writeFileSync(root+'audit/question-ledger.json',JSON.stringify(ledger,null,2)+'\n');
const esc=s=>String(s??'').replaceAll('|','\\|').replaceAll('\n',' ');
const header='# Per-Question Audit Ledger\n\nAll 419 entries were read individually. "No confirmed defect found" is a manual assessment, not external proof or a promise of correctness. Priority is curated; no numerical frequency is verified. Role relevance is an engineering judgment. Background references are not individual-claim verification. Full fields and current role memberships are in question-ledger.json.\n\n';
const table='| ID | Question | Section | Verdict | Role relevance | Priority evidence | Review rationale | References (not frequency proof) |\n|---|---|---|---|---|---|---|---|\n'+ledger.map(q=>'| '+[q.number,q.title,q.section,q.answerVerdict,q.roleRelevance,q.priority+'; frequency unverified',q.rationale,[...q.sources,q.occurrenceReference].filter(Boolean).join(' ; ')||q.sourceVerification].map(esc).join(' | ')+' |').join('\n')+'\n';
fs.writeFileSync(root+'audit/QUESTION_LEDGER.md',header+table);
console.log(JSON.stringify({reviewed:ledger.length,unreviewed:419-ledger.length,changed:ledger.filter(q=>q.correction).length,unchanged:ledger.filter(q=>!q.correction).length,qualifications:ledger.filter(q=>q.answerVerdict.includes('qualification')).map(q=>q.number),topicOccurrence:ledger.filter(q=>q.occurrenceReference).length,duplicateExactTitles:419-new Set(after.questions.map(q=>q.title.toLocaleLowerCase())).size},null,2));
