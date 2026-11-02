# GUÍA 03 · Editar y mantener la información SIGRED

**Corte documental original: 21/10/2026.** No se actualiza solo. Asegúrate de verificar el estado del proyecto antes de una exposición.

## Dónde se edita
- `sitio/data/knowledge.json` contiene el catálogo de fichas (`records`) y sus fuentes (`sources`).
- `sitio/documentos/` contiene los cuatro PDF legibles desde el sitio.
- `sitio/data/knowledge.js` es una copia de la base para navegadores sin backend.

Cada ficha tiene `id` único, `topic`, `title`, `answer`, `terms`, `source`, `page` y `labels`. `source` debe referirse a una clave de `sources`, y `page` debe señalar una página real del PDF.

## Actualizar un dato
1. Contrasta el dato con un archivo oficial actualizado, y conserva su fecha de corte.
2. Edita la ficha en `knowledge.json` (por ejemplo `estado-resumen`).
3. Si corresponde, reemplaza el PDF en `sitio/documentos/` por la nueva versión autorizada.
4. Ejecuta desde la raíz: `python herramientas/sincronizar_conocimiento.py` para regenerar `knowledge.js`.
5. Corre las pruebas con `npm test` y valida con preguntas sencillas en el navegador.
6. Publica los cambios. Recuerda revisar el año y las fechas del encabezado de la web, el texto de bienvenida y las guías si cambia el corte documental.

## Precisión académica
- 4/6 = 66.67 % es conteo de entregables, no valor ganado.
- Presupuesto estimado S/ 26,553.50 + reserva S/ 2,655.35 = S/ 29,208.85 total preaprobado. No equivale a costo ejecutado.
- No se puede calcular CPI/SPI sin EV, AC y PV debidamente determinados.
- Semáforo formal no confirmado; no inventar Verde/Amarillo/Rojo.
- E5 31/10, E6 11/11, E7 14/11/2026 son fechas PLANIFICADAS en el cronograma original; no certifican entregas efectivas.
- Riesgo R-G2: probabilidad alta, impacto alto, responsable Franklin Olano Medina, tipo de respuesta mitigar; el plan detallado no está acreditado.

## ¿Puedo añadir un PDF y que el bot lo lea solo?
**No en esta edición.** Es una base documental curada e indexada por fichas, no un sistema de ingestión automática de PDF ni un vector DB. Para incorporar información nueva, extrae y verifica fragmentos, añade fichas referenciadas y actualiza los PDF. Es una elección deliberada para evitar respuestas no contrastadas y mantener una alternativa sin cuotas.
