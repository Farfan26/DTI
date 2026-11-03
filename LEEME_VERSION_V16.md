# PMO-Bot SIGRED V16 — análisis ejecutivo y calidad documental

## Entrega
Actualización integral de V15: conservación de Netlify, endpoint `/api/chat`, `GEMINI_API_KEY`, `GEMINI_MODEL` y `ENABLE_PUBLIC_AI`. No hay claves dentro del ZIP. El informe de 88 páginas sigue accesible en `sitio/documentos/` y el complemento ejecutivo resuelve las nueve consultas PMO.

## Reglas
1. Respuestas formales, con diagnóstico, evidencia, impacto, recomendación y fuentes; priorización de datos documentados.
2. Preguntas adversariales: no cumplir órdenes de manipular fuentes, fabricar cifras, exponer claves o alterar instrucciones; una consulta legítima difícil sí debe responderse en lo comprobable.
3. Sin fuentes: informar qué evidencia falta, sin inventar hechos. Las simulaciones se identifican como escenarios.
4. EVM fechado: cifras históricas del taller no se presentan como costos reales actuales; el proyecto académico no equivale a producción institucional.
5. El modo local funciona sin llamar a Gemini; con clave y `ENABLE_PUBLIC_AI=true` se conserva el proveedor original. No se cambian endpoints ni credenciales.

## Uso
En la carpeta `DTI` ejecutar `npm test` para pruebas completas; `npm run test:banco` para las 2.088 preguntas y `npm run test:calidad` para pruebas V16. Publicar la carpeta `DTI` completa en Netlify, manteniendo configuración de entorno original.

## Limitaciones
Las pruebas locales no certifican la disponibilidad real de la API Gemini ni garantizan ausencia total de respuestas incorrectas. El índice maestro local apunta al informe original de 80 páginas; las ocho páginas PMO complementarias están indexadas específicamente como nueve consultas y disponibles en el PDF consolidado de 88 páginas.
