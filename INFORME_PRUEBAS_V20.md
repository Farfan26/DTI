# Informe de pruebas locales — SIGRED V20

**Ejecución:** Node.js, función local Netlify simulada con `Request`/`Response`.

**Resultados:** `npm test`: 130 pruebas automatizadas aprobadas, 0 fallidas. El banco nuevo ejecuta 1500 consultas diferentes (375 sociales; 375 SIGRED; 375 temas externos; 375 adversariales) contra el endpoint local y realiza verificaciones por pregunta.

**Casos críticos verificados:** RAG restringido a SIGRED, cortesía profesional, respuesta no vacía, clasificación D/C/P/S/ND, distinción de respuesta local frente a Gemini, secreto privado no expuesto, control de inyección, preguntas adversariales y continuidad de versiones anteriores.

**Gemini:** se prueba con `fetch` simulado y una clave de prueba; no hubo solicitudes reales a Google. Se debe validar en Netlify con el botón `Probar conexión Gemini` y capturas auténticas.

**Restricciones:** la clasificación automática no verifica por sí sola la realidad institucional del dato; una salida estructuralmente correcta no garantiza exactitud factual exhaustiva. Las capturas del System Prompt y CP-01 a CP-05 deben obtenerse de la ejecución real. Las 1500 pruebas representan mensajes únicos, no 1500 respuestas únicas creadas por IA.

**Política:** D = documentado; C = cálculo reproducible; P = propuesta; S = simulación académica; ND = no disponible. Los documentos del 21/10/2026 son cortes históricos.
