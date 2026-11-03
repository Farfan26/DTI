/** Tres dominios PMO de la rúbrica; preguntas de muestra listas para Gemini. */
export const PMO_DOMAINS=Object.freeze({
 gobernanza:{title:'Gobernanza, inicio y alineación estratégica',topic:'pmo_gobernanza',questions:[
  '¿Cuáles son los objetivos estratégicos, criterios de éxito y el patrocinador principal asignado a SIGRED?',
  '¿Cuáles son las restricciones de alto nivel (alcance, tiempo y costo) y los principales supuestos iniciales de SIGRED?',
  '¿Cuál es el nivel de autoridad asignado al Director de Proyecto para gestionar el presupuesto y los recursos de SIGRED?']},
 ruta:{title:'Cronograma y ruta crítica',topic:'pmo_ruta',questions:[
  '¿Qué actividades de SIGRED presentan retraso y cuáles pertenecen a la ruta crítica, con impacto en la fecha final?',
  '¿Qué hitos contractuales o de fase de SIGRED están en riesgo durante las próximas semanas?',
  '¿Cuál es la holgura disponible en las actividades más críticas de SIGRED antes de comprometer el cronograma general?']},
 evm:{title:'Costos y valor ganado (EVM)',topic:'pmo_evm',questions:[
  '¿Cuánto presupuesto ejecutado AC tiene SIGRED frente al valor planificado PV y al valor ganado EV a la misma fecha de corte?',
  '¿Cuáles son los índices CPI y SPI de SIGRED y su proyección EAC? Explica las fórmulas y calcula solo con datos verificables.',
  '¿Qué paquetes de trabajo de SIGRED presentan mayor variación negativa y cuánto consumen de la reserva de contingencia?']}
});
export function domainFromTopic(topic){return Object.values(PMO_DOMAINS).find(d=>d.topic===topic)||null;}
export function domainFromQuestion(q){const s=String(q||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();if(/\b(evm|cpi|spi|eac|valor ganado|valor planificado|presupuesto ejecutado|reserva de contingencia|paquetes de trabajo|\bac\b.*\bpv\b)/.test(s))return PMO_DOMAINS.evm;if(/ruta critica|holgura|actividades.*retraso|hitos contractuales|hitos.*riesgo/.test(s))return PMO_DOMAINS.ruta;if(/objetivos estrategicos|criterios de exito|patrocinador principal|supuestos iniciales|nivel de autoridad.*director|restricciones de alto nivel/.test(s))return PMO_DOMAINS.gobernanza;return null;}
export function domainFallback(domain){
 if(domain===PMO_DOMAINS.evm)return 'Análisis EVM de SIGRED: el informe ofrece presupuesto y estimaciones, pero no se ha verificado una serie homogénea y fechada de PV (valor planificado), EV (valor ganado) y AC (costo real ejecutado). No puedo afirmar valores actuales de CPI, SPI, EAC, variaciones por paquete ni consumo real de contingencia.\n\nFórmulas: CPI = EV / AC; SPI = EV / PV; CV = EV − AC; SV = EV − PV; EAC = BAC / CPI (supuesto: desempeño de costos futuro igual al actual). Para calcularlos necesito fecha de corte, BAC, línea base temporal y PV, EV y AC del mismo periodo. Las cifras económico-sociales proyectadas no sustituyen AC.';
 if(domain===PMO_DOMAINS.ruta)return 'Cronograma SIGRED: la documentación disponible permite consultar hitos y planificación, pero no confirma para todas las actividades dependencias vigentes, duraciones restantes, actualizaciones de avance y cálculos CPM. No es correcto afirmar qué actividad está hoy en ruta crítica o cuántos días exactos de holgura quedan sin esa red actualizada.\n\nPara determinarlo se necesitan el cronograma base y actualizado, relaciones de precedencia, duraciones y progreso a fecha de corte. La ruta crítica tiene holgura total igual a cero según el modelo CPM; un retraso de un hito debe confirmarse antes de reportarlo como real.';
 return 'Gobernanza SIGRED: puedo analizar los objetivos, alcance y restricciones descritos en el informe, pero no asignaré por inferencia un patrocinador, facultades presupuestales o autoridad de recursos sin un acta de constitución o documento de aprobación que lo indique. Distinguiré roles expresamente documentados de atribuciones que deben validarse.';
}
