# GUÍA 04 · Pruebas de funcionamiento y limitaciones verificables

## Pruebas automáticas
Abre la terminal de VS Code en la carpeta raíz y ejecuta:
```
npm test
```
Las pruebas incluyen búsqueda documental, contenido de cuatro fuentes, cifras, abstención, respuesta de riesgo individual, verificación de endpoint y respuesta de Gemini SIMULADA (sin acceso a Google).

## Prueba REAL de Gemini (hazla tras guardar tu API Key)
1. Inicia `npm run dev` y comprueba que `/api/health` dice `aiConfigured:true`.
2. Abre el chatbot. Debe mostrar **Gemini conectado**.
3. Pregunta «¿Cuál es el estado de SIGRED y qué datos faltan para calcular CPI?».
4. Verifica que aparece el indicador **Gemini + documentos** en la respuesta. Si no, el backend usó su respaldo local.
5. Pregunta «¿Quién ganó el Mundial de 2022?». Debe abstenerse y no consumir tokens, porque está fuera de la base de SIGRED.
6. En **Asesoría PMO**, prueba desvío, cambio y escalación. Comprueba que separe supuestos y datos confirmados.
7. Prueba en celular y comprueba acceso a cuatro PDF.

## Casos para evaluación académica
- CP-01: avance simple y semáforo no definido.
- CP-02: R-G2 alta/alto, R-T3 media/alto, sin inventar planes detallados.
- CP-03: E5/E6/E7 con fechas planificadas.
- CP-04: presupuesto baseline, reserva y falta de ejecución real.
- CP-05: fuera de alcance, abstención.
- PMO-01: diferencia Fast-Tracking y Crashing sin inventar costo.
- PMO-02: cambio de alcance como simulación, no aprobación institucional.
- PMO-03: disparador de escalación de R-G2 documentado.

## Qué no hace
- No sirve como chatbot Gemini ilimitado. Hay límites del plan de Google y posibles interrupciones del alojamiento.
- No tiene una base de datos transaccional ni usuarios autenticados.
- No consulta Internet ni actualiza el estado real del proyecto.
- No convierte automáticamente nuevos PDF a fichas.
- No sustituye la implementación Voiceflow No-Code si tu asignatura la exige específicamente. Úsalo como alternativa técnica propia, y conserva el proyecto de Voiceflow para evidencias de la rúbrica.

## Seguridad
La clave privada debe permanecer solo en un backend. El sitio publicado no puede ocultar claves incrustadas; **no pegues credenciales en código del navegador**.
