/** V19 — Router tolerante a escritura informal y errores comunes. No aprende secretos
 * ni sustituye al RAG; encamina las intenciones para que Gemini redacte respuestas. */
export const normalizeIntent = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/(.)\1{2,}/g,'$1$1').replace(/[¿?¡!.,;:()\[\]]+/g,' ').replace(/\s+/g,' ').trim();
const aliases={graciass:'gracias',graciasss:'gracias',holi:'hola',holis:'hola',holaa:'hola',olaa:'hola',ola:'hola',holaaa:'hola',wena:'buenas',wenas:'buenas',bno:'bueno',bnas:'buenas',bnas:'buenas',q:'que',k:'que',ke:'que',qe:'que',khe:'que',talvez:'tal vez',komo:'como',kmo:'como',cm:'como',stas:'estas',staz:'estas',etaz:'estas',cuentaz:'cuentas',kuentas:'cuentas',kentas:'cuentas',kiero:'quiero',broder:'bro',caussa:'causa',causaa:'causa',sigreed:'sigred',sigredd:'sigred',riesgoss:'riesgos',prezupuesto:'presupuesto',presupesto:'presupuesto',cronogramaa:'cronograma'};
function canon(s){return normalizeIntent(s).split(' ').map(t=>aliases[t]||t).join(' ');}
function edit(a,b){if(Math.abs(a.length-b.length)>2)return 3;let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];}
function nearWord(word,term){if(word===term)return true;if(word.length<4||term.length<4)return false;return edit(word,term)<=(term.length>=9?2:1);}
const projectRx=/\b(cp[ -]?0[1-5]|r-[a-z][0-9]+|sigred|udep|pmo|gobernanza|prototipo|reservas?|espacios deportivos|deportes|entregables?|hitos?|cronograma|ruta critica|holgura|valor ganado|evm|cpi|spi|eac|presupuesto|costos?|riesgos?|matriz de riesgos|patrocinador|director del proyecto|acta de constitucion|requisitos|semaforo|avance|validacion|despliegue)\b/;
const projectFuzzy=['sigred','gobernanza','cronograma','presupuesto','prototipo','entregable','riesgos','reservas','deportes'];
const externalRx=/\b(presidente|capital de|francia|italia|alemania|mundial|futbol|seleccion peruana|horoscopo|zodiacal|receta|arroz con pollo|bitcoin|criptomonedas|dolar|clima|pronostico del tiempo|noticias|elecciones|einstein|relatividad|pelicula|netflix|cancion|poema|chiste|geografia|matematica|cuanto es|react|python|famoso|famosa|lima metropolitana)\b/;
const greetingRx=/^(?:hola|buenas|buenos dias|buen dia|buenas tardes|buenas noches|hey|ey|saludos|que tal|como estas|como andas|que cuentas|que me cuentas|como va todo|como te va|como va tu dia|que tal tu dia|todo bien|que hay de nuevo|que haces|oye|gracias|muchas gracias|hasta luego|nos vemos|chau|adios|un gusto|mucho gusto|feliz dia|bien y tu|estoy bien|todo tranqui|que onda|que fue|hablame|cuentame algo|me saludas|buenas buenas)(?:\b|$)/;
const conversationalRx=/\b(dia|noche|tarde|causa|bro|amigo|mano|pata|compa|como estas|que tal|que cuentas|que me cuentas|que onda|que fue|todo bien|como te va|saludos|mucho gusto|gracias|saludar|conversemos|charlemos|hablemos)\b/;
const followupRx=/^(?:y (?:que|si|el|la|los|las|cuanto|como|por que)|y eso|explicame mas|amplia|continua|puedes profundizar|por que|que alternativas hay|cual recomiendas|como lo mitigamos|y despues|que implica|dame un ejemplo|resumelo|y sobre eso|mas detalle)\b/;
function projectSignal(s){if(projectRx.test(s))return true;return s.split(' ').some(w=>w.length>=5&&projectFuzzy.some(p=>nearWord(w,p)));}
function socialSignal(s){if(greetingRx.test(s))return true;if(['gracias','hola','buenas','saludos'].some(t=>nearWord(s,t)))return true;const first=s.split(' ');return first.length<=9&&first.some(w=>['hola','buenas','saludos','gracias','cuentas','estas'].some(t=>nearWord(w,t)))&&conversationalRx.test(s);}
export function classifyIntent(question,history=[]){
 const q=canon(question);if(!q)return 'invalid';
 // Una petición externa no se transforma en cortesía por anteponer «hola».
 const external=externalRx.test(q)||/\b\d+\s*[+*x×÷/-]\s*\d+\b/.test(q);
 if(external&&!/\b(sigred|udep|pmo)\b/.test(q)&&!(/\bproyecto\b/.test(q)&&/\b(sigred|reservas deportivas)\b/.test(q)))return 'offtopic';
 if(projectSignal(q))return 'project';
 if(socialSignal(q)){
   // Conversación con una solicitud factual no identificada no puede tratarse como saludo.
   if(/\b(quien|cual|donde|cuando|cuanto|explica|dime|ensename|necesito saber)\b/.test(q)&&q.split(' ').length>13)return 'offtopic';
   return 'social';
 }
 if(followupRx.test(q)&&Array.isArray(history)&&history.some(h=>h.role==='user'&&projectSignal(canon(h.text))))return 'followup';
 return 'offtopic';
}
const welcomes=['¡Hola! Me alegra saludarte. ¿Qué te gustaría conversar o revisar de SIGRED?', '¡Buenas! Encantado de ayudarte. Podemos conversar o revisar un aspecto del proyecto SIGRED.', '¡Hola, causa! ¿Todo bien? Cuéntame en qué te ayudo.'];
const checkins=['¡Gracias por preguntar! Estoy disponible para ayudarte. ¿Cómo te está yendo?', 'Todo listo para conversar contigo. ¿Cómo va tu día?', '¡Qué gusto leerte! Aquí puedo ayudarte con lo que necesites sobre SIGRED. ¿Cómo estás?'];
const tell=['Por aquí, preparado para conversar contigo o analizar SIGRED. ¿Qué tienes en mente?', '¡Te cuento que podemos revisar el estado, los riesgos y las decisiones de SIGRED! ¿Por dónde comenzamos?', 'Estoy listo para ayudarte con un análisis del proyecto. ¿Quieres ver los hitos o prefieres conversar un rato?'];
const thanks=['¡Con gusto! Si necesitas otra consulta sobre SIGRED, aquí estoy.', '¡De nada! Será un gusto continuar ayudándote con SIGRED.', 'A tu disposición. ¿Quieres revisar algún punto más del proyecto?'];
export function socialFallback(question,history=[]){
 const q=canon(question);const n=history.filter(h=>h.role==='user').length;const seed=[...q].reduce((a,c)=>a+c.charCodeAt(0),0);const pick=list=>list[(n+seed)%list.length];
 if(/\b(gracias|agradezco)\b/.test(q))return pick(thanks);
 if(/\b(cuentas|cuentame|nuevo|que haces)\b/.test(q))return pick(tell);
 if(/\b(dia|estas|que tal|como te va|onda|todo bien|que fue)\b/.test(q))return pick(checkins);
 return pick(welcomes);
}
export function outOfScopeReply(){return 'Con gusto puedo atender consultas sobre SIGRED, pero esa pregunta corresponde a un tema externo. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED. Si deseas, revisamos su gobernanza, riesgos, cronograma o presupuesto.';}
