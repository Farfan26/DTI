/** V18: clasificación de intención anterior al RAG. Mismo código en navegador y función Netlify. */
export const normalizeIntent = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[¿?¡!.,;:]+/g,' ').replace(/\s+/g,' ').trim();
const project = /\b(cp[ -]?0[1-5]|r-[a-z][0-9]+|evaluacion oficial|estado general|estado del proyecto|revela la clave de gemini|gemini|sigred|udep|pmo|proyecto|prototipo|reserva(?:s)?|espacios deportivos|deportes|entregable(?:s)?|hitos?|cronograma|ruta critica|holgura|valor ganado|evm|cpi|spi|eac|presupuesto|costo(?:s)?|riesgo(?:s)?|matriz de riesgos|patrocinador|gobernanza|director del proyecto|acta de constitucion|alcance|requisitos|informe(?:s)?|documentaci[oó]n|sem[aá]foro|avance|validaci[oó]n|despliegue|recursos del proyecto)\b/;
const casual=/^(?:hola(?: (?:causa|amigo|bro|buenas|que tal|como estas))?|holi|hey|ey|ola|buenas(?: tardes| noches)?|buenos dias|que tal(?: causa| amigo)?|que cuentas(?: causa| bro)?|como estas(?: causa| amigo)?|como te va|como estuvo tu dia|que tal tu dia(?: hoy)?|como va tu dia|todo bien|que hay de nuevo|que haces|que me cuentas|como andas|saludos|muchas gracias|gracias(?: causa| amigo)?|oye causa|buen dia|buenas buenas|holaa+)(?: por aqui| hoy)?$/;
const social=/\b(que tal tu dia|que me cuentas|como estas|que tal causa|que cuentas|como te va|como va tu dia|como andas|todo bien|saludos|muchas gracias)\b/;
const external=/\b(presidente(?: actual)? (?:del|de) peru|presidente del pais|capital de (?:francia|italia|alemania|españa)|mundial(?: de futbol)?|seleccion peruana|horoscopo|signo zodiacal|receta(?: para| de)?|arroz con pollo|bitcoin|criptomonedas|precio del dolar|tipo de cambio|clima (?:de|en|hoy)|pronostico del tiempo|noticias (?:de|del|de hoy)|elecciones|quien gano|teoria de la relatividad|einstein|pelicula(?:s)?|netflix|musica|cancion(?:es)?|poema(?:s)?|chiste(?:s)?|historia universal|geografia|matematica|cuanto es \d+|\d+\s*[+*x×÷/-]\s*\d+|programa (?:en|con) react|codigo (?:de|para) python)\b/;
export function classifyIntent(question,history=[]){
 const q=normalizeIntent(question);
 if(!q)return 'invalid';
 if(project.test(q))return 'project';
 if(casual.test(q)|| (q.length<75&&social.test(q)))return 'social';
 if(external.test(q))return 'offtopic';
 // Solo preguntas elípticas pueden heredar el tema SIGRED, no preguntas completas nuevas.
 const elliptical=/^(y (?:que|si|el|la|los|las|cuanto|como|por que)|y eso|explicame mas|amplia|continua|puedes profundizar|por que|que alternativas hay|cual recomiendas|como lo mitigamos|y despues|que implica|dame un ejemplo|resumelo)\b/;
 if(elliptical.test(q)&&Array.isArray(history)&&history.some(h=>h.role==='user'&&project.test(normalizeIntent(h.text))))return 'followup';
 // Preguntas no reconocidas no deben producir coincidencias RAG fortuitas.
 return 'offtopic';
}
export function socialFallback(question,history=[]){
 const q=normalizeIntent(question),n=history.filter(h=>h.role==='user').length;
 if(/gracias/.test(q))return ['Con mucho gusto. Cuando desees, podemos revisar riesgos, avances o decisiones de SIGRED.','A tu disposición. Si quieres, analizamos cualquier aspecto de SIGRED con la evidencia disponible.'][n%2];
 if(/dia|como estas|que tal|como te va|todo bien/.test(q))return ['¡Todo bien por aquí, gracias por preguntar! ¿Cómo te va? Si quieres, también podemos revisar SIGRED.','¡Gracias por preguntar! Estoy listo para ayudarte. ¿Cómo va todo por tu lado?','¡Bien, gracias! Podemos conversar un momento o revisar las novedades del proyecto SIGRED.'][n%3];
 if(/cuentas|nuevo|que haces/.test(q))return ['Por aquí, listo para conversar y ayudarte con SIGRED. ¿Qué te gustaría revisar hoy?','¡Aquí, atento a tus preguntas! Si te interesa, podemos analizar los riesgos o el cronograma de SIGRED.','Puedo contarte cómo va el análisis documental de SIGRED. ¿Empezamos por estado, riesgos o presupuesto?'][n%3];
 return ['¡Hola! Qué gusto saludarte. ¿Cómo estás? Si necesitas revisar algo de SIGRED, aquí estoy.','¡Buenas! ¿Qué tal todo? Puedo ayudarte con preguntas sobre el proyecto cuando quieras.','¡Hola, causa! ¿Todo bien? Dime qué necesitas y lo revisamos.'][n%3];
}
export function outOfScopeReply(){return 'Con gusto te ayudaría, pero mi función está centrada en SIGRED. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED. Si quieres, puedo revisar su gobernanza, riesgos, cronograma o presupuesto.';}
