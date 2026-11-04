# SIGRED PMO-Bot V20 — Gobernanza, evidencia y evaluación

## Mejoras principales
- Se conserva el endpoint privado `/api/chat`, Netlify Functions y las variables originales `GEMINI_API_KEY`, `GEMINI_MODEL`, `ENABLE_PUBLIC_AI`, `MAX_OUTPUT_TOKENS`. La clave nunca debe estar en el navegador ni en Git.
- Gemini redacta análisis del proyecto cuando el modo IA está activo y existe evidencia recuperable. La temperatura se ajusta a 0,23 para conservar razonamiento natural sin sacrificar precisión factual.
- El clasificador reconoce saludos y expresiones informales, pero responde con cortesía profesional; los temas ajenos a SIGRED se declinan y la documentación sigue siendo el límite factual.
- Seguridad de preguntas trampa: controles deterministas de credenciales, inyección de prompts, fabricación de datos, falsa producción, patrocinios, EVM actual, retrasos y mezcla de presupuestos. Añadidas variaciones de recomendaciones de control sin aceptar instrucciones maliciosas.

## 7. Política de evidencia y límites

| Código | Significado | Regla |
|---|---|---|
| D | Documentado | Cita la fuente y fecha de corte, y no afirma mayor vigencia que esa fuente. |
| C | Cálculo reproducible | Presenta fórmula, entradas verificables homogéneas y fecha de corte. |
| P | Propuesta | Recomienda una acción sin darla por aprobada o realizada. |
| S | Simulación académica | Identifica explícitamente supuestos y resultados hipotéticos. |
| ND | No disponible | Declara qué evidencia falta para emitir una conclusión. |

**Importante:** La etiqueta de evidencia es un control automático conservador y no sustituye una auditoría humana; si una respuesta mezcla clases, revise las afirmaciones individuales. Nunca asignar semáforo oficial, gasto real, variación presupuestaria efectiva ni aprobación de hitos sin actas o registros institucionales actuales. El estado a 21/10/2026 no debe presentarse como estado del 03/11/2026.

## 8. Ejecución y evaluación de los prompts

- Las respuestas locales preconfiguradas no son respuestas generadas por Gemini. La API expone `responseOrigin` y `evidenceLabel`; la interfaz distingue el origen de las respuestas remotas.
- Para CP-01 a CP-05: abrir el bot publicado, enviar cada pregunta por separado, comprobar la respuesta, registrar fuente y corte y tomar **una captura auténtica** donde se vean pregunta, respuesta y evidencia. Guardar los archivos en `evidencias/capturas/`. El registro está en `evidencias/registro_pruebas_CP.csv`.
- Tomar también captura **real** de la configuración visible del System Prompt de la herramienta empleada (no inventarla ni simularla). Si Voiceflow sin API no responde libremente, anotarlo como limitación; la versión programada solo se presenta como demostración complementaria.
- Si Gemini no responde o la cuota se agota, mostrar explícitamente el origen local. No afirmar que una prueba con Google fue real si se usó una respuesta simulada.

## Banco masivo V20

- `pruebas/banco_v20_1500_casos.json`: 1500 preguntas únicas, 375 saludos/conversaciones, 375 consultas SIGRED, 375 externas y 375 adversariales.
- `pruebas/banco-v20-1400.test.mjs`: ejecuta **cada pregunta contra el handler de `/api/chat` en modo local**, verifica respuesta no vacía, clasificación de evidencia, separación de origen, restricciones temáticas, seguridad y variedad de controles.
- `npm test`: suite completa previa y V20; `npm run test:masivo`: batería nueva.
- Las 1500 consultas **no son 1500 llamadas a Gemini** ni implican 1500 respuestas semánticamente diferentes. El modelo Gemini debe probarse con su API real en Netlify.

## Instalación
1. Descomprima el ZIP y publique el contenido de `DTI` como raíz del sitio (conservar `netlify.toml`).
2. Confirme variables de entorno y despliegue de Netlify Functions.
3. Recargue la página sin caché y utilice `Probar conexión Gemini`.
4. Pruebe CP-01 a CP-05 y las nueve consultas PMO; guarde las capturas reales.

## Fuentes de consulta integradas
`01_Project_Charter.pdf`, `02_WBS_y_Cronograma.pdf`, `03_Matriz_de_Riesgos.pdf`, `04_Informe_de_Estado.pdf`, informe ejecutivo PMO y consolidado de 88 páginas. El asistente diferencia fechas históricas de registros vigentes.
