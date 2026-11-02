/** Configuración PÚBLICA: URL del backend; nunca escribas tu Gemini API Key aquí. */
window.SIGRED_CONFIG = Object.freeze({
  projectName: 'PMO-Bot SIGRED',
  apiBaseUrl: '', // No es una API Key.
  netlifyFunctions: true, // /api/chat y /api/health viven en ESTE MISMO DOMINIO.
  whatsappNumber: '', // Opcional. Número del equipo con código internacional, sin +.
  knowledgeCutoff: '01/11/2026', // Informes integrados; indicadores históricos conservan su corte.
  preferAI: true // IA automática si el backend está disponible; respaldo local si no.
});
