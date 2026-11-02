# GUÍA 02 · Activar Gemini y proteger la API Key

## Paso 1: Obtener una API Key
1. Abre https://aistudio.google.com/api-keys
2. Selecciona tu proyecto autorizado, revisa Free Tier / Paid Tier.
3. Crea/copia tu API Key. **Nunca la envíes por WhatsApp, chats o capturas.**
4. Para limitar cargos, revisa cuotas y alertas desde AI Studio / Google Cloud.

## Paso 2: Configurar el servidor (sin código sensible)
1. En Windows con VS Code: copia `backend/.env.example` y renombra la copia a `backend/.env`.
2. Edita `.env` y escribe `GEMINI_API_KEY=tu_clave_real`.
3. Mantén `GEMINI_MODEL=gemini-3.5-flash-lite` si Google AI Studio confirma que tu cuenta tiene acceso. El nombre puede cambiar en el futuro.
4. Desde la raíz ejecuta `npm run dev`. Abre http://localhost:8787/ y pregunta por los riesgos SIGRED.
5. Abre http://localhost:8787/api/health: `aiConfigured:true` significa que el backend **recibió una clave**, NO que la llamada a Google ya haya sido validada.
6. Una respuesta del chat etiquetada `Gemini + documentos` confirma que Gemini respondió. Si sale `Documental`, se usó la respuesta local.

## Paso 3: Producción
En tu proveedor de backend, abre la sección **Environment / Secrets** y agrega `GEMINI_API_KEY` allí. No subas `.env` a GitHub. El archivo `.gitignore` ya lo excluye.

## Qué se envía a Gemini
El servidor envía la consulta, contexto conversacional reciente y fichas documentales recuperadas. Solo hay acceso a las fichas pertinentes; **no hay sincronización en tiempo real con los PDF**. No incluyas información confidencial o personal si no cuentas con autorización para transmitirla a un proveedor externo.

## Seguridad incorporada
- La clave no está en el frontend.
- Restricción de dominios para navegador con CORS.
- Límite básico de consultas por conexión/IP y máximo de solicitudes concurrentes.
- Validación de tamaño y longitud de solicitudes.
- Timeouts de llamadas a Google.
- Respaldo documental ante errores 429, 401, 403, caída de red, timeout o respuesta vacía.

**Advertencia:** CORS no evita invocaciones directas fuera del navegador. Para un despliegue público de alto tráfico incorpora control de acceso, WAF/CAPTCHA, monitoreo y cuotas; no hay protección absoluta contra abuso ni costo garantizado cero.

Referencias oficiales:
- https://ai.google.dev/gemini-api/docs/api-key
- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/gemini-api/docs/rate-limits
