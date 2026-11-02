/** Motor de búsqueda local; sin bibliotecas, sin API y sin costo por consulta. */
const STOP = new Set('a al algo alguna algunas alguno algunos ante antes asi bajo bien cada como con contra cual cuales cuando de del desde donde dos el ella ellos en entre era eran es esta estas este esto estos fue ha hay la las le les lo los mas me mi mis muy no nos nuestra nuestros o para pero por porque que quien quienes se sea ser si sin sobre son su sus te tiene un una unas uno unos y ya yo tu tus proyecto sigred favor dame dime informacion datos necesito quisiera puedo quiero saber acerca'.split(' '));
const ALIAS = {
  gastos:'costo', gastado:'ejecutado', gastar:'ejecutado', gastaron:'ejecutado', dinero:'presupuesto', plata:'presupuesto', vale:'presupuesto', cuesta:'presupuesto', costos:'costo', precios:'costo', monto:'presupuesto',
  peligro:'riesgo', peligros:'riesgo', riesgos:'riesgo', amenazas:'riesgo', problema:'alerta', problemas:'alerta', alertas:'alerta', mitigacion:'mitigar',
  fecha:'cronograma', fechas:'cronograma', calendario:'cronograma', entrega:'hitos', entregas:'hitos', entregar:'hitos', cuando:'cronograma',
  parciales:'entregables', parcial:'entregables', terminados:'completados', terminada:'completados', completado:'completados',
  proxima:'proximos', proximas:'proximos', siguiente:'proximos', siguientes:'proximos', termina:'final', termina:'final', acaba:'final', finaliza:'final', culmina:'final',
  directivo:'director', dirige:'director', lider:'director', encargado:'responsable', personas:'equipo', participantes:'equipo', participa:'equipo', integrantes:'equipo',
  objetivos:'objetivo', funcion:'objetivo', funcionalidades:'alcance',
  reservas:'reserva', duplicados:'duplicidad', duplicadas:'duplicidad', reserva:'reserva',
  evaluacion:'validacion', validaciones:'validacion',
};
export function clean(s='') {return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[–—]/g,'-').replace(/[^a-z0-9\-\s]/g,' ').replace(/\s+/g,' ').trim();}
export function tokens(s='') {return [...new Set(clean(s).split(' ').map(x=>ALIAS[x]||x).filter(w=>w.length>2 && !STOP.has(w)))];}
const TOPIC_RE = {
  riesgos:/riesg|mitig|alerta|amenaza|r-[gtce]\d|integridad|duplicad|probabilidad|impacto/i,
  presupuesto:/presupuest|costo|gasto|contingenc|dinero|monto|pag|variaci[oó]n|ahorro|valorizaci[oó]n/i,
  cronograma:/cronogram|hito|fecha|entrega|informe final|parcial 5|gantt|calendario|plazo|11\/11|31\/10|14\/11/i,
  estado:/estado|avance|progreso|semaforo|sem[aá]foro|completad|pendient|evm|resultado|prototipo|usabilidad/i,
  proyecto:/objetivo|alcance|integrantes|equipo|stakeholder|interesados|beneficiari|prop[oó]sito|qu[eé] es sigred|director/i
};
function topicOf(q){for(const [k,rx] of Object.entries(TOPIC_RE)) if(rx.test(q))return k;return null;}
function score(q,rec){
 const qq=tokens(q), term=tokens(rec.terms), title=tokens(rec.title), body=tokens(rec.answer);
 let points=0, matches=0;
 for (const w of qq) {
  let v=0;
  if (term.includes(w))v=Math.max(v,4);
  if (title.includes(w))v=Math.max(v,4.5);
  if (body.includes(w))v=Math.max(v,1.1);
  if (v>0)matches++;
  points+=v;
 }
 const topic=topicOf(q);
 if(topic && topic===rec.topic)points+=3;
 // A named risk ID should outrank generic risk summaries
 const ids=q.match(/\bR-[TGCE]\d\b/gi)||[];
 if(ids.length)points += ids.some(id=>rec.id===`riesgo-${id.toLowerCase().replace('r-','')}`) ? 45 : ids.some(id=>clean(rec.title).includes(clean(id))) ? 10 : -12;
 const phrase=clean(q);
 if(phrase.length>8 && (clean(rec.title).includes(phrase)||clean(rec.terms).includes(phrase)))points+=6;
 return {rec,score:points,matches};
}
export function searchKnowledge(q,kb,limit=3){
 if(!kb?.records || !q?.trim())return [];
 const candidates=kb.records.map(r=>score(q,r)).sort((a,b)=>b.score-a.score);
 const idMention=/\bR-[TGCE]\d\b/i.test(q);
 return candidates.filter(x=>x.score >= (idMention?9:6) && (x.matches>=(idMention?1:1))).slice(0,limit);
}
export function getAnswer(q,kb,forcedTopic=null){
 const normalized=clean(q);
 // Índice de reformulaciones documentales: solo remite a fichas con fuente, no añade datos.
 if(Array.isArray(kb?.qa)&&kb.qa.length){
  if(!kb.__qaIndex)kb.__qaIndex=new Map(kb.qa.map(item=>[clean(item.pregunta),item.respuesta_id]));
  const id=kb.__qaIndex.get(normalized);
  if(id){const rec=kb.records.find(r=>r.id===id);if(rec)return {found:true,items:[{rec,score:100}],mode:'local'};}
 }
 const topicMap={estado:'estado',riesgos:'riesgos',cronograma:'cronograma',presupuesto:'presupuesto',proyecto:'proyecto'};
 // Buttons force one unambiguous official summary
 if(forcedTopic && topicMap[forcedTopic]){
  const map={estado:'estado-resumen',riesgos:'riesgos-resumen',cronograma:'hitos-proximos',presupuesto:'pres-total',proyecto:'proposito'};
  const rec=kb.records.find(r=>r.id===map[forcedTopic]);
  return {found:true,items:[{rec,score:50}],mode:'local'};
 }
 const greeting=/^(hola|buenas|hey|hello|buenos dias|buenas tardes|gracias)[.!\s]*$/.test(normalized);
 if(greeting)return {found:false,greeting:true,items:[],mode:'local'};
 // Preguntas conversacionales breves que no contienen suficientes términos para el puntaje.
 // No se disparan para temas externos; se restringen a SIGRED o el proyecto.
 let direct=null;
 if (/^(que es sigred|para que sirve sigred|de que trata sigred|explica sigred)$/.test(normalized)) direct='proposito';
 else if (/^(como va (el )?proyecto|como esta (el )?proyecto|estado de sigred|situacion de sigred)$/.test(normalized)) direct='estado-resumen';
 else if (/^(quien dirige sigred|quien lidera sigred|quien es el director (de )?sigred)$/.test(normalized)) direct='equipo';
 else if (/^(cuando (acaba|termina|finaliza) sigred|cuando (acaba|termina|finaliza) (el )?proyecto)$/.test(normalized)) direct='hitos-fin';
 else if (/^(cual es (el )?semaforo|como esta el semaforo|que color tiene el semaforo)( de sigred)?$/.test(normalized)) direct='estado-semaforo';
 else if (/^(cuanto falta|que porcentaje falta|cuanto queda)( del proyecto| de sigred)?$/.test(normalized)) direct='estado-entregables';
 if(direct){const rec=kb.records.find(r=>r.id===direct);if(rec)return {found:true,items:[{rec,score:50}],mode:'local'};}
 const hits=searchKnowledge(q,kb,3);
 // RAG-like FAQ lookup; only reply if sufficiently strong rather than fabricating.
 if(!hits.length || hits[0].score<7)return {found:false,items:[],mode:'local'};
 return {found:true,items:[hits[0]],mode:'local'};
}
export function citations(hits,kb){return [...new Map(hits.map(x=>[x.rec.source,{...kb.sources[x.rec.source],page:x.rec.page}])).values()];}
