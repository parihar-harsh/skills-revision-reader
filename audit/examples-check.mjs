import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const ts = (await import(process.env.TYPESCRIPT_MODULE || 'typescript')).default;
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(root+'question-examples.js','utf8'),context);
const examples = context.window.READER_QUESTION_EXAMPLES;
const sources = context.window.READER_EXAMPLE_SOURCES;
const bank = JSON.parse(fs.readFileSync(root+'audit/scope-inventory.json')).local.questions;
assert.deepEqual(Object.keys(examples).map(Number).sort((a,b)=>a-b),bank.map(q=>q.number).sort((a,b)=>a-b));
// Also catch repeated literal keys, which JavaScript would silently overwrite.
const keys = [...fs.readFileSync(root+'question-examples.js','utf8').matchAll(/^    (\d+): e\(/gm)].map(m=>+m[1]);
assert.equal(new Set(keys).size,358);assert.equal(keys.length,358);
const temp = fs.mkdtempSync(path.join(os.tmpdir(),'reader-snippets-'));
const report={count:358,code:0,diagrams:0,syntax:[],executed:[],errors:[],ledger:[]};
const run = (command,args) => execFileSync(command,args,{encoding:'utf8',timeout:15000,stdio:['pipe','pipe','pipe']});
try {
  for(const question of bank){
    const n=question.number, e=examples[n];
    assert(e.code.trim() && e.explanation.trim() && e.language.trim());
    assert(sources[e.source]?.startsWith('https://'));
    const diagram=e.language==='Diagram';report[diagram?'diagrams':'code']++;
    const row={number:n,title:question.title,format:e.language,source:sources[e.source],syntax:'not applicable',execution:'not executed: requires its stated environment or is illustrative'};
    try {
      if(e.language==='C++'){
        const file=path.join(temp,`q${n}.cpp`),binary=path.join(temp,`q${n}`);
        fs.writeFileSync(file,e.code);run('clang++',['-std=c++20','-pthread',file,'-o',binary]);
        row.output=run(binary,[]);report.executed.push(n);row.execution='compiled and executed (exit 0)';row.syntax='pass';
      } else if(e.language.startsWith('JSON')){
        JSON.parse(e.code);row.syntax='pass';
      } else if(e.language.startsWith('Python')){
        run('python3',['-c','import ast,sys; ast.parse(sys.argv[1])',e.code]);row.syntax='pass';
        if(e.language==='Python'){row.output=run('python3',['-c',e.code]);row.execution='executed';report.executed.push(n);}
      } else if(e.language==='SQL'){
        row.output=execFileSync('sqlite3',[':memory:'],{input:'PRAGMA foreign_keys=ON;\n'+e.code,encoding:'utf8',timeout:5000});
        row.syntax='pass';row.execution='executed on SQLite with foreign keys enabled';report.executed.push(n);
      } else if(/JavaScript|TypeScript|JSX|mongosh|CommonJS|MongoDB driver/.test(e.language)){
        if(n===49){
          for(const [i,code] of e.code.split('// Title.tsx').entries()){
            const result=ts.transpileModule(code,{fileName:`q49-${i}.tsx`,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});
            assert.equal((result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
          }
        }else if(n===50){
          const parsed=ts.createSourceFile('legacy.d.ts',e.code,ts.ScriptTarget.Latest,true);
          assert.equal(parsed.parseDiagnostics.length,0);
        }else if(n===126){
          for(const code of e.code.split('// app/books/page.jsx (separate file)')){
            const result=ts.transpileModule(code,{fileName:'page.jsx',compilerOptions:{jsx:ts.JsxEmit.ReactJSX,allowJs:true},reportDiagnostics:true});
            assert.equal((result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
          }
        }else{
          const result=ts.transpileModule(e.code,{fileName:`q${n}.${/JSX/.test(e.language)?'tsx':e.language.startsWith('TypeScript')?'ts':'js'}`,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,allowJs:true},reportDiagnostics:true});
          assert.equal((result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,JSON.stringify(result.diagnostics));
        }
        row.syntax='pass';
        if(e.language==='TypeScript'||n===52){
          const file=path.join(temp,`q${n}.ts`);fs.writeFileSync(file,e.code+'\nexport {};');
          const program=ts.createProgram([file],{strict:true,noEmit:true,target:ts.ScriptTarget.ES2022,skipLibCheck:true});
          const errors=ts.getPreEmitDiagnostics(program).filter(d=>d.category===ts.DiagnosticCategory.Error);
          assert.equal(errors.length,0,errors.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join('\n'));
          row.syntax='strict TypeScript type check passed';
        }
        const standalone=(e.language==='JavaScript' && n!==371)
          || (e.language==='Node.js CommonJS (.cjs)' && ![137,147].includes(n));
        if(standalone){
          const file=path.join(temp,`q${n}.cjs`);fs.writeFileSync(file,e.code);
          row.output=run(process.execPath,[file]);row.execution='executed';report.executed.push(n);
        }
      }
      if(row.syntax!=='not applicable')report.syntax.push(n);
    }catch(error){report.errors.push({number:n,error:error.message});row.error=error.message;}
    report.ledger.push(row);
  }
  for(const name of ['question-examples.js','reader-examples.js'])run(process.execPath,['--check',root+name]);
  for(const [i,match] of [...fs.readFileSync(root+'index.html','utf8').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].entries())if(match[1].trim())new vm.Script(match[1],{filename:`inline-${i}`});
}finally{fs.rmSync(temp,{recursive:true,force:true});}
fs.writeFileSync(root+'audit/examples-code-check.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,ledger:undefined},null,2));
if(report.errors.length)process.exitCode=1;
