/** Conocimiento PMO V14 documentado; el PDF adjunto prevalece sobre las fichas antiguas para estas 9 consultas. */
export const PMO_QA = Object.freeze([
  {
    "id": "G1",
    "domain": "gobernanza",
    "question": "¿Cuáles son los objetivos estratégicos, criterios de éxito y el patrocinador principal asignado a SIGRED?",
    "title": "Gobernanza · Objetivos, criterios de éxito y patrocinador",
    "answer": "Diagnóstico ejecutivo: SIGRED tiene como objetivo diseñar y validar un sistema web que permita consultar espacios deportivos disponibles y gestionar solicitudes de reserva en UDEP Piura. El proyecto académico se limita al diseño y validación del prototipo; no equivale a una implementación en producción.\n\nEvidencia y análisis: El acta establece cinco entregas parciales, informe final y un prototipo validado. Los criterios de éxito contemplan entregas en plazo, desviación de costos no mayor al 10 % y satisfacción/usabilidad de al menos el 80 %. Franklin Olano Medina es el director del proyecto. El Área de Deportes es beneficiaria y el Lic. Víctor Zapata Figallo aparece como interesado clave. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED: designación formal de un patrocinador principal.\n\nAlternativas y trade-offs: A) Formalizar patrocinador y atribuciones: aclara decisiones, exige validación formal. B) Continuar con supervisión académica: mantiene avance documental pero no confiere autoridad institucional.\n\nRecomendación PMO: Solicitar nombramiento documentado del patrocinador y matriz de escalamiento.\n\nDato pendiente / próxima verificación: Acta u oficio de patrocinio firmado.\n\nFuentes: Informe Ejecutivo PMO, pág. 3; Acta de constitución y plan de alcance.",
    "page": 3,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "G2",
    "domain": "gobernanza",
    "question": "¿Cuáles son las restricciones de alto nivel (alcance, tiempo y costo) y los principales supuestos iniciales de SIGRED?",
    "title": "Gobernanza · Restricciones, alcance, tiempo, costo y supuestos",
    "answer": "Diagnóstico ejecutivo: La restricción principal es entregar una propuesta de diseño y validación, no un sistema institucional productivo, durante el periodo académico del 29/08/2026 al 14/11/2026.\n\nEvidencia y análisis: Alcance incluido: análisis, diseño, prototipo y validación. Fuera de alcance: despliegue institucional, migración histórica, integraciones UDEP y soporte operativo. El acta estima S/ 26 553,50 de costo más margen del 10 % (S/ 2 655,35), total S/ 29 208,85. Son estimaciones del acta y no el costo real ejecutado. Supuestos de planificación: participación del equipo y usuarios, disponibilidad para encuestas y acceso a internet/dispositivos. Limitaciones: información interna, tiempo y tamaño muestral.\n\nAlternativas y trade-offs: A) Mantener alcance de prototipo para cumplir tiempo/costo. B) Solicitar ampliación de alcance para producción, condicionada a presupuesto, tecnología y autorización.\n\nRecomendación PMO: Mantener líneas base diferenciadas para proyecto académico y eventual implementación.\n\nDato pendiente / próxima verificación: Validación de supuestos y aprobaciones de cambio.\n\nFuentes: Informe Ejecutivo PMO, págs. 3 y 5; Acta de constitución.",
    "page": 3,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "G3",
    "domain": "gobernanza",
    "question": "¿Cuál es el nivel de autoridad asignado al Director de Proyecto para gestionar el presupuesto y los recursos de SIGRED?",
    "title": "Gobernanza · Autoridad del director del proyecto",
    "answer": "Diagnóstico ejecutivo: Franklin Olano Medina tiene funciones de dirección, coordinación, asignación de tareas y control del alcance, cronograma, recursos y presupuesto dentro del proyecto académico. No consta una facultad monetaria individual ilimitada.\n\nEvidencia y análisis: La documentación prevé que el reporte de gastos sea aprobado por el director y un experto encargado. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED: límite individual de gasto, facultad unilateral de usar reservas o potestad de modificar la línea base.\n\nAlternativas y trade-offs: A) Reasignar tareas sin costo adicional dentro del plan: agilidad con seguimiento. B) Solicitar autorización de cambios de presupuesto o fecha: mayor control, puede requerir más tiempo.\n\nRecomendación PMO: Aprobar una matriz RACI y una matriz de delegación con umbrales de gasto, uso de reservas y escalamiento; la matriz sugerida en el informe es propuesta, no autorización vigente.\n\nDato pendiente / próxima verificación: Acta de delegación y órgano competente de aprobación.\n\nFuentes: Informe Ejecutivo PMO, pág. 3; Acta y plan de recursos.",
    "page": 3,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "C1",
    "domain": "ruta",
    "question": "¿Qué actividades de SIGRED presentan retraso y cuáles pertenecen a la ruta crítica, con impacto en la fecha final?",
    "title": "Cronograma · Actividades retrasadas y ruta crítica",
    "answer": "Diagnóstico ejecutivo: Existen duraciones y dependencias planificadas, pero no un registro completo y actualizado de inicio/fin real por actividad a fecha 03/11/2026. No puede afirmarse que una actividad específica esté retrasada ni que el retraso afecte la ruta crítica vigente.\n\nEvidencia y análisis: Los talleres de secuenciación y cronograma describen el método CPM y actividades de trabajo; la identificación de retrasos reales exige comparar fechas planificadas y reales junto con duraciones restantes y precedencias actualizadas. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED: relación fechada de actividades efectivamente atrasadas.\n\nEscenario ilustrativo, no hecho registrado: Si la validación del prototipo tuviera holgura cero y se retrasara 2 días, trasladaría 2 días a la finalización sin recuperación.\n\nAlternativas y trade-offs: A) Reasignar recursos a tareas críticas: posible incremento de costo. B) Reordenar actividades no dependientes: posible riesgo de calidad.\n\nRecomendación PMO: Actualizar Gantt y red CPM con avances reales antes de declarar retrasos.\n\nDato pendiente / próxima verificación: Línea base vigente, fechas reales, % avance y duraciones restantes.\n\nFuentes: Informe Ejecutivo PMO, pág. 3; secuenciación y cronograma.",
    "page": 3,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "C2",
    "domain": "ruta",
    "question": "¿Qué hitos contractuales o de fase de SIGRED están en riesgo durante las próximas semanas?",
    "title": "Cronograma · Hitos en riesgo",
    "answer": "Diagnóstico ejecutivo: El hito académico final documentado es el 14/11/2026; requiere seguimiento de informe, evidencias de validación y revisión final. Su cercanía temporal eleva la prioridad de control, pero no demuestra incumplimiento.\n\nEvidencia y análisis: El riesgo R-G2 describe desvíos de más del 10 % o dos hitos consecutivos con atraso como disparadores y asigna seguimiento a Franklin Olano Medina. No se acredita que esos disparadores ya se hayan materializado.\n\nAlternativas y trade-offs: A) Hacer revisiones preventivas del informe y pruebas, con costo de coordinación. B) Esperar la entrega única, con menor carga intermedia pero mayor riesgo de correcciones tardías.\n\nRecomendación PMO: Proponer puntos de control el 06, 10 y 13/11/2026 para confirmar responsables, evidencia y correcciones. Estas fechas son propuestas de control y no hitos contractuales aprobados.\n\nDato pendiente / próxima verificación: Entregables y actas de aprobación intermedia.\n\nFuentes: Informe Ejecutivo PMO, pág. 4; Acta y registro de riesgos.",
    "page": 4,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "C3",
    "domain": "ruta",
    "question": "¿Cuál es la holgura disponible en las actividades más críticas de SIGRED antes de comprometer el cronograma general?",
    "title": "Cronograma · Holguras",
    "answer": "Diagnóstico ejecutivo: En CPM, una actividad crítica tiene holgura total igual a cero. La holgura actual de actividades específicas de SIGRED no puede certificarse sin el cronograma actualizado y una red validada.\n\nEvidencia y análisis: Holgura total = inicio tardío − inicio temprano (LS−ES), equivalente a fin tardío − fin temprano (LF−EF). Los documentos incluyen método CPM y precedencias, pero no un cálculo actualizado y validado de holguras con avance real al 03/11/2026.\n\nEscenarios ilustrativos: 0 días = actividad crítica; 1–2 días = casi crítica; 3 o más días = margen de planificación. Estas bandas NO son holguras medidas de SIGRED.\n\nAlternativas y trade-offs: A) Priorizar tareas con holgura cero reduce riesgo de plazo a costa de flexibilidad. B) Usar holgura de tareas no críticas optimiza recursos pero exige seguimiento.\n\nRecomendación PMO: Recalcular ES, EF, LS y LF y ordenar actividades por holgura total.\n\nDato pendiente / próxima verificación: Calendario, dependencias, duraciones pendientes y avances reales.\n\nFuentes: Informe Ejecutivo PMO, pág. 4; talleres de cronograma.",
    "page": 4,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "E1",
    "domain": "evm",
    "question": "¿Cuánto presupuesto ejecutado AC tiene SIGRED frente al valor planificado PV y al valor ganado EV a la misma fecha de corte?",
    "title": "EVM · AC, PV y EV",
    "answer": "Diagnóstico ejecutivo: En el ejercicio de valor ganado con corte del 27/09/2026 (semana 5), AC = S/ 20 689,35; PV = S/ 9 238,28 y EV = S/ 17 585,95. Estos valores NO son el estado financiero de noviembre.\n\nEvidencia y análisis: CV = EV−AC = −S/ 3 103,40, señal de costo superior al valor ganado. SV = EV−PV = +S/ 8 347,67, señal de valor ganado superior al plan para ese corte. BAC del ejercicio = S/ 24 727,79, distinto de la estimación inicial del acta de S/ 29 208,85.\n\nAlternativas y trade-offs: A) Mantener proyecciones con corte de septiembre: trazabilidad histórica pero poca actualidad. B) Actualizar valores de noviembre por EDT: mejor control, requiere registros comprobables.\n\nRecomendación PMO: Solicitar nuevo corte homogéneo de PV, EV y AC y reconciliar la línea base.\n\nDato pendiente / próxima verificación: Costo real/valor ganado actuales por paquete.\n\nFuentes: Informe Ejecutivo PMO, pág. 4; taller de Análisis de Valor Ganado, corte 27/09/2026.",
    "page": 4,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "E2",
    "domain": "evm",
    "question": "¿Cuáles son los índices CPI y SPI de SIGRED y su proyección EAC? Explica las fórmulas y calcula solo con datos verificables.",
    "title": "EVM · CPI, SPI y EAC",
    "answer": "Diagnóstico ejecutivo: Para el ejercicio con corte del 27/09/2026, CPI = EV/AC ≈ 0,8500 (costo desfavorable) y SPI = EV/PV ≈ 1,9036 (valor ganado adelantado respecto al plan del ejercicio). No deben presentarse como índices actuales de noviembre.\n\nEvidencia y análisis: EV=S/ 17 585,95, AC=S/ 20 689,35, PV=S/ 9 238,28 y BAC=S/ 24 727,79. Usando EAC = AC + (BAC−EV)/(CPI×SPI), el informe consolidado calcula aproximadamente S/ 25 103,19. El taller contiene una cifra narrativa S/ 25 103,07 y una tabla S/ 25 103,191: existe diferencia menor que debe reconciliarse. Un método alternativo, BAC/CPI, arroja aproximadamente S/ 29 091,51 y supone que la ineficiencia de costo continúa. No se debe combinar pronósticos de métodos distintos sin declarar hipótesis.\n\nAlternativas y trade-offs: EAC combinado incorpora costo y cronograma; BAC/CPI es más conservador ante ineficiencia de costos.\n\nRecomendación PMO: Elegir el método, documentar supuestos y recalcular con el corte más reciente.\n\nDato pendiente / próxima verificación: PV, EV, AC y BAC reconciliados en noviembre.\n\nFuentes: Informe Ejecutivo PMO, pág. 5; taller EVM, corte 27/09/2026.",
    "page": 5,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  },
  {
    "id": "E3",
    "domain": "evm",
    "question": "¿Qué paquetes de trabajo de SIGRED presentan mayor variación negativa y cuánto consumen de la reserva de contingencia?",
    "title": "EVM · Paquetes con variación negativa y reserva",
    "answer": "Diagnóstico ejecutivo: La variación negativa agregada del ejercicio EVM del 27/09/2026 es CV = −S/ 3 103,40. No se puede identificar qué paquete EDT concentra ese sobrecosto ni afirmar consumo real de contingencia con las fuentes disponibles.\n\nEvidencia y análisis: El acta prevé margen/reserva estimada del 10 % = S/ 2 655,35, pero no acredita liberaciones ni desembolsos. Esa información no se encuentra registrada o confirmada en la documentación oficial del proyecto SIGRED: AC y EV por cada paquete EDT y autorización de uso de contingencia. La variación CV no equivale automáticamente a consumo de la reserva.\n\nAlternativas y trade-offs: A) Priorizar revisión de prototipo, validación y documentación como candidatos preventivos, sin declararlos sobrecostos. B) Auditar todos los paquetes 1.1–7.2 por CV y compromisos, con mayor trabajo de control pero mejor trazabilidad.\n\nRecomendación PMO: Construir matriz EDT con BAC, AC, EV, CV, reserva autorizada y responsable; clasificar por CV y verificar comprobantes de gasto.\n\nDato pendiente / próxima verificación: Libro de costos por paquete y actas de liberación de reservas.\n\nFuentes: Informe Ejecutivo PMO, pág. 5; presupuesto y taller EVM.",
    "page": 5,
    "source": "SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf"
  }
]);
export function normalizePMO(s=''){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
const STOP=new Set('cuales cual son es el la los las de del y a en para por que como cuanto cuanta tiene se un una con al sobre actual actualmente sigred proyecto actividades datos frente asignado principales principal cuales entre mismos misma fecha corte'.split(' '));
function keyTokens(s){return new Set(normalizePMO(s).split(' ').filter(t=>t.length>2&&!STOP.has(t)));}
export function findPMOQuestion(question,topic=''){
 const normalized=normalizePMO(question);const exact=PMO_QA.find(q=>normalizePMO(q.question)===normalized);if(exact)return exact;
 const tokens=keyTokens(question);let best=null;let score=0;
 for(const q of PMO_QA){if(topic && ['pmo_gobernanza','pmo_ruta','pmo_evm'].includes(topic) && q.domain!==topic.substring(4))continue;
   const qt=keyTokens(q.question);const overlap=[...tokens].filter(x=>qt.has(x)).length;const similarity=overlap/Math.max(1,Math.min(tokens.size,qt.size));
   if(overlap>=2 && similarity>score){best=q;score=similarity;}
 }
 return score>=0.52?best:null;
}
export function pmoSourceLinks(q){return [{name:`Informe Ejecutivo PMO · pág. ${q.page} · ${q.id}`,path:`documentos/SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf#page=${q.page}`},{name:'Informe Consolidado SIGRED · 88 páginas',path:'documentos/SIGRED_Consolidado_PMO_9_Consultas_2026.pdf'}];}
