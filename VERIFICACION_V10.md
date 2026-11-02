# Verificación honesta de SIGRED V10

- Inspección de insumos: PDF final de 80 páginas, Word con 22 imágenes y XLSX académico con hojas Parámetros, Indicadores, Riesgos, EVM, Economía y Panel.
- Base: 108 fichas, 307 fragmentos de texto por página, 1 620 formulaciones de consulta. No son 1 620 hechos diferentes.
- Figuras: 22 originales recortadas desde el DOCX, 12 páginas vistas del PDF y un semáforo SVG derivado del Excel (35 recursos visuales).
- Pruebas automáticas reproducibles: `npm test` en la raíz del proyecto. Incluyen saludos, consulta fuera de tema, rutas, fuentes, rechazo de datos no verificados, figuras y respuestas Gemini simuladas.
- Pruebas locales HTTP de `/api/health`, `/api/chat`, fuente PDF y una figura: verificadas en el entorno de desarrollo.
- Prueba visual del navegador Chromium: **no concluida**, ya que este entorno impidió completar la captura; debe probarse en un PC y celular reales tras actualizar Netlify.
- Respuestas **reales** de Gemini de esta versión: **pendientes de comprobar en el sitio del usuario**. La versión anterior ya fue verificada por el usuario, pero la V10 requiere su propia verificación después del deploy.
- No es evidencia de que SIGRED haya sido oficialmente aprobado ni desplegado para reservas institucionales. La valoración académica corresponde a la profesora.
