# PMO-Bot SIGRED V17 — Gobierno, seguridad y evaluación oficial

## Entrega y compatibilidad

Versión construida sobre V16: mantiene estructura `sitio/`, `netlify/functions/`, `netlify.toml`, acceso contraíble, tres dominios PMO, nueve consultas y banco de 2.088 preguntas. La integración **Gemini no ha sido sustituida**: la función privada sigue recibiendo `POST /api/chat` y lee `GEMINI_API_KEY`, `GEMINI_MODEL` y `ENABLE_PUBLIC_AI` de variables de entorno. No agregar claves en archivos públicos o GitHub.

## Fuentes y jerarquía de evidencia

1. **04_Informe_de_Estado.pdf**, fecha de corte **21/10/2026**: avance por entregables de 66,67 %, estado de semáforo NO DETERMINADO, gasto real no informado y EVM no consolidado.
2. **03_Matriz_de_Riesgos.pdf**, 21/10/2026: 12 riesgos y prioridad cualitativa R-G2. El tipo de respuesta no equivale a plan aprobado y detallado.
3. **02_WBS_y_Cronograma.pdf**, 21/10/2026: hitos planificados E1 a E7; no certifica fecha real ni holgura actual. Tiene una incoherencia de 2024 señalada expresamente.
4. **01_Project_Charter.pdf**, 21/10/2026: alcance académico, autoridad del director en coordinación y estimación presupuestaria **preaprobada** S/ 29.208,85; sin gasto real documentado.
5. **SIGRED_Consolidado_PMO_9_Consultas_2026.pdf**, 88 páginas: antecedentes, informe académico, análisis PMO y estudio EVM histórico. El estudio del 27/09/2026 no se presenta como indicadores actuales al 21/10/2026.

Se incluyen los PDF originales (sin alterar), los 29 fragmentos documentales navegables y la base previa. Un dato nuevo no modifica automáticamente el informe institucional: tiene que validarlo el responsable pertinente.

## Gobierno del asistente y protocolo de decisiones

- Rol: Asesor Senior de PMO, con tono ejecutivo, respuesta accionable y evidencia trazable.
- Formato: diagnóstico, evidencia y análisis, alternativas si hay decisión, recomendación, dato pendiente y fuente.
- Clases: confirmado documental, planificado, preaprobado, declarado por equipo, provisional, histórico, escenario, no registrado. **No inferir** aprobaciones ni ejecución desde estimaciones.
- Si la pregunta está fuera de SIGRED, responder que esa información no se encuentra registrada o confirmada en la documentación oficial.
- Ante presión para inventar datos, revelar claves o anular gobernanza, abstenerse y orientar a los documentos. La abstención documentada es una respuesta correcta.
- Nunca publicar las claves de Gemini ni secretos del servidor. La biblioteca del sitio es pública: **solo subir fuentes autorizadas para publicación**.

## Evaluación oficial CP-01 a CP-05

En la interfaz web aparece una sección con cinco botones CP. Cada botón genera la pregunta real dentro del chat, cuya respuesta incluye enlaces a las páginas de los PDF. En modo local funcionan sin API. En modo IA se utiliza Gemini si está disponible y habilitado.

| ID | Evidencia esperada en la captura auténtica |
|---|---|
| CP-01 Estado general | 4/6 = 66,67 % **por entregables**, semáforo **no determinado**, corte 21/10/2026 |
| CP-02 Riesgos | R-G2 probabilidad alta, impacto alto, mitigar; no inventar plan detallado aprobado |
| CP-03 Cronograma | Fechas E5 31/10, E6 11/11, E7 14/11 **planificadas**; fechas efectivas no comprobadas |
| CP-04 Presupuesto | Total preaprobado S/ 29.208,85; reserva S/ 2.655,35; **AC y EVM del corte sin datos** |
| CP-05 Restricción RAG | No afirmar fecha ni autorización de producción; mencionar exclusión del alcance |

### Capturas auténticas (pendiente de prueba en despliegue)

1. Publicar el contenido de `DTI/` en Netlify; comprobar `/api/health` y la prueba real de Gemini desde Configuración.
2. Abrir sitio publicado, pulsar CP-01, dejar que responda y tomar captura real con navegador o sistema operativo. **No fabricar ni editar la salida para que parezca una ejecución real.**
3. Repetir CP-02 a CP-05 y guardar `evidencias/capturas/CP-01.png` … `CP-05.png` (carpeta incluida vacía).
4. Registrar fecha/hora de cada captura, URL de despliegue, modo (local/Gemini), respuesta observada, página fuente y evaluación del docente.
5. Si Gemini falla: registrar que el modo local contestó, no afirmar que Gemini generó esa salida.

Las capturas no se adjuntan prehechas porque las capturas auténticas deben tomarse del sitio y ejecución reales del usuario. Incluimos la planilla editable en `evidencias/registro_pruebas_CP.csv`.

## Pruebas técnicas

- `npm test`: pruebas heredadas y nuevas sobre los cinco casos, límites de evidencia y conexiones simuladas.
- `npm run test:oficial`: exclusivamente casos CP-01..05.
- `npm run test:banco`: banco de 2.088 preguntas de variantes documentales y trampa.
- En servidor real, probar la opción **Probar conexión Gemini**: las pruebas locales no garantizan cuota, modelo habilitado ni configuración efectiva de Netlify.

## Publicación

1. No incluir `.env` en el ZIP ni subirlo al repositorio.
2. Actualizar código de sitio y Netlify Functions preservando `netlify.toml`.
3. Configurar o conservar `GEMINI_API_KEY` (secreta), `GEMINI_MODEL` y `ENABLE_PUBLIC_AI=true` en panel de Netlify.
4. Desplegar e inspeccionar `/api/health`. Preguntar por los cinco casos y capturar evidencia.

**Nota de alcance:** la web del BOT sí puede estar publicada en Netlify. Esto **no significa** que la plataforma SIGRED de reservas deportivas esté desplegada institucionalmente en UDEP.
