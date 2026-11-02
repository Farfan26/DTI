# GUÍA 01 · Publicar PMO-Bot SIGRED paso a paso

**¡Esta aplicación no utiliza Voiceflow!** El bot está diseñado con frontend estático, backend Node.js y Gemini. La API Key se guarda únicamente como secreto del servidor.

## Opción A: UNA SOLA DIRECCIÓN web (la más sencilla)

Puedes publicar **todo el proyecto como una aplicación Node.js** en un proveedor compatible. Así no necesitas configurar dos sitios ni CORS. Ejemplo con Render:

1. Descomprime `PMO_BOT_SIGRED_V4_IA_MEMORIA_COMPLETO_2026.zip` y entra en la carpeta del proyecto.
2. Crea un repositorio nuevo en GitHub. Sube **los archivos interiores** (`package.json`, `backend`, `sitio`, etc.), NO una carpeta envolvente extra.
3. Confirma que **NO subiste ningún `.env` ni API Key**. GitHub debe contener únicamente `backend/.env.example` sin clave.
4. En https://dashboard.render.com/ pulsa **New → Web Service** y conecta GitHub.
5. Elige tu repositorio, Language/Runtime **Node**, Root Directory **vacío** (porque `package.json` está en la raíz), Build Command `npm install`, Start Command `npm start`.
6. En **Environment Variables**, crea `GEMINI_API_KEY` con tu clave real, `GEMINI_MODEL` con `gemini-3.5-flash-lite` y `NODE_ENV` con `production`. Si el proyecto de Google no tiene acceso a ese modelo, cambia al modelo que AI Studio muestre como habilitado.
7. Elige el plan disponible que prefieras (el gratuito puede suspenderse por inactividad). Pulsa **Deploy**.
8. Abre `https://TU-SERVICIO.onrender.com/`. Esta es LA WEB COMPLETA con su propio chat.
9. Abre `https://TU-SERVICIO.onrender.com/api/health`. Debe indicar `"aiConfigured":true`; no muestra la clave.
10. Haz preguntas en la web y verifica que la respuesta indica `Gemini + documentos`. Si solo aparece `Documental`, revisa credenciales, cuota y la configuración.

**Ventaja:** un único alojamiento y una URL para compartir, sin cambiar `sitio/config.js`.

## Opción B: GitHub + Netlify (frontend) + Render (backend)

Esta es la opción para tener la página en tu alojamiento estático habitual.

**1. Backend (Render)**

- Crea **Web Service** desde el mismo repositorio de GitHub.
- Root Directory vacío, Build `npm install`, Start `npm start`.
- Configura en Environment Variables:
  - `GEMINI_API_KEY` = tu clave privada (SOLO en Render).
  - `GEMINI_MODEL` = `gemini-3.5-flash-lite`.
  - `NODE_ENV` = `production`.
  - `ALLOWED_ORIGINS` = `https://TU-SITIO.netlify.app` (sin barra final).
- Copia la URL pública de Render: `https://TU-API.onrender.com`.

**2. Sitio web (Netlify)**

- En el archivo público `sitio/config.js`, busca `apiBaseUrl: ''` y reemplázalo por `apiBaseUrl: 'https://TU-API.onrender.com'`.
- **NO pongas tu API Key** en este archivo; contiene solamente una URL pública.
- Haz commit y push a GitHub.
- En Netlify crea un sitio **Import an existing project → GitHub** o arrastra el contenido de la carpeta `sitio/` para un deploy manual.
- Si conectas GitHub, usa **Base directory vacío** y **Publish directory `sitio`**, Build Command vacío (no hay compilación).
- Verifica que `https://TU-SITIO.netlify.app/` cargue el chat y que muestre **Gemini configurado**.

**3. Si falla CORS:** revisa que `ALLOWED_ORIGINS` tenga la URL pública exacta del frontend, con `https://` y sin `/` final. Si añadiste dominio propio, agrega ambos separados por coma y reinicia el backend.

**4. Si el chat solo responde con la base local:** comprueba `/api/health`, las cuotas de Gemini, si el modelo existe para tu cuenta y si el backend de Render está despierto.

## Importante sobre costos y disponibilidad

- GitHub, Netlify y Render tienen planes y límites propios, que pueden cambiar.
- Render indica que los servicios web de plan Free se suspenden tras **15 minutos de inactividad** y pueden tardar en reactivarse. Por eso NO se garantiza servicio IA sin interrupciones todo el día.
- Gemini también tiene **cuotas por modelo y plan**. Tras agotar la cuota, las respuestas generadas por IA se sustituyen por respuestas del índice documental.
- Si deseas costo cero de API, verifica que tu clave pertenece a un **Free tier** y no actives facturación si no quieres cargos.
- Los cuatro PDF están servidos públicamente con el frontend: revisa que su contenido esté autorizado para difusión.

### Fuentes para deployment
- https://render.com/docs/web-services
- https://render.com/docs/free
- https://docs.netlify.com/
