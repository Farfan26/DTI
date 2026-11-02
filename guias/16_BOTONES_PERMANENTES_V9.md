# SIGRED V9 — Botones siempre visibles y colores profesionales

## Qué cambió
- La zona «Accesos rápidos» aparece permanentemente sobre la caja de escritura, incluso después de enviar preguntas y recuperar conversaciones anteriores.
- Ocho opciones funcionales: Estado, Riesgos, Hitos, Asesoría PMO, Presupuesto, Biblioteca, Gráficos y Consulta libre.
- PC: rejilla de cuatro columnas; móvil: fila desplazable horizontalmente que no tapa la conversación. «Ver todas» muestra una rejilla expandida de dos columnas.
- Tarjetas de inicio y atajos con colores diferenciados: azul, rosa, ámbar, turquesa, verde y violeta.
- Se preservan la base documental de 105 páginas, Gemini por Netlify Functions, la biblioteca, la memoria y el equipo docente.

## Actualizar sin perder la conexión de Gemini
1. Extrae el ZIP V9. Sube el CONTENIDO de la carpeta a la RAÍZ del repositorio GitHub que ya está conectado a Netlify. No subas el ZIP como archivo único.
2. Deben mantenerse `netlify.toml`, `sitio/`, `netlify/functions/`. Si aparecen estos elementos dentro de una carpeta adicional, subiste un nivel de más.
3. Confirma que Netlify publica `sitio` y utiliza `netlify/functions`.
4. Las variables `GEMINI_API_KEY` (secreto), `ENABLE_PUBLIC_AI=true` y `GEMINI_MODEL` permanecen en Netlify, NO en GitHub.
5. En Netlify → Deploys comprueba el nuevo despliegue. Abre la web con Ctrl+F5.
6. Prueba los ocho atajos antes y después de preguntar algo, cambia de conversación, recarga, prueba el botón «Ver todas» en móvil.
7. Para verificar Gemini selecciona «Gemini prioritario» en Configuración y realiza una pregunta de análisis; el resultado depende de la clave, cuota y despliegue.

## Verificación manual recomendada
En PC y móvil, inicia un chat y pulsa «Estado». Comprueba que la fila «Accesos rápidos» permanece visible. Pulsa «Riesgos», «Hitos» y «Biblioteca» desde el mismo chat. En móvil desplaza la fila y despliega «Ver todas». Durante una respuesta de IA, evita repetir clics hasta que termine.

**No requiere cambiar tu API Key de Gemini.** No existe garantía de disponibilidad/costo ilimitado en planes gratuitos.
