import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => fs.readFileSync(root + name, 'utf8');
const before = JSON.parse(read('audit/final-comparison.json')).local;
const current = JSON.parse(read('audit/scope-inventory.json')).local;
const archive = JSON.parse(read('audit/retired-questions.json')).questions;
const retired = new Set(archive.map(q => q.number));
const original = new Map(before.questions.map(q => [q.number, q]));
const report = {captured: new Date().toISOString(), syntax: [], checks: []};

for (const directory of ['', 'audit/']) {
  for (const file of fs.readdirSync(root + directory).filter(f => /\.(?:js|mjs)$/.test(f))) {
    execFileSync(process.execPath, ['--check', root + directory + file]);
    report.syntax.push(directory + file);
  }
}
let inlineScripts = 0;
for (const match of read('index.html').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
  if (match[1].trim()) new vm.Script(match[1], {filename: 'index.html:inline-' + (++inlineScripts)});
}
report.inlineScripts = inlineScripts;

assert.equal(current.questions.length, 358);
assert.equal(archive.length, 61);
assert.equal(retired.size, 61);
assert.equal(new Set(current.questions.map(q => q.id)).size, 358);
assert.equal(new Set(current.questions.map(q => q.title.toLowerCase())).size, 358);
assert(current.questions.every(q => !retired.has(q.number)));
assert.deepEqual([...current.questions, ...archive].map(q => q.number).sort((a, b) => a - b),
  Array.from({length: 419}, (_, i) => i + 1));

for (const q of current.questions) {
  const old = original.get(q.number);
  for (const key of ['id', 'number', 'title', 'answer', 'priority', 'answerParts', 'labels']) {
    assert.deepEqual(q[key], old[key], `Retained Q${q.number}: ${key}`);
  }
  assert.equal(q.section, q.number === 388 ? 'section-15' : old.section);
  const roles = old.roles.filter(role => role !== 'devops-engineer');
  if (q.number === 388) roles.push('sde-1');
  assert.deepEqual([...q.roles].sort(), [...new Set(roles)].sort(), `Q${q.number} roles`);
  assert(q.title.trim() && q.answer.trim());
  assert.equal(q.labels.filter(label => label === 'INTERVIEW ANSWER').length, 1);
  assert(!q.labels.some(label => /^EXAMPLE/i.test(label)));
}
for (const q of archive) {
  for (const key of Object.keys(original.get(q.number))) {
    assert.deepEqual(q[key], original.get(q.number)[key], `Archived Q${q.number}: ${key}`);
  }
}
const context = {window: {}};
vm.runInNewContext(read('question-retirements.js'), context);
assert.deepEqual(Array.from(context.window.READER_RETIRED_QUESTION_IDS).sort((a, b) => a - b),
  [...retired].sort((a, b) => a - b));
assert.deepEqual(current.errors, []);
assert.deepEqual(current.failures, []);
assert.equal(execFileSync('git', ['diff', '--check'], {cwd: root, encoding: 'utf8'}), '');

report.active = current.questions.length;
report.retired = archive.length;
report.priority = current.questions.filter(q => q.priority === 'high').length;
report.retainedAnswersChangedByPruning = 0;
report.roles = Object.fromEntries(Object.entries(current.roles).map(([role, ids]) => [role, {
  total: ids.length,
  priority: current.questions.filter(q => ids.includes(q.number) && q.priority === 'high').length,
}]));
report.checks = [
  '358 active plus 61 archived entries account for exactly the original 419 IDs',
  'No active duplicate ID/title, empty answer or separate example section',
  'Every retained title, answer, priority and ID matches the pre-pruning snapshot',
  'Only Q388 changes section; roles lose retired entries/DevOps and SDE gains Q388',
  'Every archived record preserves all original fields; reserved runtime IDs match',
  'All root JS and audit MJS syntax, inline scripts and git diff --check pass',
];
report.gitDiffCheck = 'pass';
fs.writeFileSync(root + 'audit/scope-structure.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
