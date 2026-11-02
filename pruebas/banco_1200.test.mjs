import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {getAnswer} from '../sitio/assets/search.mjs';
const kb=JSON.parse(fs.readFileSync(new URL('../sitio/data/knowledge.json',import.meta.url)));
kb.qa=JSON.parse(fs.readFileSync(new URL('../sitio/data/questions_locales_1200.json',import.meta.url))).items;
test('1280 formulaciones de consultas históricas vinculadas a fuentes documentales',()=>{
 assert.equal(kb.qa.length,1280);
 for(const [n,q] of kb.qa.entries()){
  const r=getAnswer(q.pregunta,kb);
  assert.equal(r.found,true,'no resuelta pregunta '+n);
  assert.equal(r.items[0].rec.id,q.respuesta_id,'ficha incorrecta '+n);
  assert.ok(kb.sources[q.fuente], 'fuente desconocida '+n);
 }
});
test('pregunta externa no se mapea al banco oficial',()=>{
 const r=getAnswer('¿Quién ganó el mundial de fútbol 2022?',kb);assert.equal(r.found,false);
});
