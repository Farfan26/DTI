# Guía exacta: GitHub → Netlify → Gemini | PMO-Bot SIGRED V8

## A. Qué cambia con respecto a las versiones anteriores
La versión V7 sugería dos alojamientos (frontend y backend). **V8 usa Netlify Functions**, por lo que **una sola web de Netlify** puede servir la interfaz y ejecutar las llamadas a Gemini de forma segura. No utiliza Render, Python ni un servidor permanente. La conexión depende de que Netlify construya las Functions a partir del repositorio, no solo de subir un ZIP al área de arrastrar archivos.

## B. Extraer y subir correctamente a GitHub
1. Descarga el ZIP COMPLETO V8 y extráelo en tu PC.
2. Abre la carpeta extraída. Debes ver en ese nivel: `netlify.toml`, `netlify/`, `sitio/`, `pruebas/`, `documentacion/`, `guias/`, `package.json`.
3. Abre el repositorio GitHub que **ya está conectado con tu sitio Netlify**. Verifica cuál es la rama de producción, habitualmente `main`.
4. En **Add file → Upload files**, carga los archivos y carpetas del nivel anterior (no subas el ZIP comprimido; no anides toda la aplicación dentro de otra carpeta).
5. **Commit changes**. Verifica que en GitHub se pueda navegar a `sitio/index.html` y a `netlify/functions/chat.mjs`.
6. Si GitHub rechaza la carga masiva, usa **GitHub Desktop** o Visual Studio Code con Git: clona tu repositorio, copia los archivos al directorio local, haz commit y push. No subas `node_modules`, `.env` ni otros archivos privados.
7. No borres por defecto los repositorios ni los dominios existentes; solo reemplaza la versión del bot correspondiente.

## C. Conectar GitHub a tu proyecto de Netlify
1. Entra en **https://app.netlify.com** y abre el sitio actual del PMO-Bot SIGRED.
2. En Project configuration / Build & deploy verifica que está conectado **al repositorio y rama correctos**.
3. Si se creó inicialmente con arrastrar-soltar archivos, debes **vincular GitHub** mediante la opción para conectar el repositorio (la ubicación exacta varía por versión de la interfaz). Sin esta conexión, los commits no actualizan automáticamente la web.
4. Revisa que el archivo `netlify.toml` esté en la raíz del repositorio. Configura según él: **Build command vacío**, **Publish directory = sitio**, **Functions directory = netlify/functions**. El `netlify.toml` ya incluye los directorios; evita configuraciones contradictorias.
5. Ve a Deploys. Abre el nuevo deploy iniciado tras hacer commit. Debe terminar en **Published**. Si aparece Failed, abre el log del deploy para encontrar el error concreto.

## D. Crear tu API Key de Gemini SIN pagar por adelantado
1. Abre **https://aistudio.google.com/api-keys** con tu cuenta.
2. Selecciona el proyecto correspondiente y usa **Create API key**, si necesitas crear una nueva.
3. Confirma que tu modelo tenga cuota de Free Tier suficiente en tu cuenta (la disponibilidad puede variar). No actives la facturación si solo quieres usar el nivel gratuito.
4. Copia la clave en privado: **jamás en un chat, una captura pública o un repositorio**.
5. El modelo de texto sugerido es `gemini-3.5-flash-lite`. Si tu cuenta permite un modelo diferente, cámbialo en la variable `GEMINI_MODEL` (sin incluir el prefijo `models/`).

