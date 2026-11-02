# Validación del PMO-Bot SIGRED V5

**Fecha:** 1 de noviembre de 2026. Para ejecutar nuevamente: `npm test` desde la carpeta raíz.

La batería contiene **30 casos automáticos**, que incluyen las 40 fichas, cifras, presupuestos, riesgos, cronogramas, abstención, escenarios PMO, persistencia de múltiples conversaciones, migración de historial V4, recuperación de contexto, imágenes y una **API Gemini simulada**. La integración verifica además rutas del servidor, bloqueo de orígenes no permitidos y fallback al fallar una API simulada.

La interfaz se representó y ejercitó mediante Chromium en un entorno de prueba con los scripts y datos del proyecto inyectados localmente, sin salir a la red. Se revisaron 1440 px (PC), 768 px (tablet) y 390 px (móvil), sin desbordamiento horizontal. Se comprobó la selección de una tarjeta de riesgos, una pregunta de contingencia y el cambio entre dos conversaciones independientes. Las imágenes de esta carpeta corresponden a ese entorno de prueba.

**Límites de la verificación:** no se ha probado el Gemini real con la clave del usuario, no se ha desplegado ni comprobado una URL pública, no se ha verificado sincronización entre dispositivos (no existe) y no se ha verificado disponibilidad permanente ni gratuidad de un servicio de terceros. La generación de imágenes se probó mediante un servidor simulado, no con una cuenta facturable.
