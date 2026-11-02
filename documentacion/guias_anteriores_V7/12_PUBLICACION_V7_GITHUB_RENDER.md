# Publicación V7 y Gemini

1. Extraer el ZIP; subir su contenido a GitHub, NO el ZIP como único archivo.
2. Web estática: publicar carpeta `sitio` y dejar el comando de compilación vacío. No publicar `.env`.
3. Para Gemini: alojar `backend` como servidor Node.js HTTPS con comando `node server.mjs` o alojar el proyecto desde raíz con `npm start`.
4. Configurar `GEMINI_API_KEY`, `GEMINI_MODEL` (nombre disponible en la cuenta), `ALLOWED_ORIGINS` (dominio real del sitio) como variables privadas en el servidor. Consultar catálogo de modelos y cuotas de Google AI Studio; el nivel gratuito no garantiza uso sin límites.
5. Actualizar `sitio/config.js` con la URL del backend; no colocar allí secretos.
6. Abrir la página en modo Automático e iniciar una consulta libre con contexto documental; revisar `/api/health` y registros del servidor si no aparece Gemini.
7. Probar los botones, nueva conversación, memoria, consulta de riesgos, imágenes y una pregunta fuera del dominio.
8. Subir el commit a rama conectada al sitio para activar actualización automática.
9. El despliegue no asegura disponibilidad 24/7 en alojamientos gratuitos ni que los contenidos sean datos oficiales actualizados.
