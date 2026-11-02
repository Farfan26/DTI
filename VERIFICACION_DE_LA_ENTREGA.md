# Estado de verificación SIGRED V8

- PDF maestro: 105 páginas, extraído y verificado mediante PyMuPDF.
- Índice de PDF: 285 fragmentos distribuidos en sus 105 páginas.
- Base anterior: 58 fichas y 1 280 reformulaciones locales.
- Recursos visuales: 33; incluyen 4 gráficos y 10 vistas nuevas del PDF maestro.
- Interfaz: ocho tarjetas; diseño PC/tablet/móvil comprobado sin desbordamiento horizontal mediante renderizado Chromium del HTML y CSS actuales.
- Acciones operativas comprobadas en Chromium con scripts inyectados: abrir biblioteca, consultar pág. 25, abrir cita, nuevo chat, riesgos y mantener historial entre chats.
- Pruebas de API: Gemini simulado, 429, cuota/fallback, configuración sin clave, y protección frente a exposición de clave.
- `npm test`: la batería automatizada debe pasar antes de publicar; ver resultado ejecutado en la entrega.

**No comprobado:** despliegue real en GitHub/Netlify de la cuenta del usuario; disponibilidad de su API Key; respuesta de Gemini real; tarifas/facturación de su cuenta; pruebas de carga de producción. Estas verificaciones requieren su configuración de servicios y credenciales.
