# SIGRED V10 · PMO-Bot con Gemini y documentación final consolidada

**Universidad de Piura – Campus Piura · DTI · Grupo 09 · 1 de noviembre de 2026**

Este proyecto contiene una web pública independiente de Voiceflow, con un servidor de IA implementado como **Netlify Function**, historial privado por navegador, botones permanentes, tarjetas y una biblioteca documental de consulta. El código está preparado para GitHub conectado a Netlify; **no requiere Render ni Python para desplegarse**.

## Autoridad y alcance de los datos

El informe principal es `sitio/documentos/SIGRED_Informe_Final_Consolidado_2026.pdf` (80 páginas). El fichero `sitio/documentos/SIGRED_PMO_Semaforo_Calculable_2026.xlsx` es un tablero académico editado por el equipo. Se han eliminado del sitio los antiguos informes originales/compilaciones que podían provocar respuestas inconsistentes.

**No afirmar que SIGRED funciona en producción institucional.** El alcance acreditado es prototipo navegable y validación controlada; la transición a operación institucional es propuesta. Las puntuaciones PMO-R01 a R05 son simulaciones y el semáforo institucional NO EVALUABLE no debe confundirse con el resultado positivo de las tareas de usabilidad.

## Contenido

| Ruta | Función |
|---|---|
| `sitio/index.html` | Interfaz estilo ChatGPT, nuevo chat, conversaciones, tarjetas y menú del grupo |
| `sitio/assets/app.mjs` | UI, memoria del navegador, respuestas amables, tablas, imágenes y conversación |
| `sitio/assets/styles.css` | Diseño profesional responsive y ocho botones permanentes |
| `sitio/data/knowledge.json` | 108 fichas y extractos alineados al informe final |
| `sitio/data/questions_locales_1200.json` | 1 620 formulaciones vinculadas a fichas, no hechos nuevos |
| `sitio/data/master_index.json` | 307 fragmentos citables de las 80 páginas |
| `sitio/media/final_figura_*.webp` | 22 figuras extraídas y recortadas del Word original |
| `sitio/media/final_p*.webp` | Previsualizaciones del PDF original por página |
| `sitio/media/semaforo_academico_v10.svg` | Comparación verificada del prototipo frente a producción |
| `netlify/functions/chat.mjs` | Gemini API segura + evidencia documental + respaldo local |
| `netlify/functions/health.mjs` | Diagnóstico de configuración sin exponer el secreto |
| `netlify.toml` | Directorio de publicación y Functions |
| `pruebas/actual-v10.test.mjs` | Batería automatizada de regresión de la V10 |
| `GUIA_ACTUALIZACION_V10.md` | Despliegue paso a paso en GitHub y Netlify |

## Conexión a Gemini

Las variables deben estar configuradas en **Netlify → Project configuration → Environment variables**. No copies la API Key en archivos públicos.

- `GEMINI_API_KEY`: clave secreta, habilitada para Functions y Production.
- `ENABLE_PUBLIC_AI`: `true`.
- `GEMINI_MODEL`: el modelo previamente probado en tu cuenta (actualmente `gemini-3.5-flash-lite`).
- `MAX_OUTPUT_TOKENS`: `650` para controlar el tamaño de respuesta.

En el chat, engranaje → **Gemini prioritario** → **Probar conexión Gemini**; la respuesta debe indicar que Google respondió de verdad. **Una prueba automatizada con API simulada no acredita una llamada real.**

## Ejecutar y comprobar localmente

Requiere Node.js reciente:

```bash
npm test
npm start
```

Abre la URL indicada por el servidor local (por defecto `http://127.0.0.1:8793`). El modo documental funciona sin la clave; para Gemini real necesitas configurar las variables en Netlify o en un entorno local seguro.

## Seguridad, límites y propiedad

- Las llamadas a Gemini se realizan desde Netlify Functions; la clave nunca sale al navegador.
- El historial permanece en el navegador y no se sincroniza entre dispositivos.
- Los fragmentos documentales sirven como evidencia; el texto recibido del usuario no cambia la política de fuentes.
- Las imágenes son figuras del informe final o derivaciones declaradas; no son pruebas de un despliegue institucional.
- Los modelos gratuitos y el alojamiento tienen límites: no se promete uso infinito ni una nota determinada.
- Los nuevos datos oficiales deben actualizarse primero en las fuentes y después regenerar el índice, no editar respuestas aisladas sin trazabilidad.

## Equipo

**Docente:** Dra. Ing. Rosa Peregrina Gonzales Martínez.
**Grupo 09:** Joe Staly Amaya Huamán, Dany Joel Farfán Moscol, Anthony Javier Palomino Calva, Eli Bernabé Pérez Chinchay y Bianca Gianella Soriano Barrera.
