# ACTUALIZACIÓN V9.1 — GEMINI COMPROBABLE

**Primero lee `GUIA_GEMINI_REAL_V9_1.md`.** Se añadió un botón `Configuración → Probar conexión Gemini` para verificar la llamada real a Google. El modo documental funciona aunque Gemini no esté configurado. La prueba real exige configurar tu clave en Netlify.

---

# PMO-Bot SIGRED V9 — Botones permanentes y estilo profesional

**NOVEDADES:** una barra de 8 accesos rápidos que no desaparece al enviar mensajes o cambiar de conversación; tarjetas multicolor, tipografía mejorada, versión celular con desplazamiento horizontal y opción «Ver todas». Conserva los 105 folios documentales, Gemini por Netlify Functions, historial y nombres del Grupo 09.

**Para actualizar la V8 publicada sin volver a subir documentos**, descarga `G9_SIGRED_V9_ACTUALIZACION_SOLO_3_ARCHIVOS.zip` y reemplaza los tres archivos `sitio/index.html`, `sitio/assets/app.mjs`, `sitio/assets/styles.css` en el repositorio de GitHub que esté conectado a Netlify. **No borres `netlify/functions` ni `netlify.toml`.**

**Instalación limpia:** descomprime el ZIP completo y sube su contenido (no el ZIP) a la raíz del repositorio GitHub. Netlify usa `publish = sitio` y `functions = netlify/functions` en `netlify.toml`. `GEMINI_API_KEY` solo se configura como secreto en Netlify.

**Pruebas locales:** `npm test` (46 tests automatizados), `npm start` y abre `http://127.0.0.1:8791/`. No es necesaria ninguna clave para usar el modo documental. La llamada REAL a Gemini requiere configuración del secreto y despliegue; no se ha verificado con la clave del usuario.

**Guía de actualización:** `guias/16_BOTONES_PERMANENTES_V9.md`.

---

# PMO-Bot SIGRED V8 · Documentación de 105 páginas + Gemini + Netlify

**Grupo 09 · Universidad de Piura · DTI · 2026**

Esta versión es la actualización del chatbot independiente de Voiceflow (no sustituye el prototipo no-code para la evaluación DTI). Incluye:

- Chat continuo tipo ChatGPT, **Nuevo chat**, historial, renombrar/eliminar/exportar conversaciones y memoria local.
- Identidad real SIGRED y escudo de la Universidad de Piura.
- Panel superior **«DTI · Grupo 09»** desplegable con la docente y cinco integrantes.
- **8 tarjetas operativas**: estado, riesgos, cronograma, asesoría PMO, gráficos, presupuesto, biblioteca 105 páginas y consulta libre.
- Biblioteca con **documento maestro de 105 páginas**, **285 fragmentos** rastreables por página, **58 fichas** más **1 280 formulaciones de consulta locales**, los cuatro PDF históricos y figuras de los informes.
- Backend seguro con **Netlify Functions** que consulta Gemini 3.5 Flash-Lite por API. No requiere servidor Render ni Python.
- Modo **Documental** sin tokens; modo **Automático** para ahorrar y **Gemini prioritario**.
- Respuestas de respaldo si falta la clave o se supera la cuota; cautelas contra inventar hechos.

## ¡EMPIEZA AQUÍ!

1. Abre `guias/14_GITHUB_NETLIFY_GEMINI_PASO_A_PASO.md`.
2. Sube **la estructura del proyecto COMPLETO**, no solo `sitio`, al repositorio de GitHub. `netlify.toml` debe estar en la raíz del repositorio y `netlify/functions/` al mismo nivel que `sitio/`.
3. Conecta ese repositorio a tu sitio Netlify existente. El proyecto detectará `netlify.toml` y publicará `sitio/` y ambas funciones en `/api/health` y `/api/chat`.
4. Configura en Netlify los secretos `GEMINI_API_KEY` y `ENABLE_PUBLIC_AI=true`. **Nunca en GitHub, HTML, JavaScript público o `netlify.toml`.**
5. Vuelve a desplegar. Comprueba `/api/health` (debe devolver `aiConfigured:true`). Prueba una pregunta en «Gemini prioritario» y confirma el modo.
6. Para evidencias académicas, consulta `guias/15_VALIDACION_Y_EXPOSICION.md`.

## Ubicaciones más importantes

```text
netlify.toml                      Ajuste automático de publicación
netlify/functions/chat.mjs        Gemini + RAG (backend seguro)
netlify/functions/health.mjs      Verificación de conexión (sin revelar clave)
sitio/index.html                  Interfaz web
sitio/assets/styles.css          Diseño y tarjetas responsive
sitio/assets/app.mjs             Nuevo chat, historial, tarjetas, Gemini
sitio/assets/master-search.mjs   Búsqueda documental gratuita
sitio/config.js                  Configuración pública, SIN clave
sitio/documentos/SIGRED_DOCUMENTACION_MAESTRA_2026.pdf
sitio/data/master_index.js       Índice local citando páginas 1–105
sitio/data/master_index.json     Índice auditable de los fragmentos
sitio/data/knowledge.json        58 fichas de referencia
sitio/data/questions_locales_1200.json    1 280 reformulaciones
sitio/data/visuals.json          Galería de gráficos y fuentes
pruebas/v8-netlify.test.mjs      Pruebas de la función y del manual
```

## Comandos de desarrollo (sin credenciales)

- Instala Node.js 22 o superior.
- `npm test` ejecuta las pruebas automatizadas.
- `npm run preview` abre una vista local en `http://127.0.0.1:8789`, con Functions simuladas y **sin Gemini**.
- Para probar Gemini de verdad localmente: crea `.env` privado a partir de `.env.example`, configura la clave, pon `ENABLE_PUBLIC_AI=true`, ejecuta `npm run preview:gemini` y haz una pregunta de análisis en «Gemini prioritario».

**Importante:** el modo local no garantiza comprender toda pregunta compleja; utiliza coincidencias documentales. Gemini sí genera respuestas naturales, pero necesita una clave privada y tiene cuotas. La memoria queda en el navegador actual, no se sincroniza entre personas/dispositivos.

## Límites de evidencia

- El avance 4/6 (66,67 %) corresponde al **corte histórico** del informe de estado, no necesariamente al avance actual al abrir el sitio.
- El coste inicial del Project Charter y el escenario de transición a producción en el Informe Parcial 5 son **presupuestos distintos**.
- Las proyecciones y fichas de cierre de la documentación maestra **no demuestran que la universidad haya aprobado o desplegado SIGRED**.
- Este proyecto con código complementa el chatbot **Voiceflow No-Code**, cuya implementación y capturas deben mostrarse por separado si la rúbrica lo requiere.

No hay pagos habilitados en el código. Activa Gemini solo tras revisar las cuotas de AI Studio y los límites del servicio de alojamiento.
