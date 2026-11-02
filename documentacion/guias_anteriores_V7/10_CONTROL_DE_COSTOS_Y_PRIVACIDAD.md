# Uso económico, memoria y límites — SIGRED V5

## Cómo usar menos tokens

1. Deja el modo **Automático**. Si la pregunta coincide con un dato directo (presupuesto, avance, fechas), el bot consulta la base local.
2. Limita respuestas de IA con `maxOutputTokens` en `backend/server.mjs` (actualmente 650 como máximo por llamada). La generación puede utilizar tokens internos según el modelo.
3. Cada solicitud manda hasta tres fragmentos documentales y **ocho mensajes recientes** del chat activo; evita enviar conversaciones completas.
4. Configura `DAILY_AI_LIMIT=35` o un número inferior. Este es un contador **temporal por proceso**: reiniciar el servicio puede reiniciarlo, y varias instancias pueden contar independientemente.
5. Usa **Solo documentos** durante pruebas de diseño, exposición inicial o cuando no necesites Gemini.
6. Deja `ENABLE_IMAGE_GENERATION=false`: los modelos de imágenes pueden generar costos, aun si el chat tiene cuota gratuita.
7. Monitorea cuota, facturación y alertas directamente en Google AI Studio/Google Cloud. No confundas límites de solicitudes con un límite de facturación.

## Qué datos salen del navegador cuando conectas Gemini

Una pregunta, el tema, hasta ocho mensajes recientes de ese chat y notas opcionales se envían **al backend que tú configures**, y desde allí a Google junto con fragmentos documentales. Los títulos e historiales de otros chats no se envían. No pegues secretos, DNI, teléfonos privados o información confidencial en el chat.

`localStorage` pertenece a ese navegador y sitio, no a una cuenta del usuario. Cualquier persona con acceso al perfil de navegador podría leer la información local. Usa `⋯ → Eliminar` o desactiva memoria desde ⚙ para borrar los chats almacenados. El historial solo está disponible en ese dispositivo. El uso de memoria del proveedor y las políticas de retención de Google dependen de tu plan/contrato.

## Publicación segura

- Subir solo documentos aprobados para publicación: los PDFs están en la web y cualquiera con el enlace podrá acceder a ellos.
- No publiques `.env`, claves ni contraseñas; verifica que `.gitignore` está activo.
- Usa HTTPS para el frontend y el backend.
- Configura `ALLOWED_ORIGINS` con el origen exacto.
- Para una página pública con uso elevado, añade **autenticación, CAPTCHA, un límite externo persistente y monitoreo de gastos** antes de activar IA.
- CORS **no impide** solicitudes directas a tu backend.
- No asumas uptime ilimitado ni respuesta infinita: los niveles gratuitos tienen límites y la IA puede fallar.

## Limitaciones funcionales importantes

- Base documental local = búsqueda por temas y palabras clave en 40 fichas, no entrenamiento de Gemini ni un índice vectorial integral.
- Gemini no posee acceso mágico a los PDF: el backend le pasa fragmentos relevantes; cuando no se encuentran, se aplica una abstención.
- La memoria sirve para seguir el hilo conversacional, pero no transforma lo dicho por el usuario en una fuente oficial.
- No ofrece subida arbitraria de archivos o sincronización entre dispositivos. Un adjunto no se procesa automáticamente.
- Las imágenes generadas, si alguna vez las habilitas, son solo ilustraciones conceptuales.

## Referencias oficiales

- Modelos Gemini: https://ai.google.dev/gemini-api/docs/models
- Límites Gemini: https://ai.google.dev/gemini-api/docs/rate-limits
- Claves API Gemini: https://ai.google.dev/gemini-api/docs/api-key