## E. Conectar Gemini desde Netlify (la clave no se sube a GitHub)
1. En tu sitio Netlify, entra en **Project configuration → Environment variables** (puede aparecer en «Site configuration» según la interfaz).
2. **Add a variable**. Nombre `GEMINI_API_KEY`; valor: tu clave secreta.
3. **Add a variable**. Nombre `ENABLE_PUBLIC_AI`; valor literal: `true`.
4. Opcionalmente añade `GEMINI_MODEL` = `gemini-3.5-flash-lite`, `MAX_OUTPUT_TOKENS` = `650`.
5. Si tu cuenta ofrece **Scope**, asegúrate de que los valores estén disponibles para **Functions**. **No** declares esos secretos en `netlify.toml`: no se exponen a las Functions en tiempo de ejecución.
6. Guarda, vuelve a Deploys y crea un **nuevo deploy** para aplicar las variables de entorno.
7. Abre `https://TU-SITIO.netlify.app/api/health`. Deberías ver `"aiConfigured":true`. **No** aparece nunca tu clave en esta ruta.
8. Abre tu sitio, pulsa ⚙ y elige **Gemini prioritario**. Pregunta: «Analiza los riesgos de SIGRED y cita la fuente documental». La respuesta debería usar el modo IA si la cuota está disponible.
9. Si la web muestra «Documental disponible», la IA puede estar desactivada o la función no se ha desplegado. Revisa la ruta `/api/health`, el log de Functions y las variables.
10. **No necesitas escribir ningún URL de backend** en el navegador: la web utiliza `/api/chat` y `/api/health` del mismo dominio.

## F. Cómo reducir uso de tokens
- El modo **Solo documentos** no llama a Gemini.
- **Automático** omite Gemini para preguntas directas sobre datos ya conocidos.
- **Gemini prioritario** hace llamadas para preguntas que requieren análisis, síntesis o seguimiento, siempre que estén dentro de SIGRED.
- La función solo envía al modelo los **fragmentos relevantes** del manual y las fichas, no las 105 páginas completas.
- La función aplica un límite de **12 solicitudes por minuto por IP** mediante la configuración de Netlify; **no equivale a un presupuesto total diario ni garantiza costo cero**.
- Google AI Studio aplica sus límites propios; al superar cuota el sistema ofrece respuestas de respaldo local.
- Para evitar tráfico anónimo inesperado, puedes desactivar `ENABLE_PUBLIC_AI` cambiando a `false` y redeplegando.

## G. Diagnóstico por error
| Síntoma | Comprobación / solución |
| --- | --- |
| `index.html` no aparece | El Publish directory debe ser `sitio` y GitHub debe contener `sitio/index.html` |
| 404 en `/api/health` | No desplegaste `netlify/functions/health.mjs` o subiste solo el ZIP web |
| `aiConfigured:false` | Falta `GEMINI_API_KEY`, `ENABLE_PUBLIC_AI=true` o un nuevo deploy |
| Error 400 API de Google | Revisa que el modelo exista en tu cuenta y configuración |
| Error 401/403 de Google | API Key o permisos del proyecto incorrectos |
| Error 429 o fallback documental | Límite de cuota de Gemini o Netlify; comprueba el panel Usage |
| GitHub cambia y la web no | Revisa repositorio/rama conectados y Deploys; al arrastrar archivos no hay auto-deploy |
| Error CORS | Usa esta versión sin URL de backend: mismo dominio y Functions |
| El historial no se ve en otro celular | La memoria es local por dispositivo, no es una cuenta compartida |

## H. Verificación final antes de la sustentación
- Abre en modo incógnito la web y comprueba que responde las fichas sin iniciar sesión.
- Haz prueba de Gemini con una consulta compleja (identifica la etiqueta «Generado por Gemini»).
- Activa «Solo documentos» y pregunta por el presupuesto original.
- Pide «¿Qué dice la página 25 de la documentación maestra?» y abre la cita al PDF p. 25.
- Entra a «DTI · Grupo 09» y comprueba nombres completos de docente/equipo.
- Prueba las ocho tarjetas, nuevo chat, historial, iconos, enlaces de PDF y vista móvil.
- Guarda **capturas reales del sitio publicado** para la matriz de evidencia. No sustituyas con simulaciones las pruebas reales de Gemini.

Fuentes oficiales: https://docs.netlify.com/build/functions/get-started/ · https://docs.netlify.com/build/functions/environment-variables/ · https://ai.google.dev/api/generate-content
