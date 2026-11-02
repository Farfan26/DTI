# VERSIÓN DEFINITIVA PMO-BOT SIGRED — LISTA PARA PRESENTAR

Edición V6 del proyecto de chatbot que conserva la interfaz V5 y añade identidad SIGRED propuesta, sello UDEP suministrado por el equipo, tipografía y tarjetas refinadas, 1.280 preguntas reformuladas ligadas a 40 fichas oficiales, pruebas automatizadas y dossier académico.

**El prototipo de código es complementario:** la consigna de DTI evalúa una solución No-Code. Para cumplirla se debe mostrar el agente Voiceflow independiente ya publicado, sus prompts, flujos y evidencia real. No sustituir capturas de Voiceflow por capturas de este sitio.

- Inicio local sin API: `npm start` y visitar http://localhost:8787.
- Pruebas: `npm test` y `node --test pruebas/banco_1200.test.mjs`.
- Con IA: copiar `backend/.env.example` a `backend/.env`, añadir GEMINI_API_KEY, ejecutar `npm run dev`. Esta prueba requiere cuenta/cuota Gemini válida.
- Para publicar: subir el código a GitHub **SIN** `.env`; servir `sitio/` como carpeta estática; ejecutar `backend/server.mjs` en un servidor Node.js con HTTPS y configurar `ALLOWED_ORIGINS`; poner URL pública del backend en `sitio/config.js`.
- `GEMINI_MODEL=gemini-3.5-flash-lite` por defecto. Validar su disponibilidad con la clave y cuota de tu proyecto.
- `ENABLE_IMAGE_GENERATION=false`: imágenes de IA desactivadas por posibles costos; gráficos locales funcionan sin Gemini.
- 1280 preguntas corresponden a **reformulaciones verificables de 40 fichas**, no a 1280 datos ni a 1280 pruebas manuales independientes.
- Memoria: 30 chats y 80 mensajes por chat en navegador. No sincroniza usuarios ni dispositivos.

**Logos:** SIGRED utiliza el logo auténtico compartido por el equipo; el escudo UDEP procede de la imagen aportada previamente. No afirmar autorización institucional que no haya sido verificada.
