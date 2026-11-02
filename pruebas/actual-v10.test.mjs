import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {getAnswer,searchKnowledge} from '../sitio/assets/search.mjs';
import {searchMaster} from '../sitio/assets/master-search.mjs';
import {findVisuals} from '../sitio/assets/visuals.mjs';
import chat,{config} from '../netlify/functions/chat.mjs';
import health from '../netlify/functions/health.mjs';
import facts from '../netlify/functions/facts.mjs';
import master from '../netlify/functions/master-index.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'sitio/data/knowledge.json'),'utf8'));
const bank=JSON.parse(fs.readFileSync(path.join(root,'sitio/data/questions_locales_1200.json'),'utf8'));
const visual=JSON.parse(fs.readFileSync(path.join(root,'sitio/data/visuals.json'),'utf8'));
data.qa=bank;
const ask=async(q,mode='local',hist=[])=>{const r=await chat(new Request('https://test.local/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,mode,history:hist})}));return {status:r.status,body:await r.json()};};
for(const [desc,fn] of [
 ['La fuente principal es Informe Final vigente',()=>assert.ok(data.sources.final.path.endsWith('SIGRED_Informe_Final_Consolidado_2026.pdf'))],
 ['No se sirve el viejo PDF maestro',()=>assert.ok(!fs.existsSync(path.join(root,'sitio/documentos/SIGRED_DOCUMENTACION_MAESTRA_2026.pdf')))],
 ['No se sirven las fuentes antiguas conflictivas',()=>assert.equal(Object.keys(data.sources).length,2)],
 ['Fuente de semáforo incluida',()=>assert.ok(fs.existsSync(path.join(root,data.sources.semaforo.path.replace(/^/,'sitio/'))))],
 ['80 páginas del informe final',()=>assert.equal(new Set(master.map(x=>x.page)).size,80)],
 ['Más de 250 fragmentos de evidencia',()=>assert.ok(master.length>=250)],
 ['108 fichas documentales',()=>assert.ok(data.records.length>=108)],
 ['Más de 1000 preguntas de consulta',()=>assert.ok(bank.length>1000)],
 ['No hay preguntas duplicadas',()=>assert.equal(new Set(bank.map(x=>x.pregunta)).size,bank.length)],
 ['Todas las preguntas apuntan a registros',()=>assert.ok(bank.every(x=>data.records.some(r=>r.id===x.respuesta_id)))],
 ['Ninguna pregunta aporta un dato fuera de ficha',()=>assert.ok(bank.every(x=>Object.keys(x).join(',')==='pregunta,respuesta_id'))],
 ['Apropiado al prototipo y no producción',()=>assert.match(getAnswer('estado del proyecto',data,'estado').items[0].rec.answer,/no existe evidencia|no.*producci[oó]n/i)],
 ['Presupuesto incremental no aprobado',()=>assert.match(getAnswer('presupuesto',data,'presupuesto').items[0].rec.answer,/14 881,23/)],
 ['Tablero con estado sin datos',()=>assert.match(data.records.find(x=>x.id==='estado-semaforo').answer,/NO EVALUABLE/)],
 ['Riesgos simulados señalados',()=>assert.match(getAnswer('riesgos',data,'riesgos').items[0].rec.answer,/ILUSTRATIVAS/)],
 ['El prototipo tiene 14 pantallas',()=>assert.match(data.records.find(x=>x.id==='prototipo-pantallas').answer,/14/)],
 ['Página 78 recuperable con evidencia',()=>assert.equal(searchMaster('¿Qué dice la página 78 del informe final?',master)[0]?.page,78)],
 ['Página 1 recuperable con evidencia',()=>assert.equal(searchMaster('¿Qué dice la página 1 del informe final?',master)[0]?.page,1)],
 ['34 imágenes o más incorporadas',()=>assert.ok(visual.records.length>=34)],
 ['Todas las imágenes existen en el proyecto',()=>assert.ok(visual.records.every(x=>fs.existsSync(path.join(root,'sitio',x.image))))],
 ['Figuras originales recortadas disponibles',()=>assert.ok(visual.records.filter(x=>x.id.startsWith('final-fig')).length>=22)],
 ['Consulta visual de presupuesto encuentra su gráfico',()=>assert.ok(findVisuals('muéstrame el gráfico del VAN y costos',visual).some(x=>x.id==='final-fig-22'))],
 ['Consulta visual de usabilidad encuentra figura',()=>assert.ok(findVisuals('imagen de tiempos de validación de tareas',visual).some(x=>x.id==='final-fig-21'))],
 ['Menú permanente con ocho acciones',()=>assert.equal((fs.readFileSync(path.join(root,'sitio/index.html'),'utf8').match(/class="dock-topic dock-topic-/g)||[]).length,8)],
 ['Función Netlify usa ruta /api/chat',()=>assert.equal(config.path,'/api/chat')],
 ['La página incluye logo SIGRED',()=>assert.ok(fs.existsSync(path.join(root,'sitio/assets/logo_sigred_original.jpeg')))],
 ['No se incluye archivo privado .env',()=>assert.ok(!fs.existsSync(path.join(root,'.env')))],
 ['Formulario de tablas y formato seguro',()=>assert.match(fs.readFileSync(path.join(root,'sitio/assets/app.mjs'),'utf8'),/reply-table/)],
 ['Historial sigue disponible',()=>assert.ok(fs.existsSync(path.join(root,'sitio/assets/chats.mjs')))],
 ['Fichas de presupuesto no son costos reales',()=>assert.match(data.records.find(x=>x.id==='pres-operacion').answer,/estimaciones|no gastos ejecutados/)],
])test(desc,fn);
for(const text of ['Hola','¿Qué tal causa?','Qué cuentas causa','Buenos dias','Gracias'])test('Saludo amable sin gastar IA: '+text,async()=>{const r=await ask(text,'ai');assert.equal(r.status,200);assert.equal(r.body.mode,'local');assert.match(r.body.answer,/SIGRED/i);});
for(const text of ['¿Quién ganó el Mundial de 2022?','¿Cuál es la capital de Francia?','¿Qué dice mi horóscopo?'])test('Pregunta externa amable: '+text,async()=>{const r=await ask(text,'ai');assert.equal(r.status,200);assert.equal(r.body.mode,'local');assert.match(r.body.answer,/Puedes preguntar|preguntarme|SIGRED/i);});
test('URL de la clave no se expone en /api/health',async()=>{const prior=process.env.GEMINI_API_KEY;process.env.GEMINI_API_KEY='FAKE_SECRET_TEST';process.env.ENABLE_PUBLIC_AI='true';const x=await health(new Request('https://test.local/api/health'));const t=await x.text();assert.match(t,/aiConfigured":true/);assert.ok(!t.includes('FAKE_SECRET_TEST'));if(prior===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=prior;});
test('API responde cordial sin clave por la ruta pública',async()=>{const v=await ask('hola','ai');assert.equal(v.body.aiStatus,'courtesy');});
test('Sin clave Gemini usa documentos',async()=>{const prior=process.env.GEMINI_API_KEY;delete process.env.GEMINI_API_KEY;const v=await ask('Explica la validación del prototipo SIGRED','ai');assert.equal(v.body.mode,'local');if(prior)process.env.GEMINI_API_KEY=prior;});
for (const code of [403,404,429])test('Gemini error simulado '+code+' conserva respuesta documental',async()=>{const prior=global.fetch,k=process.env.GEMINI_API_KEY,v=process.env.ENABLE_PUBLIC_AI;process.env.GEMINI_API_KEY='TEST_ONLY';process.env.ENABLE_PUBLIC_AI='true';global.fetch=async()=>new Response('{}',{status:code});try{const out=await ask('Explica los tiempos de usabilidad SIGRED','ai');assert.equal(out.body.mode,'local');assert.ok(out.body.answer.length>60);}finally{global.fetch=prior;if(k===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=k;if(v===undefined)delete process.env.ENABLE_PUBLIC_AI;else process.env.ENABLE_PUBLIC_AI=v;}});
test('Gemini simulado: recibe evidencia del Informe Final y devuelve texto',async()=>{const orig=global.fetch,key=process.env.GEMINI_API_KEY,enable=process.env.ENABLE_PUBLIC_AI;process.env.GEMINI_API_KEY='MOCK_KEY';process.env.ENABLE_PUBLIC_AI='true';let body='';global.fetch=async(url,args)=>{assert.match(url,/generativelanguage.googleapis.com/);assert.equal(args.headers['x-goog-api-key'],'MOCK_KEY');body=args.body;return Response.json({candidates:[{content:{parts:[{text:'La validación del prototipo fue controlada; no constituye operación en producción.'}]}}],usageMetadata:{totalTokenCount:101}})};try{const out=await ask('Explícame la validación de las tareas de SIGRED.','ai');assert.equal(out.body.mode,'gemini');assert.match(body,/INFORME FINAL|Informe Final/);assert.equal(out.body.usage.totalTokens,101);}finally{global.fetch=orig;if(key===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=key;if(enable===undefined)delete process.env.ENABLE_PUBLIC_AI;else process.env.ENABLE_PUBLIC_AI=enable;}});
