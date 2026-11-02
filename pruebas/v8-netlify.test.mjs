import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import chat, {config} from '../netlify/functions/chat.mjs';
import health from '../netlify/functions/health.mjs';
import master from '../netlify/functions/master-index.mjs';
import facts from '../netlify/functions/facts.mjs';
import {searchMaster} from '../sitio/assets/master-search.mjs';

function request(question,mode='auto'){
 return new Request('https://sigred-demo.netlify.app/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,mode,history:[]})});
}
async function ask(question,mode='auto'){const r=await chat(request(question,mode));return [r.status,await r.json()];}
const oldKey=process.env.GEMINI_API_KEY, oldFlag=process.env.ENABLE_PUBLIC_AI;

test('source PDF master is indexed across 105 pages',()=>{
 assert.equal(new Set(master.map(c=>c.page)).size,105);
 assert.ok(master.length>=200);
 assert.ok(facts.records.length>=58);
});
test('query master page 25 returns exact citation',()=>{
 const r=searchMaster('pagina 25 de documentacion maestra',master);
 assert.ok(r.length>0);
 assert.equal(r[0].page,25);
});
test('an external unrelated question is not invented',async()=>{
 const [s,r]=await ask('¿Quién ganó el Mundial de 2022?','local');
 assert.equal(s,200);assert.equal(r.reason,'not_documented');
});
test('budget Charter is not replaced by the cost scenario',async()=>{
 const [status,r]=await ask('¿Cuál es el presupuesto original de SIGRED?','local');
 assert.equal(status,200);assert.match(r.answer,/29,208\.85/);
});
test('no API key returns local without leaking secret',async()=>{
 delete process.env.GEMINI_API_KEY;delete process.env.ENABLE_PUBLIC_AI;
 const [s,r]=await ask('¿Qué dice la página 25 de la documentación maestra?','ai');
 assert.equal(s,200);assert.equal(r.mode,'local');assert.ok(r.sourceLinks.some(x=>x.path.includes('page=25')));
});
test('health reveals configuration but not keys',async()=>{
 process.env.GEMINI_API_KEY='SENSITIVE_TEST_KEY';process.env.ENABLE_PUBLIC_AI='true';
 const response=await health(new Request('https://sigred-demo.netlify.app/api/health'));
 const text=await response.text();assert.match(text,/aiConfigured":true/);assert.ok(!text.includes('SENSITIVE_TEST_KEY'));
});
test('AI request receives evidence and model answer, no exposed secret',async()=>{
 process.env.GEMINI_API_KEY='SENSITIVE_TEST_KEY';process.env.ENABLE_PUBLIC_AI='true';
 const orig=global.fetch;
 let called=false,requestBody='';
 global.fetch=async(_url,options)=>{called=true;requestBody=options.body;assert.equal(options.headers['x-goog-api-key'],'SENSITIVE_TEST_KEY');return Response.json({candidates:[{content:{parts:[{text:'El análisis de SIGRED debe distinguir el escenario económico de los gastos aprobados. [Documentación Maestra, p. 3]'}]}}]});};
 try{const [s,r]=await ask('Analiza la diferencia entre presupuesto original y transición a producción en SIGRED.','ai');assert.equal(s,200);assert.equal(r.mode,'gemini');assert.ok(called);assert.ok(requestBody.includes('DOCUMENTACIÓN MAESTRA'));assert.ok(!JSON.stringify(r).includes('SENSITIVE_TEST_KEY'));}
 finally{global.fetch=orig;}
});
test('Gemini quota error returns documentary fallback',async()=>{
 process.env.GEMINI_API_KEY='fake';process.env.ENABLE_PUBLIC_AI='true';
 const old=global.fetch;global.fetch=async()=>Response.json({error:{message:'quota'}},{status:429});
 try{const [s,r]=await ask('Analiza el presupuesto original de SIGRED y sus escenarios hipotéticos','ai');assert.equal(s,200);assert.equal(r.mode,'local');assert.ok(r.answer.length>50);}finally{global.fetch=old;}
});
test('bad input is rejected',async()=>{
 const r=await chat(new Request('https://s.netlify.app/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:'ab'})}));assert.equal(r.status,400);
});
test('unsupported HTTP verb rejected',async()=>{
 const r=await chat(new Request('https://s.netlify.app/api/chat',{method:'GET'}));assert.equal(r.status,405);
});
test('client assets contain operational topic handlers',async()=>{
 const base=path.dirname(fileURLToPath(import.meta.url));
 const h=await readFile(path.join(base,'../sitio/index.html'),'utf8');
 const app=await readFile(path.join(base,'../sitio/assets/app.mjs'),'utf8');
 for(const topic of ['estado','riesgos','cronograma','asesoria','visuales','presupuesto','biblioteca','consulta'])assert.ok(h.includes(`data-topic="${topic}"`));
 assert.ok(app.includes("topic==='biblioteca'"));
});
test('rate limitation configured on server function',()=>{
 assert.equal(config.path,'/api/chat');assert.equal(config.rateLimit.aggregateBy,'ip');assert.ok(config.rateLimit.windowLimit<=12);
});
