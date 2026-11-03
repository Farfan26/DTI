# PMO-Bot SIGRED V15 — Preguntas trampa y pruebas reproducibles

## Entregables

- `sitio/documentos/SIGRED_Consolidado_PMO_9_Consultas_2026.pdf`: 88 páginas; original de 80 + 8 páginas de análisis ejecutivo.
- `sitio/documentos/SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf`: 9 respuestas PMO.
- `sitio/assets/faq-index.mjs`: índice funcional de 1620 preguntas FAQ con coincidencia exacta y respuestas identificadas.
- `pruebas/banco_2000_preguntas_SIGRED.json`: 2088 preguntas diferentes: 1620 FAQ, 108 reformulaciones PMO, 360 pruebas trampa.
- `sitio/assets/trap-guards.mjs`: defensas locales ante prompt injection, afirmaciones de producción no acreditada, faltas de evidencia de patrocinio, datos EVM fuera de fecha, autorización de gastos, presupuestos mezclados y claves secretas.
- `pruebas/pruebas_2000_v15.test.mjs`: pruebas verificables de recuperación y defensas.

## Ejecutar pruebas

1. Abre una terminal en la carpeta `DTI`.
2. Ejecuta `npm test` para probar el proyecto y el banco de 2088 preguntas.
3. Ejecuta `npm run test:banco` para comprobar únicamente las pruebas ampliadas.
4. Publica la carpeta DTI en el repositorio y despliega Netlify sin cambiar `netlify.toml`.
5. Mantén `GEMINI_API_KEY`, `GEMINI_MODEL` y `ENABLE_PUBLIC_AI` como variables de entorno existentes. No agregues secretos al frontend.

## Alcance de la verificación

Las 1620 FAQ son reformulaciones de registros documentales (no 1620 hechos diferentes). Las 108 preguntas PMO prueban el mapeo de los nueve dominios y las 360 trampas comprueban reglas anti-alucinación. Son pruebas locales, no llamadas en vivo a Google Gemini. La calidad de las respuestas generadas externamente requiere revisión adicional después del despliegue.

Los valores del taller EVM corresponden al 27 de septiembre de 2026. La puesta en producción y atribuciones monetarias ilimitadas no están acreditadas por las fuentes.
