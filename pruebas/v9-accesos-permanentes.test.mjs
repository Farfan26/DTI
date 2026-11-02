/** Comprobaciones de las ocho acciones permanentes, sin acceder a Gemini. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile(new URL('../sitio/index.html',import.meta.url),'utf8');
const app=await readFile(new URL('../sitio/assets/app.mjs',import.meta.url),'utf8');
const css=await readFile(new URL('../sitio/assets/styles.css',import.meta.url),'utf8');
const actions=['estado','riesgos','cronograma','asesoria','presupuesto','biblioteca','visuales','consulta'];
test('barra permanente está fuera de la bienvenida y sobre el formulario',()=>{
 assert.match(html,/<nav id="actionDock" class="action-dock"/);
 assert.ok(html.indexOf('id="actionDock"')>html.indexOf('id="chatLog"'));
 assert.ok(html.indexOf('id="actionDock"')>html.indexOf('id="welcome"'));
 assert.ok(html.indexOf('id="actionDock"')<html.indexOf('id="composer"'));
});
test('ocho categorías tienen botón real que reutiliza sendTopic',()=>{
 const dock=html.match(/<div class="action-track" id="persistentActions"[^>]*>(.*?)<\/div>/s);
 assert.ok(dock,'no aparece barra de accesos');
 const attrs=[...dock[1].matchAll(/data-topic="([^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(attrs,actions);
 assert.match(app,/\$\$\('\[data-topic\]'\)\.forEach\(b=>b\.addEventListener\('click'/);
 assert.match(app,/sendTopic\(b\.dataset\.topic\)/);
});
test('el botón Ver todas es operable, expandible y accesible',()=>{
 assert.match(html,/id="toggleAllTopics"[^>]+aria-controls="persistentActions"[^>]+aria-expanded="false"/);
 assert.match(app,/#toggleAllTopics'\)\.addEventListener\('click'/);
 assert.match(css,/\.action-dock\.is-expanded \.action-track/);
});
test('ocho colores de categoría y modo celular sin ocultar los accesos',()=>{
 for(const id of actions)assert.ok(css.includes('.dock-topic-'+id),'falta estilo '+id);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/\.action-track\{display:flex;gap:7px;overflow-x:auto/);
 assert.doesNotMatch(css,/#actionDock\{display:none/);
});
