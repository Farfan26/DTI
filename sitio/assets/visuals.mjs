/** Buscador de gráficos y páginas documentales: no requiere API ni usa tokens. */
import {clean,tokens} from './search.mjs';
const VISUAL_RE=/(imagen(?:es)?|gr[aá]fic[oa]s?|diagramas?|visuali[sz]|capturas?|fotos?|ilustraci[oó]n|dibujo|l[aí]nea de tiempo|muestrame|mu[eé]strame|ver documentos|p[aá]ginas del pdf)/i;
const GENERATE_RE=/(gener(a|ar|ame)|cre(a|ar|ame)|dibuja|ilustra|dise[nñ]a)/i;
export function wantsVisual(q=''){return VISUAL_RE.test(q)}
export function wantsGeneration(q=''){return VISUAL_RE.test(q)&&GENERATE_RE.test(q)}
export function findVisuals(q='',catalog,limit=4){
 const records=catalog?.records||[];
 if(!records.length)return [];
 const terms=tokens(q).filter(t=>!['imagen','imagenes','grafico','graficos','pagina','paginas','ver','mostrar','dame','crea','generar','genera','visual','dibuja','ilustra','pdf','foto','fotos'].includes(t));
 const s=clean(q);
 // Petición general: mostrar una selección variada de imágenes sin saturar el chat.
 if(!terms.length || /^(ver|mostrar|muestrame|dame) (las )?(imagenes|graficos|visuales)( de sigred)?$/.test(s)) {
  return records.filter(r=>r.id?.startsWith('final-fig')).slice(3,3+limit);
 }
 const ranked=records.map(r=>{
  let score=0;const title=clean(r.title+' '+r.description),tags=clean((r.terms||[]).join(' '));
  for(const token of terms){if(title.includes(token))score+=5;if(tags.split(' ').includes(token))score+=7;else if(tags.includes(token))score+=2;}
  if(/p[aá]gina|pdf|documento|captura/.test(q.toLowerCase()))score+=r.id?.startsWith('final-page-')?6:0;
  else score+=r.id?.startsWith('final-fig')?5:0;
  // evitar página genérica de otras áreas
  if(s.includes('riesg')&&r.category==='riesgos')score+=9;
  if(/presupuest|contingenc|costo|van|economia/.test(s)&&r.id==='final-fig-22')score+=25;
  if(/validacion|usabilidad|tiempos|tarea/.test(s)&&r.id==='final-fig-21')score+=25;
  if(/cronogram|flujo|proceso/.test(s)&&r.id==='final-fig-01')score+=15;
  return {r,score};
 }).sort((a,b)=>b.score-a.score);
 const selected=ranked.filter(x=>x.score>=7).slice(0,limit).map(x=>x.r);
 return selected;
}
