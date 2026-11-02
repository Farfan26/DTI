# PMO-Bot SIGRED V9.1 — activar y comprobar Gemini REAL

## Qué se corrigió
* El indicador de clave configurada ya no se presenta como conexión verificada.
* Nuevo botón **Configuración → Probar conexión Gemini**; hace UNA llamada real a Google y muestra estado, modelo y tokens informados.
* Los errores de Google se clasifican sin revelar secretos: 401/403 clave, 404 modelo, 429 cuota, timeout, bloqueos y errores de red.
* Cuando Gemini falla, el bot responde con documentación e indica explícitamente que NO fue Gemini.
* Los ocho botones permanentes, memoria y PDF de 105 páginas siguen intactos.

## Netlify — activación
1. Sube el proyecto completo con `netlify.toml` en la raíz del repositorio conectado a Netlify. `sitio/` es el directorio de publicación; `netlify/functions/` debe ir en el repositorio, nunca dentro de `sitio/`. No subas el ZIP comprimido.
2. En **Project configuration → Environment variables** añade `GEMINI_API_KEY` como **Contains secret values**. Su scope debe incluir Functions (o All scopes si tu plan no permite scopes selectivos).
3. Añade `ENABLE_PUBLIC_AI` = `true`, `GEMINI_MODEL` = `gemini-3.5-flash-lite`, `MAX_OUTPUT_TOKENS` = `650`.
4. Genera un nuevo Deploy en Netlify tras editar las variables; espera el estado Published.
5. Abre `/api/health` en la URL de tu sitio. Comprueba `aiConfigured: true`, `keyPresent: true` y `publicAiEnabled: true`. **Esa URL solo comprueba la configuración, no la llamada real**.
6. Abre SIGRED → ⚙ Configuración → **Probar conexión Gemini**. Si dice **Gemini respondió de verdad**, ya está conectada la IA.
7. En Configuración, selecciona **Gemini · priorizar IA** para preguntas libres. En **Automático**, preguntas simples se contestan localmente y no consumen tokens.

## Si falla
* `Falta GEMINI_API_KEY`: crear variable como secreto; revisar scope Functions y redeploy.
* `ENABLE_PUBLIC_AI debe ser true`: crear/editar esta variable a texto `true` y redeploy.
* `401/403`: clave incorrecta, revocada, mal copiada o sin permisos. **No la compartas**.
* `404`: modelo no disponible en tu proyecto; revisa `GEMINI_MODEL`.
* `429`: cuota gratuita agotada; espera al restablecimiento o usa el modo documental.
* `No se encontró /api/health`: Netlify publicó solo `sitio/` sin Functions; revisa estructura y `netlify.toml`.
* Problema de red / timeout: revisa Netlify → Logs → Functions → chat y el servicio de Google.

## Privacidad y costos
No subas `.env` al repositorio, no pongas la API Key en `sitio/config.js`. El endpoint público tiene límite de 12 solicitudes/minuto/IP, pero esto NO equivale a presupuesto máximo ni garantiza cero cobros. Configura límites de cuota del proyecto en Google AI Studio y revisa regularmente el consumo. La memoria local se guarda por navegador, no entre dispositivos.

## Notas de verificación
Los tests automatizados pueden simular una respuesta de Google para comprobar el código; no constituyen prueba de uso de una clave real. La única prueba real es la del botón de diagnóstico tras publicar con una API Key válida.
