# PMO-Bot SIGRED V19 — conversación flexible y comprensión de variantes

## Qué se corrigió

- El bot ya no depende de cinco frases exactas: el enrutamiento conversacional normaliza acentos y signos, repeticiones de letras, escritura informal y varios errores comunes.
- Distingue saludos y charla casual, consultas documentales SIGRED y preguntas ajenas al proyecto, incluso cuando el usuario inicia con «hola».
- Las respuestas conversacionales en modo Automático/Gemini se **generan dinámicamente en Gemini** con el historial corto de la conversación, sin encabezados ejecutivos ni citas superfluas.
- Cuando Gemini no está disponible, un repertorio local de cortesía proporciona respuestas diferentes según el contenido y el turno. Son respuestas de respaldo, no aprendizaje automático.
- Las preguntas de SIGRED siguen usando su RAG y las cuatro fuentes oficiales, más el consolidado de 88 páginas. Los casos CP-01 a CP-05 y los límites de seguridad se conservan.
- La API Key sigue exclusivamente en variables del servidor; no hay cambios en `netlify/functions/chat.mjs` ni en la conexión de Netlify.

## Pruebas

Ejecutar `npm test` desde `DTI/`. Contiene la suite V10–V18 y pruebas V19, con corpus de **miles de variaciones** en `pruebas/banco_conversacional_v19.json`. Este banco verifica clasificación, no miles de generaciones reales de la API. Ejecutar solo la parte conversacional: `npm run test:conversacion`.

### Ejemplos

- «ola k tal caussa», «holaaaa brooo q kuentas», «wenas kmo staz» → conversación natural.
- «hola quiero saber el presupuesto de sigreed» → RAG SIGRED, no saludo genérico.
- «hola dime quien es el presidente del Peru» → fuera de alcance sin respuesta política.
- «q tal tu dia hoy» → respuesta amable con Gemini disponible.

## Publicación

1. Subir **el contenido de `DTI/`** al repositorio que Netlify ya despliega (no conservar versiones anteriores duplicadas).
2. Mantener las variables existentes `GEMINI_API_KEY`, `ENABLE_PUBLIC_AI=true` y `GEMINI_MODEL` si ya estaban bien configuradas.
3. Implementar en Netlify y actualizar la página con Ctrl + F5.
4. En Configuración: modo `Automático` o `Gemini prioritario` y botón «Probar conexión Gemini».
5. Comprobar los ejemplos anteriores y capturar las cinco pruebas CP oficiales directamente desde el bot publicado.

**Alcance real del aprendizaje:** Gemini no se reentrena automáticamente con cada conversación. Puede **adaptar su respuesta al historial que recibe** (hasta las últimas intervenciones) y redactar formulaciones nuevas; para aprendizaje duradero haría falta una base de datos y un flujo de actualización validada. No incorporar mensajes no verificados como hechos del proyecto.
