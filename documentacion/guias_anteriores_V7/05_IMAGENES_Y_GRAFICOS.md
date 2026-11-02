# Guía 05 — Imágenes, gráficos y generación opcional con Gemini

## A. Qué puede hacer el bot SIN pagar nada por tokens de imágenes

El sitio incluye cuatro gráficos SVG derivados de los documentos SIGRED:

1. **Presupuesto**: base S/ 26,553.50, contingencia S/ 2,655.35, total planificado S/ 29,208.85 (Project Charter, pág. 2).
2. **Avance**: 4 de 6 entregables = 66.67 % por conteo, que NO representa EVM ni avance físico (Informe de Estado, pág. 1).
3. **Hitos**: E5 31/10/2026, E6 11/11/2026, E7 14/11/2026 como fechas **planificadas** (WBS y Cronograma, pág. 2).
4. **Riesgos**: R-G2 alta/alto y R-T3 media/alto, sin inventar un orden total de riesgos (Matriz, pág. 1).

Además, **nueve imágenes WebP** son vistas renderizadas de las páginas de los cuatro PDF entregados. Los PDF no contienen fotografías incrustadas; por tanto, estas vistas son documentos, NO fotografías externas. Cada imagen lleva un enlace a su documento fuente y página. Se puede abrir y guardar la imagen.

### Preguntas de ejemplo
- «Muéstrame el gráfico del presupuesto».
- «Quiero imágenes de la matriz de riesgos R-G2».
- «Muéstrame las páginas del cronograma».
- «Ver gráficos» (botón en la cabecera).
- «Buscar gráficos y páginas» (debajo del chat).

Se utiliza búsqueda local por términos; NO consulta Google Imágenes ni un buscador de Internet. Si el dato no está documentado, no se improvisa una fotografía.

## B. Generación de ilustraciones con Gemini (opcional, protegida)

**AVISO DE COSTOS:** Google AI Studio puede ofrecer una cuota gratuita para ciertos modelos de texto, pero los modelos de generación de imágenes elegidos pueden no ofrecer Free Tier. Revisa la información oficial de tu proyecto y la facturación antes de activar esta opción. NO existe imagen generativa gratuita infinita garantizada.

### Requisitos
- Alojamiento con Node.js 20.6+ en un backend independiente del navegador.
- API Key de Gemini configurada en variables privadas del servidor.
- Acceso al modelo `gemini-3.1-flash-lite-image` para la cuenta Google AI Studio y facturación si se exige.
- Código `IMAGE_ACCESS_TOKEN` **distinto** de la API Key, de mínimo 16 caracteres, elegido por ti (p. ej., una contraseña aleatoria larga).

### Variables de entorno del backend
```
GEMINI_API_KEY=TU_CLAVE_PRIVADA
GEMINI_MODEL=gemini-3.5-flash-lite
ENABLE_IMAGE_GENERATION=true
GEMINI_IMAGE_MODEL=gemini-3.1-flash-lite-image
IMAGE_ACCESS_TOKEN=TU_CODIGO_PRIVADO_LARGO_Y_UNICO
IMAGE_DAILY_LIMIT=3
```
**No publiques** tu archivo `.env` ni compartas el código de autorización con usuarios desconocidos. Deja `ENABLE_IMAGE_GENERATION=false` mientras solo estés demostrando el bot a la ingeniera si quieres evitar gastos.

### Uso en la interfaz
1. Publica el backend y enlaza su URL desde ⚙ → «Conexión con IA», si frontend y backend están en distintos alojamientos.
2. Comprueba `/api/health`: `imageEnabled: true` solo si hay clave, autorización y activación explícita.
3. Haz clic en «Crear ilustración con Gemini» o escribe «Genera una imagen conceptual de un sistema de reservas deportivas».
4. Escribe la descripción y el **código de autorización** (no la API Key).
5. Confirma. El resultado se muestra dentro de la conversación con la etiqueta «Ilustración conceptual generada mediante Gemini» y se puede guardar.

**El bot nunca debe presentar una ilustración generada como evidencia oficial, fotografía real, prototipo implementado ni medición verificada.** Para gráficos de presupuesto y riesgos utiliza los SVG documentales, no IA generativa.

### Límites y seguridad
- La generación requiere autorización manual por petición.
- Código secreto verificado en el servidor (no en el repositorio ni en LocalStorage).
- 1 imagen simultánea y un máximo configurable de imágenes por día por proceso.
- El contador en memoria se reinicia al reiniciar el servidor: **NO es un límite financiero fiable**. El control real de costos debe gestionarse en Google Cloud / AI Studio y el alojamiento.
- Cuando hay error de cuota, permisos o modelo, vuelve a la galería de gráficos del proyecto.
- El backend no guarda los archivos de imágenes generadas; el usuario puede descargarlos desde su navegador.
- No publiques el backend con clave e imagen activada de forma abierta sin una defensa adicional como autenticación, límites perimetrales y controles de gastos.

Fuentes técnicas: https://ai.google.dev/gemini-api/docs/generate-content/image-generation y https://ai.google.dev/gemini-api/docs/pricing
