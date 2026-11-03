# Matriz de trazabilidad — Rúbrica SOBRESALIENTE / 20 puntos

**Objetivo:** satisfacer los indicadores del nivel sobresaliente. Esta matriz no garantiza la calificación, que asigna la docente.

| Criterio | Evidencia técnica en el ZIP | Evidencia de demostración | Criterio verificable |
|---|---|---|---|
| Ingeniería System Prompt (5) | `prompts/SYSTEM_PROMPT_PMO_SOBRESALIENTE_V12.md` y `netlify/functions/chat.mjs`: rol Senior PMO, Zero-Shot, One-Shot, Few-Shot, delimitadores, formato ejecutivo, trade-offs | Ejecutar un dilema de presupuesto y verificar diagnóstico, alternativas y acción concreta | No saludos en consultas sustantivas; no recomendaciones no condicionadas |
| Anclaje factual RAG (5) | `sitio/documentos/SIGRED_Informe_Final_Consolidado_2026.pdf`, `sitio/data/master_index.json`, `sitio/data/knowledge.json`; índice de extractos citables y respuesta conservadora | Solicitar CPI sin AC/EV: debe negar cálculo y pedir ambos; mostrar enlace a PDF cuando hay evidencia | Nunca presentar supuestos financieros como hechos; evidencias correlacionadas |
| Arquitectura e interactividad (5) | `sitio/assets/pmo-domains.mjs`, UI en `sitio/assets/app.mjs`, `DIAGRAMA_FLUJO_PMO.mmd`, `DOCUMENTACION_DOMINIOS_PMO.md` | Seleccionar tres dominios, tres preguntas cada uno, cambiar dominio, consulta libre | Botones visibles, enrutamiento y fallback local ante error |
| Exposición (5) | `GUION_EXPOSICION_Y_PREGUNTAS_V12.md`, esta matriz, suite de pruebas | Demostración con tiempos y tres preguntas trampa | Explicar por qué Netlify/Gemini y por qué no inventar CPI/holguras |

## Identificación y uso de fuentes
1. **PDF Informe Final Consolidado 2026:** documentos, capítulos y datos textuales del proyecto. El índice `master_index.json` se prepara con fragmentos del PDF; la búsqueda recupera páginas candidatas y se entregan al modelo con identificador de página.
2. **`knowledge.json` y fichas:** síntesis de consulta local y de respaldo; no sustituyen las citas del informe.
3. **`SIGRED_PMO_Semaforo_Calculable_2026.xlsx`:** insumo de tableros/escenarios académicos; no es una fuente de costos reales del proyecto por defecto.

**Límite RAG:** es recuperación local por relevancia, no una verificación criptográfica de cada afirmación ni validación humana de fuentes. Las páginas suministradas son candidatas; el prompt exige verificar su pertinencia. La verificación de contenido y de conexión real con Gemini debe realizarse en la plataforma desplegada.

## Control de 9 consultas obligatorias
- Gobernanza: objetivos/patrocinador; restricciones/supuestos; autoridad presupuestaria.
- Cronograma: retrasos/ruta crítica; hitos amenazados; holgura.
- EVM: AC/PV/EV; CPI/SPI/EAC; desviaciones por paquetes/contingencia.

## Declaración de resultados de prueba
Una prueba local con `fetch` simulado solo valida la integración de software, NO garantiza que la API de Google esté accesible, que haya cuota, o que el modelo citado en `GEMINI_MODEL` exista. Para demostrar Gemini real: comprobar estado en Configuración, ejecutar consulta con modo IA y mostrar la etiqueta de modo `gemini` de la respuesta.
