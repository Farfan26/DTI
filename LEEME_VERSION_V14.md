# PMO-Bot SIGRED V14 — Informe PMO integrado

## Qué contiene
- `sitio/documentos/SIGRED_Consolidado_PMO_9_Consultas_2026.pdf`: informe completo de 88 páginas.
- `sitio/documentos/SIGRED_Informe_Ejecutivo_PMO_9_Consultas.pdf`: nueve consultas detalladas y conciliación de presupuestos.
- `sitio/assets/pmo-answers.mjs`: nueve respuestas con citas a páginas, disponibles incluso sin Gemini.
- `netlify/functions/chat.mjs`: integración de evidencia prioritaria para Gemini, manteniendo el mismo endpoint y credenciales.
- `pruebas/pmo-v14.test.mjs`: pruebas de las nueve consultas y la integridad técnica.

## Publicar sin romper Gemini
1. Copia el contenido de `DTI` al repositorio (sin renombrar `netlify.toml`).
2. Publica en Netlify con la configuración existente.
3. Mantén `GEMINI_API_KEY`, `ENABLE_PUBLIC_AI=true`, `GEMINI_MODEL` si lo utilizas; no publiques la clave en frontend.
4. Prueba las 9 preguntas desde Gobernanza, Ruta crítica y EVM. En modo AI/Auto, el bot usa Gemini y cita su evidencia. Si no hay servicio Gemini, muestra la respuesta local.
5. Las cifras EVM son de **27/09/2026**, no valores actuales de noviembre; el hito final **14/11/2026** es programado.

## Delimitación y rigor
- El patrocinador principal y la autoridad monetaria unilateral no están acreditados en la documentación disponible.
- Retrasos reales y holguras actualizadas deben verificarse; escenarios ilustrativos están claramente etiquetados.
- No mezclar el BAC S/24 727,79 del taller EVM con el estimado S/29 208,85 del acta o los S/14 881,23 de una eventual implementación.
