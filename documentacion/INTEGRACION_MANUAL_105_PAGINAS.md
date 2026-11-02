# Integración de la documentación maestra SIGRED

- Documento: `sitio/documentos/SIGRED_DOCUMENTACION_MAESTRA_2026.pdf`.
- Páginas reales comprobadas: **105**.
- Fragmentos extraídos: **285**, cada uno con propiedad `page` y texto trazable a una página PDF.
- Índice local: `sitio/data/master_index.js` y `master_index.json`.
- Índice de función: `netlify/functions/master-index.mjs` (igual contenido, incluido en el paquete y procesado junto con la función).
- Galería: 10 vistas de páginas maestras, que se suman a figuras y gráficos originales disponibles de informes y actas.
- Fuentes anteriores: cuatro PDF PMO (Charter, WBS/Cronograma, Riesgos, Informe de Estado), más informes parciales 4 y 5.
- No se ha inventado material nuevo para contestar: las fichas anteriores resumen fuentes, el índice nuevo cita texto literal, Gemini utiliza los fragmentos pertinentes.

**Limitación:** la extracción textual es automática. Tablas, ecuaciones, figuras y jerarquías visuales pueden perder estructura; debe cotejarse con el PDF original cuando se trate de datos críticos. La maestra integra propuestas y escenarios de trabajo que no acreditan implementación institucional ni aprobación final.

**Actualizar el manual posteriormente:** reemplazar el PDF no actualiza por sí mismo el índice. Debes regenerar tanto el índice local como el de Netlify para sincronizar la versión. El script de preparación de este paquete quedó fuera del runtime; el chatbot publicado no ejecuta Python.
