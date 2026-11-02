# Informe de validación técnica — V9.1

- Ejecutados: 54 tests de Node.js, todos aprobados (incluye 8 nuevos casos Gemini).
- Integración Gemini: HTTP POST a Gemini desde Netlify Functions con `x-goog-api-key`; no se almacena la clave en frontend.
- Test real: **pendiente**, necesita API Key privada y despliegue en tu Netlify.
- Salud de API: `/api/health` comprueba configuración, **no demuestra que Gemini respondió**.
- Diagnóstico manual: `Configuración → Probar conexión Gemini` confirma la respuesta con `mode = gemini`, `aiStatus = verified_response` y tokens.
- Fallback seguro: se conserva la búsqueda documental SIGRED cuando Gemini no responde.
- Antes de presentar a DTI: guardar evidencia del botón indicando éxito real y una respuesta de consulta compleja.
