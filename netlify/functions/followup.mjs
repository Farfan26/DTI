/**
 * Contextualización limitada de consultas de seguimiento de SIGRED.
 * La conversación orienta la búsqueda, pero nunca sustituye evidencia documental.
 * No almacena ni envía API Keys y no consulta servicios externos.
 */
function norm(text='') {
 return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/^[¿¡?\s]+/,'').trim();
}
const IS_FOLLOWUP = /^(?:y\s+|pero\s+|de\s+las?\s+(?:dos\s+)?alternativas?\b|entre\s+(?:esas?|las?)\b|cual(?:es)?\s+(?:de\s+ellas?|recomendarias|conviene|elegirias|seria\s+mejor)\b|que\s+(?:recomendarias|opinas|har[ií]as)\b|por\s+que\b|en\s+(?:ese|este|tal)\s+caso\b|respecto\s+a\s+(?:ello|eso)\b|explica(?:me)?\s+(?:mejor|eso|la\s+alternativa)\b|amplia\s+(?:eso|lo\s+anterior)\b|y\s+si\b|entonces\b)/;
const HAS_PMO_ANCHOR = /\bsigred\b|\bpmo\b|fast[\s-]?tracking|crashing|cronograma|hitos?|retraso|ruta\s+critica|riesgos?|r-g2|r-t3|solicitud\s+de\s+cambio|presupuesto|contingencia|cc[bs]|valor\s+ganado|entre(?:gables|ga)/;
const ARE_SCHEDULE_ALTERNATIVES = /fast[\s-]?tracking|crashing|cronograma|retraso|ruta\s+critica|acelerar\s+el\s+plazo/;
const IS_RISK = /riesgos?|r-g2|r-t3|mitiga|escalac/;
const IS_CHANGE = /solicitud\s+de\s+cambio|cambio\s+de\s+alcance|cc[bs]/;
const IS_COST = /presupuesto|contingencia|costos?|cpi|spi|evm/;

/** Devuelve null si no hay conversación pertinente o la pregunta es autónoma. */
export function resolveFollowup(question, history=[], topic='') {
 const q=norm(question);
 if(q.length>210 || !IS_FOLLOWUP.test(q) || !Array.isArray(history)) return null;
 // En el historial recibido por API vienen los mensajes previos, nunca se deben
 // aceptar instrucciones sobre las reglas del asistente como contexto de autoridad.
 const previous=history.slice(-8).filter(x=>x&&x.role==='user'&&typeof x.text==='string');
 const anchor=[...previous].reverse().find(x=>HAS_PMO_ANCHOR.test(norm(x.text)));
 if(!anchor) return null;
 const focus=norm(anchor.text);
 let domain='proyecto';
 if(ARE_SCHEDULE_ALTERNATIVES.test(focus)||topic==='cronograma') domain='cronograma';
 else if(IS_RISK.test(focus)||topic==='riesgos') domain='riesgos';
 else if(IS_CHANGE.test(focus)||topic==='asesoria') domain='cambio';
 else if(IS_COST.test(focus)||topic==='presupuesto') domain='presupuesto';
 const queries={
  cronograma:'SIGRED cronograma hitos dependencias riesgos tiempos recursos costo retraso proyecto',
  riesgos:'SIGRED matriz de riesgos probabilidad impacto responsables mitigación escalación',
  cambio:'SIGRED alcance requisitos objetivos solicitud de cambio aprobación costos cronograma',
  presupuesto:'SIGRED presupuesto original reserva contingencia evaluación económica costos',
  proyecto:'SIGRED avance estado entregables objetivos riesgos cronograma'
 };
 const anchorText=anchor.text.slice(0,300);
 return {
  domain,anchor:anchorText,
  retrievalQuery:queries[domain]+' '+anchorText,
  isScheduleAdvice:domain==='cronograma' && /alternativ|recomend|convien|elegir|mejor|cual|caso/.test(q),
 };
}

/** Explicación condicional documental segura cuando Google no responde. */
export function scheduleFallbackAdvice() {
 return '**Análisis condicionado del escenario hipotético:** No hay datos confirmados de ruta crítica, dependencias, holguras ni costos adicionales que permitan elegir definitivamente una técnica para SIGRED.\n\n**Fast-Tracking:** se consideraría si ciertas actividades pudieran ejecutarse en paralelo sin comprometer dependencias ni calidad; aumenta el riesgo de retrabajo.\n\n**Crashing:** se consideraría si agregar recursos a actividades críticas permitiera acortar el plazo, después de estimar el costo incremental y verificar disponibilidad.\n\n**Recomendación de la PMO:** validar la ruta crítica, las dependencias, el retraso real, recursos y costo de cada alternativa; después comparar impacto en plazo, costo y riesgos. Ninguna alternativa está aprobada por este análisis.\n\n**Fuentes para contrastar:** EDT y cronograma, matriz de riesgos y presupuesto de SIGRED. Estos criterios de comparación son una propuesta metodológica, no un resultado medido del proyecto.';
}
