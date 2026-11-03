import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import chat from '../netlify/functions/chat.mjs';
import {classifyIntent,socialFallback} from '../sitio/assets/conversation-router.mjs';
const socialBases=['hola','ola','holaaaa','holi','wenas','buenas','hey','ey','que tal','q tal','ke tal','que cuentas','q cuentas','como estas','kmo staz','que tal tu dia','que onda','que fue','gracias','graciasss','buenos dias','saludos','todo bien','que me cuentas'];
const tails=['',' causa',' bro',' amigo',' mano',' hoy',' por aqui',' un gusto',' compa',' por favor',' todo bien',' que gusto',' amigo hoy',' bro hoy',' causa hoy'];
const ends=[...new Set([...tails,...tails.flatMap(a=>[' jaja',' jeje',' saludos',' compa',' causa',' mi bro',' amigo'].map(b=>a+b))])];
const openings=['hola','hola causa','buenas','hey','oye','ola','holi','q tal','bro','buenos dias'];
const projectQs=['presupuesto de SIGRED','riesgo R-G2','cronograma de SIGRED','prototipo SIGRED','avance SIGRED','los entregables','la gobernanza de SIGRED','la ruta critica SIGRED','el CPI de SIGRED','la matriz de riesgos'];
const extQs=['quien es el presidente del Peru','cual es la capital de Francia','cuanto es 150 x 25','que dice el horoscopo','dame una receta de arroz con pollo','quien gano el mundial','como va el clima hoy','explica relatividad de Einstein','que es bitcoin','precio del dolar'];
const groups=[];for(const a of socialBases)for(const b of ends)groups.push({q:a+b,expected:'social'});
for(const a of openings)for(const b of projectQs)groups.push({q:a+' necesito saber '+b,expected:'project'});
for(const a of openings)for(const b of extQs)groups.push({q:a+', dime '+b,expected:'offtopic'});
const typoQs=['ola k tal caussa','holaaaa brooo q kuentas','wenas kmo staz','q tal tu dia hoy','que fue mano','hola quiero saber el presupuesto de sigreed','prezupuesto de sigred','graciasss','kmo estas amigo','holaa caussa'];
const typoExpected=['social','social','social','social','social','project','project','social','social','social'];
for(let i=0;i<typoQs.length;i++)groups.push({q:typoQs[i],expected:typoExpected[i]});
const count=groups.length;
fs.writeFileSync(new URL('./banco_conversacional_v19.json',import.meta.url),JSON.stringify({total:groups.length,notes:'Variaciones generadas para validación de intención, no respuestas fijas ni entrenamiento de Gemini.',cases:groups},null,2));
test(`V19 - banco conversacional ${count} mensajes variados y enrutados sin respuestas rígidas`,()=>{const errors=[];for(const v of groups){const got=classifyIntent(v.q);if(got!==v.expected)errors.push([v.q,v.expected,got]);}assert.deepEqual(errors.slice(0,12),[],`${errors.length} errores sobre ${count}`)});
test('V19 - el bot mantiene conversaciones de cortesía con respuestas dependientes del contexto',async()=>{
 const questions=['ola k tal caussa','wenas kmo staz','q tal tu dia hoy','graciasss','que fue mano'];
 for(const q of questions){const res=await chat(new Request('https://test.local/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q,mode:'local'})}));assert.equal(res.status,200);const x=await res.json();assert.equal(x.reason,'social_fallback',q);assert.ok(x.answer.length>10);assert.doesNotMatch(x.answer,/Diagnóstico ejecutivo:/);}
});
test('V19 - el mensaje fuera de proyecto con saludo no se envía al RAG',async()=>{
 for(const q of ['hola dime quien es el presidente del Peru','oye cuanto es 150 x 25','buenas dame una receta de arroz con pollo']){const res=await chat(new Request('https://test.local/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q,mode:'local',topic:'pmo_gobernanza'})}));const x=await res.json();assert.equal(x.reason,'outside_project',q);}
});
test('V19 - Gemini genera conversación informal contextual sin revelar API Key',async()=>{
 const old=globalThis.fetch, k=process.env.GEMINI_API_KEY, e=process.env.ENABLE_PUBLIC_AI;
 process.env.GEMINI_API_KEY='V19_TEST_ONLY_SECRET_ABC';process.env.ENABLE_PUBLIC_AI='true';
 globalThis.fetch=async()=>Response.json({candidates:[{content:{parts:[{text:'¡Qué tal! Me alegra conversar contigo. ¿Cómo va todo por allá?'}]}}]});
 try{const res=await chat(new Request('https://test.local/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:'ola k tal caussa',mode:'auto',history:[{role:'user',text:'hola'}]})}));const x=await res.json();assert.equal(x.mode,'gemini');assert.equal(x.reason,'social_conversation');assert.doesNotMatch(JSON.stringify(x),/V19_TEST_ONLY_SECRET_ABC/);}
 finally{globalThis.fetch=old;if(k===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=k;if(e===undefined)delete process.env.ENABLE_PUBLIC_AI;else process.env.ENABLE_PUBLIC_AI=e;}
});
