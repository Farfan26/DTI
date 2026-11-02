# Actualizar SIGRED V10 sin perder Gemini ni el dominio de Netlify

## Antes de subir

1. Descarga el ZIP V10 y **descomprímelo**. No subas el archivo `.zip` dentro de GitHub esperando que se extraiga.
2. Haz una copia del repositorio actual o crea un commit de respaldo en GitHub Desktop.
3. El nuevo corpus **sustituye** las fuentes antiguas: el Informe Final PDF de 80 páginas es la referencia principal. Si quedan archivos de la V9 bajo `sitio/documentos/`, elimínalos expresamente para evitar duplicidad.

## GitHub Desktop (forma recomendada)

1. Abre GitHub Desktop y selecciona el repositorio vinculado al proyecto `dti-pmo-grupo09-bot`.
2. Abre **Repository → Show in Explorer**.
3. Copia el contenido **interno** de este ZIP a la raíz del repositorio, aceptando el reemplazo de los archivos existentes, no creando una carpeta adicional `V10`.
4. Comprueba que existan en la raíz `netlify.toml`, `sitio/`, `netlify/functions/` y `package.json`.
5. En **Changes**, asegúrate de que `.env` y cualquier API Key **no** aparecen entre los archivos modificados.
6. Haz **Commit to main** y **Push origin**.

## Netlify

1. Abre tu sitio `dti-pmo-grupo09-bot` → **Deploys** y revisa el despliegue del último commit.
2. En Netlify revisa Publish directory = `sitio` y Functions directory = `netlify/functions` (están declarados en `netlify.toml`).
3. Mantén las variables existentes: `GEMINI_API_KEY` (secreta), `ENABLE_PUBLIC_AI=true`, `GEMINI_MODEL` y `MAX_OUTPUT_TOKENS=650`. No debes crear una nueva clave por esta actualización.
4. Cuando el nuevo deploy esté en **Published**, usa tu dominio principal `https://dti-pmo-grupo09-bot.netlify.app`, no una dirección temporal de Deploy Preview.
5. Pulsa Ctrl + F5 para cargar los nuevos scripts. No coloques ningún backend externo en Configuración: deja ese campo vacío, porque `/api/chat` está en el mismo dominio.

## Comprobar el estado

- Abre `https://dti-pmo-grupo09-bot.netlify.app/api/health`. Deberá indicar `documentPages: 80`, `knowledgeVersion: 10` y, si tu configuración está vigente, `aiConfigured: true`.
- Abre el engranaje → Gemini prioritario → Probar conexión Gemini. Verifica una respuesta real, no solo la presencia de la clave.
- Prueba en una misma conversación: `Hola causa`, `¿Qué resultados tuvo la validación?`, `¿Qué significa el semáforo de producción?`, `¿Me muestras la figura del calendario?`, `Compara los riesgos de acceso y concurrencia`, y `¿Y cuál atenderías primero?`.
- Comprueba que una solicitud externa como `¿Quién ganó el Mundial de 2022?` se responda con amabilidad y ejemplos de preguntas sobre SIGRED.
- Abre la Biblioteca y comprueba el PDF completo, las figuras y el Excel académico.

## Ahorrar consultas

Modo **Automático** responde algunos hechos directamente desde las fichas locales; modo **Solo documentos** no consume tokens; modo **Gemini prioritario** utiliza IA para consultas fundamentadas y hace más llamadas. Mantén `MAX_OUTPUT_TOKENS=650` o ajusta según la cuota. Los errores de Google devuelven el respaldo documental.

## Si falla

| Señal | Qué revisar |
|---|---|
| `/api/health` devuelve 404 | `netlify.toml` y carpeta `netlify/functions/`, que Netlify esté conectado a GitHub |
| `aiConfigured: false` | Variables de Netlify y nuevo deploy de producción |
| 403 / clave inválida | Permisos y clave de Google AI Studio (no enviarla a terceros) |
| 404 / modelo | Cambia `GEMINI_MODEL` a un identificador habilitado en tu proyecto Google |
| 429 | Cuota Gemini agotada: espera reposición o utiliza modo documental |
| Sigue mostrando 105 páginas | Caché del navegador o despliegue antiguo; Ctrl + F5 y comprueba el commit |
| La imagen no abre | Verifica los archivos `sitio/media/final_figura_*.webp` del último commit |
| La conversación anterior mezcla contexto | Usa **Nueva conversación**; el historial de cada chat se almacena localmente |
