# Validación técnica, capturas y exposición DTI

## Pruebas implementadas
- `npm test`: pruebas de base documental, 1 280 formulaciones, visuales, rutas del API, conexión simulada a Gemini, seguridad del código de imagen desactivado y respaldo.
- `pruebas/v8-netlify.test.mjs`: inspección de 105 páginas/285 fragmentos, página 25, rechazo al Mundial 2022, presupuesto, 429 de Gemini y cabecera privada.
- Se verificó visualmente la distribución responsive y acciones interactivas con Chromium en una vista inyectada de los archivos locales; **no es una comprobación del deploy real de Netlify ni de una conexión auténtica a Gemini**.

## 12 preguntas útiles para una demostración
1. ¿Cuál es el presupuesto original del Project Charter y cómo se compone?
2. ¿En qué se diferencia del presupuesto para transición a producción?
3. ¿Cuál es la principal alerta de cronograma y quién responde por R-G2?
4. ¿Qué documentos sostienen la evaluación económico-social?
5. ¿Cuáles son las fechas planificadas de los hitos del cronograma?
6. ¿Qué dice la página 25 de la Documentación Maestra SIGRED?
7. ¿Qué criterios de seguridad propone el documento maestro para la base de datos?
8. Evalúa hipotéticamente retrasar cinco días una actividad, distinguiendo Fast-Tracking de Crashing.
9. Simula una solicitud de cambio con impacto en alcance, costo, tiempo y riesgo.
10. Muéstrame imágenes de la documentación de SIGRED.
11. ¿Cuál es el CPI actual de SIGRED? (abstención por falta de EV y AC).
12. ¿Quién ganó el Mundial de fútbol 2022? (fuera del ámbito SIGRED).

## Guion de demostración (5 minutos)
1. Abre el dominio público. Enseña logo SIGRED y escudo UDEP. Despliega «DTI · Grupo 09», nombra a la docente y a los cinco integrantes.
2. Enseña las ocho tarjetas y haz clic en «Biblioteca · 105 páginas», abre el PDF y explica el índice por página.
3. Haz clic en «Riesgos y alertas», explica el tratamiento documental y por qué no inventa planes de mitigación.
4. Abre otro chat y pregunta por un escenario de costos. Muestra la separación de conversaciones.
5. Cambia a «Gemini prioritario» y formula una pregunta compleja. Valida la etiqueta de IA y la cita; si la cuota está agotada, explica el fallback con transparencia.
6. Muestra un gráfico y ejecuta una pregunta trampa fuera de SIGRED.

## Qué no declarar
- No afirmar que la Universidad de Piura aprobó un despliegue en producción sin una autorización real.
- No equiparar 66,67% por cantidad de entregables a avance físico o EVM.
- No llamar «prueba real de Gemini» a la respuesta simulada usada en tests.
- No atribuir a la docencia una calificación asegurada (20/20 depende de su evaluación).
- El objetivo No-Code de la asignatura corresponde a Voiceflow: **este paquete con código se presenta como implementación complementaria**, no como un sustituto no-code.
