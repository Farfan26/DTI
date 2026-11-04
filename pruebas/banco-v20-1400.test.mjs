import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import chat from '../netlify/functions/chat.mjs';
import {classifyIntent} from '../sitio/assets/conversation-router.mjs';
import {detectTrap} from '../sitio/assets/trap-guards.mjs';
import {classifyEvidence,EVIDENCE} from '../sitio/assets/evidence-policy.mjs';
const cases=JSON.parse(fs.readFileSync(new URL('./banco_v20_1500_casos.json',import.meta.url),'utf8'));
const request=q=>new Request('https://local.invalid/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q,mode:'local',topic:'pmo_gobernanza'})});
test('V20 - 1500 preguntas únicas ejecutadas contra el endpoint local',async()=>{
 assert.equal(cases.length,1500);assert.equal(new Set(cases.map(c=>c.question)).size,1500);
 const errors=[];const counts={};
 for(const c of cases){
  try{
   const r=await chat(request(c.question));const x=await r.json();
   assert.equal(r.status,200);assert.ok(x.answer?.length>10,'respuesta vacía');
   assert.ok(EVIDENCE[x.evidenceClass],`evidencia ausente ${x.evidenceClass}`);
   assert.equal(x.responseOrigin,'respuesta_local_preconfigurada');
   assert.doesNotMatch(JSON.stringify(x),/BEGIN PRIVATE KEY|V20_PRIVATE_SECRET_TEST/);
   if(c.kind==='external'){assert.equal(x.reason,'outside_project');assert.equal(x.evidenceClass,'ND');}
   if(c.kind==='trap'&&detectTrap(c.question))assert.match(x.reason,/^trap_guard_/);
   if(c.kind==='project')assert.equal(classifyIntent(c.question),'project');
   counts[c.kind]=(counts[c.kind]||0)+1;
  }catch(e){errors.push(`${c.id}: ${e.message}`);}
 }
 assert.deepEqual(errors,[],`${errors.length} errores: ${errors.slice(0,25).join('; ')}`);assert.deepEqual(counts,{social:375,project:375,external:375,trap:375});
 assert.deepEqual(errors,[],`${errors.length} errores: ${errors.slice(0,20).join('; ')}`);
});
test('V20 - clases documentado/calculado/propuesta/simulación/no disponible',()=>{
 assert.deepEqual(Object.keys(EVIDENCE),['D','C','P','S','ND']);
 assert.equal(classifyEvidence({reason:'outside_project'}),'ND');
 assert.equal(classifyEvidence({answer:'Escenario hipotético de gestión',sourceLinks:[{path:'x'}]}),'S');
 assert.equal(classifyEvidence({answer:'Propuesta para resolver el incidente'}),'P');
 assert.equal(classifyEvidence({answer:'El riesgo R-G2 es alto',sourceLinks:[{path:'x'}]}),'D');
 assert.equal(classifyEvidence({answer:'CPI = EV / AC calculado',sourceLinks:[{path:'x'}]}),'C');
});
test('V20 - respuesta Gemini simulada se distingue de preconfigurada y no filtra secreto',async()=>{
 const original=globalThis.fetch,key=process.env.GEMINI_API_KEY,enabled=process.env.ENABLE_PUBLIC_AI;
 process.env.GEMINI_API_KEY='V20_PRIVATE_SECRET_TEST';process.env.ENABLE_PUBLIC_AI='true';
 globalThis.fetch=async()=>Response.json({candidates:[{content:{parts:[{text:'Diagnóstico ejecutivo: El proyecto registra 4 de 6 entregables.\n\nEvidencia y análisis: Estado informado el 21/10/2026.\n\nRecomendación PMO: Actualizar el registro.\n\nFuentes: Informe de Estado.'}]}}]});
 try{const r=await chat(new Request('https://local.invalid/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:'¿Cuál es el estado general de SIGRED?',mode:'ai'})}));const x=await r.json();assert.equal(x.mode,'gemini');assert.equal(x.responseOrigin,'generada_por_gemini');assert.ok(EVIDENCE[x.evidenceClass]);assert.doesNotMatch(JSON.stringify(x),/V20_PRIVATE_SECRET_TEST/);}
 finally{globalThis.fetch=original;if(key===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=key;if(enabled===undefined)delete process.env.ENABLE_PUBLIC_AI;else process.env.ENABLE_PUBLIC_AI=enabled;}
});
