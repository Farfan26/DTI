# Verificación V9 — 01/11/2026

- **46 pruebas automáticas superadas** (`npm test`): pruebas documentales, Gemini simulado, 1280 preguntas del banco, galería y cuatro pruebas específicas de accesos permanentes.
- `node --check sitio/assets/app.mjs`: sintaxis válida.
- La conexión real con Gemini y la publicación en la cuenta del usuario NO se han verificado por carecer de sus credenciales privadas.
- El navegador automatizado de este entorno bloqueó las navegaciones locales; el resultado responsive debe probarse al publicar en Netlify, especialmente en móviles.
- La barra permanente está fuera del bloque de bienvenida que se oculta tras el primer mensaje y dentro de la zona del composer.
- Sin claves incorporadas al código.
