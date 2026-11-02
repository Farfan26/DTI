# Guía de la V5 — interfaz ChatGPT y conexiones reales

## 1. Cómo se utiliza

En PC aparece una barra izquierda; en celular pulsa ☰. Selecciona **Nueva conversación** (también `Ctrl + K`). El primer mensaje crea automáticamente el título. Puedes elegir cualquiera de las seis tarjetas o escribir en la caja inferior. El asistente responde en el **mismo chat**. Cada conversación tiene sus propios mensajes; la barra izquierda permite buscarlas, retomarlas, renombrarlas y eliminarlas con `⋯`. Exporta la conversación actual en `.txt`.

Los mensajes quedan en `localStorage` si la memoria está activada. El navegador almacena hasta 30 conversaciones y 80 mensajes por chat. El servidor solo recibe los últimos ocho turnos del chat activo para interpretar preguntas de seguimiento. No sincroniza entre PC y celular, y no es un registro auditado multiusuario.

## 2. Tres modos reales

| Modo en ⚙ | Qué sucede | Gasto de tokens |
|---|---|---|
| Automático | Preguntas simples verificadas salen de fichas SIGRED; preguntas que necesitan interpretación intentan Gemini | Menor, variable |
| Gemini prioritario | Intenta Gemini para toda pregunta pertinente con fragmentos documentales | Mayor |
| Solo documentos | Responde por búsqueda local sin solicitar IA | Cero por IA |

Si Gemini devuelve error/cuota excedida, responde desde las fichas cuando existe coincidencia; preguntas externas no reciben datos inventados.

## 3. Conectar Google AI Studio de manera segura

1. Abre https://aistudio.google.com/api-keys y crea o localiza una **API Key de Gemini**.
2. Verifica que el modelo `gemini-3.5-flash-lite` se encuentre disponible para tu proyecto; consulta los límites de la cuenta. La clave de prueba del profesor no es ilimitada.
3. **Nunca compartas la clave** por mensajes ni la incluyas en un archivo público.
4. Copia `backend/.env.example` a `backend/.env` (fuera de Git) y edita:

```env
GEMINI_API_KEY=TU_CLAVE_PRIVADA
GEMINI_MODEL=gemini-3.5-flash-lite
PORT=8787
DAILY_AI_LIMIT=35
RATE_LIMIT=20
NODE_ENV=development
ENABLE_IMAGE_GENERATION=false
```

5. En la raíz ejecuta `npm run dev`; abre `http://localhost:8787`. En ⚙ selecciona `Gemini prioritario` para comprobar una pregunta interpretativa.
6. Comprueba `http://localhost:8787/api/health`. `aiConfigured:true` significa **clave configurada**, no garantiza que sea válida ni que disponga de cuota; la validación real ocurre al enviar una pregunta pertinente.

## 4. GitHub y despliegue con frontal y backend separados

- Crea un repositorio GitHub con el contenido del ZIP (sin `.env`).
- Publica **solo `sitio/`** en tu hosting estático; no requiere instalar dependencias.
- Para la IA, publica también el servidor Node.js en un servicio HTTPS que acepte variables de entorno, usando como comando de inicio `npm start`.
- En ese servidor establece la clave como variable privada (`GEMINI_API_KEY`) y `ALLOWED_ORIGINS=https://DIRECCION-EXACTA-DEL-SITIO`, `NODE_ENV=production`.
- En `sitio/config.js` coloca la dirección completa HTTPS del backend en `apiBaseUrl`, o cámbiala desde ⚙ del chatbot.
- Publica y prueba en una ventana privada. Si un proveedor permite alojar toda la app Node.js, puedes servir el frontend y la API desde la misma dirección, sin editar la URL.

### Comprobaciones de diagnóstico

- Bot indica **Documental disponible**: revisa `apiBaseUrl`, `/api/health`, el origen permitido, la clave y la cuenta/cuota.
- Bot genera información de SIGRED pero no habla como IA: comprueba el modo en ⚙; Automático evita llamadas de ciertas preguntas frecuentes.
- Gemini no responde: prueba **Gemini prioritario** con una pregunta de análisis; revisa errores de cuota 429 o permisos sin exponer la clave.
- Botón «Crear ilustración» no funciona: está **desactivado adrede**, por su posible costo.
- El historial no aparece: verifica que el navegador no esté en modo privado ni bloquee almacenamiento local.

## 5. Prueba de aceptación propuesta

- Abre el sitio en PC y móvil y comprueba que no exista scroll horizontal.
- Crea chat A y pregunta por los riesgos R-G2; crea chat B y consulta la reserva de contingencia.
- Vuelve a A: debe mostrar los riesgos; al regresar a B, el presupuesto.
- Recarga la web y verifica que ambos chats permanezcan (memoria activada).
- Pide «Muéstrame el gráfico del presupuesto»: debe añadir una imagen documental con fuente PDF.
- Pregunta algo externo («¿Quién ganó el mundial?»): debe abstenerse.
- Solo tras configurar una clave válida, activa Gemini prioritario y verifica una respuesta con el servidor.

## Archivos a modificar

- `sitio/assets/styles.css`: colores/tipografía/tarjetas.
- `sitio/assets/app.mjs`: UI e interacción; código comentado.
- `sitio/data/knowledge.json` y `.js`: datos documentados (mantener sincronizados).
- `sitio/config.js`: URL del backend, **no clave privada**.
- `backend/.env`: secreto, **no se sube a GitHub**.
