import test from 'node:test';
import assert from 'node:assert/strict';
import {PMO_DOMAINS,domainFromQuestion,domainFallback} from '../sitio/assets/pmo-domains.mjs';
import chat from '../netlify/functions/chat.mjs';
for(const [name,domain] of Object.entries(PMO_DOMAINS)){
 test('Dominio '+name+' tiene tres preguntas únicas',()=>{assert.equal(domain.questions.length,3);assert.equal(new Set(domain.questions).size,3);});
 for(const [i,q] of domain.questions.entries())test('Enrutamiento pregunta '+name+' '+(i+1),()=>{assert.equal(domainFromQuestion(q)?.topic,domain.topic);});
 test('Respaldo explicativo '+name,()=>assert.ok(domainFallback(domain).length>100));
}
test('Las nueve consultas pueden usar Gemini por /api/chat manteniendo la clave privada',async()=>{
 const key=process.env.GEMINI_API_KEY,enabled=process.env.ENABLE_PUBLIC_AI,original=global.fetch;process.env.GEMINI_API_KEY='TEST_FAKE_KEY';process.env.ENABLE_PUBLIC_AI='true';let requests=0;
 global.fetch=async(url,opts)=>{assert.match(url,/generativelanguage.googleapis.com/);assert.equal(opts.headers['x-goog-api-key'],'TEST_FAKE_KEY');requests++;return Response.json({candidates:[{content:{parts:[{text:'Análisis SIGRED con evidencia, aclarando límites de información.'}]}}],usageMetadata:{totalTokenCount:10}})};
 try{for(const d of Object.values(PMO_DOMAINS))for(const q of d.questions){const r=await chat(new Request('https://test.invalid/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,topic:d.topic,mode:'ai',history:[]})}));const j=await r.json();assert.equal(r.status,200);assert.ok(['gemini','local'].includes(j.mode));assert.ok(j.answer.length>20);}assert.ok(requests>=1);}finally{global.fetch=original;if(key===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=key;if(enabled===undefined)delete process.env.ENABLE_PUBLIC_AI;else process.env.ENABLE_PUBLIC_AI=enabled;}
});
