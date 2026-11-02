import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {findVisuals,wantsVisual,wantsGeneration} from '../sitio/assets/visuals.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../sitio');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/visuals.json')));
test('galería ampliada: cuatro gráficos, páginas PDF y figuras DOCX',()=>{
 assert.equal(catalog.records.length,33);
 assert.equal(catalog.records.filter(r=>r.type==='grafico').length,4);
 assert.equal(catalog.records.filter(r=>r.type==='documento').length,29);
 for(const r of catalog.records){assert.ok(fs.existsSync(path.join(root,r.image)),r.image);assert.ok(fs.existsSync(path.join(root,r.source.split("#")[0])),r.source);}
});
test('intención visual y de generación',()=>{
 assert.equal(wantsVisual('Muéstrame imágenes de riesgos'),true);
 assert.equal(wantsGeneration('Genera una imagen conceptual del proyecto'),true);
 assert.equal(wantsGeneration('Muéstrame el gráfico del presupuesto'),false);
 assert.equal(wantsVisual('¿Cuánto es la reserva de contingencia?'),false);
});
test('selección visual específica: presupuesto, hitos y riesgos',()=>{
 assert.equal(findVisuals('gráfico del presupuesto',catalog,1)[0].id,'grafico-presupuesto');
 assert.equal(findVisuals('cronograma y fechas de hitos',catalog,1)[0].id,'grafico-hitos');
 assert.equal(findVisuals('imagen de riesgos R-G2',catalog,1)[0].id,'grafico-riesgos');
});
test('imágenes genéricas producen gráficos verificables',()=>{
 const picks=findVisuals('gráficos',catalog,4);
 assert.equal(picks.length,4);assert.ok(picks.every(x=>x.type==='grafico'));
});
