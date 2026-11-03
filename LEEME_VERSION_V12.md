# PMO-Bot SIGRED V12 — Sobresaliente como objetivo de diseño

Esta versión parte de V11 y **conserva el mismo endpoint `/api/chat`**, los archivos de conocimiento, las tres categorías PMO, las nueve preguntas y la configuración Gemini. En V12 se robustece el prompt del servidor y se añaden evidencias para defensa de la rúbrica de 20 puntos.

## Comenzar
1. Lee `RUBRICA_SOBRESALIENTE_20_20.md` para localizar la evidencia de cada criterio.
2. Lee `prompts/SYSTEM_PROMPT_PMO_SOBRESALIENTE_V12.md` y `GUION_EXPOSICION_Y_PREGUNTAS_V12.md`.
3. Ejecuta `npm test` en la carpeta `DTI` (73 verificaciones en ambiente local con proveedor simulado).
4. Publica **la carpeta DTI como raíz del repositorio**, conservando `netlify.toml` en raíz y el publish `sitio`.
5. En variables de Netlify conserva `GEMINI_API_KEY`, `GEMINI_MODEL`, `ENABLE_PUBLIC_AI=true` y, si lo tienes configurado, `MAX_OUTPUT_TOKENS`. El backend usa 1100 tokens de salida por defecto (hasta 1600); revisa cuotas de tu cuenta.
6. Verifica en la web desplegada el botón de conexión Gemini y las nueve preguntas. Una respuesta local o una prueba simulada NO certifica acceso a Google.

## Límites
La intención es demostrar el nivel Sobresaliente, **no garantizar una nota otorgada por la docente**. Cuando faltan datos oficiales el bot debe reconocerlo. No se ha efectuado validación externa en vivo de Gemini ni de la veracidad de cada fragmento documental desde esta máquina.
