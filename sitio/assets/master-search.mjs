/**
 * Buscador lexical por fragmentos de la INFORME FINAL de 80 páginas.
 * Jamás fabrica una frase: devuelve texto literal y el número de página.
 * No es embedding semántico; sirve como índice local de respaldo sin tokens.
 */
import {tokens,clean} from './search.mjs';
const ignores=new Set(['documentacion','documentos','maestra','paginas','pagina','manual','texto','cual','cuales','revisa','dime','puedes','muestreme','muestrame','sigred','udep','sobre','explica','explicame','busca','escribe','figura','segun','informe','parcial','universidad','piura']);
function queryWords(query){return tokens(query).filter(t=>t.length>=3&&!ignores.has(t));}
export function searchMaster(question,chunks=[],limit=3){
 if(typeof question!=='string'||!Array.isArray(chunks)||!chunks.length)return [];
 const q=clean(question);
 const pageRequest=q.match(/(?:pagina|pag) (\d{1,3})/);
 if(pageRequest && (+pageRequest[1] >= 1 && +pageRequest[1] <= 80) && /documentacion|maestra|pagina/.test(q)){
   return chunks.filter(c=>c.page===+pageRequest[1]).slice(0,limit).map(c=>({...c,score:100}));
 }
 const terms=queryWords(question);if(!terms.length)return [];
 const scores=[];
 // Evaluación simple lexical. No transforma conocimiento en resultados ficticios.
 for(const chunk of chunks){
   const text=clean(chunk.text||''); const heading=clean(chunk.title||'');
   let score=0,matched=0;
   for(const word of terms){
     const isHit=new RegExp('(?:^|\\s)'+word+'[a-z0-9]*\\b').test(text);
     const inHead=new RegExp('(?:^|\\s)'+word+'[a-z0-9]*\\b').test(heading);
     if(isHit||inHead){matched++;score+=1.35+(word.length>=6?0.65:0)+(inHead?0.55:0)}
   }
   const coverage=matched/terms.length;
   if(terms.length>=2&&matched<2)continue;
   if(terms.length===1&& (matched<1 || terms[0].length<6))continue;
   if(terms.length>=3&&coverage<0.5)continue;
   score*=coverage;
   if(score<1.9)continue;
   scores.push({...chunk,score:+score.toFixed(3)});
 }
 return scores.sort((a,b)=>b.score-a.score).slice(0,limit);
}
export function quoteMasterResults(hits,limit=2){
 return hits.slice(0,limit).map(h=>`**Informe Final Consolidado, página ${h.page}:**\n${h.text.slice(0,650)}${h.text.length>650?'…':''}`).join('\n\n');
}
export function masterLinks(hits){return [...new Set(hits.map(h=>h.page))].map(page=>({name:`Informe Final SIGRED · pág. ${page}`,path:`documentos/SIGRED_Informe_Final_Consolidado_2026.pdf#page=${page}`}));}
