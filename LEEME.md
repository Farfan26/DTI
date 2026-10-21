# PMO-Bot SIGRED · Grupo 9

**Trabajo:** CREACIÓN DE UN BOT ASISTENTE DE PMO (No-Code)  
**Curso:** Dirección de tecnologías de información  
**Docente:** Dra.Ing. Rosa Peregrina Gonzales Martinez  
**Universidad:** Universidad de Piura

Este sitio mejora la presentación de la página anterior y **conserva la integración con el bot real de Voiceflow**. No crea un chatbot ficticio ni almacena claves privadas en el código.

## Archivos

```text
PMO_Bot_SIGRED_Pro/
├── index.html            Estructura, textos, portada y tarjetas
├── styles.css            Colores, tipografía, animaciones y diseño responsive
├── app.js                Integración Voiceflow, tarjetas, vista ampliada y carrusel
├── assets/
│   └── favicon.svg       Ícono de pestaña
└── LEEME.md              Guía para configurar y publicar
```

## Cómo verlo y publicarlo

1. Descomprime el archivo ZIP y mantén **todos los archivos en la misma estructura**.
2. Para previsualizarlo, abre `index.html` en el navegador con Internet; para pruebas más fiables, inicia un servidor local como Live Server desde VS Code.
3. Publica tu agente en el entorno **Production** desde Voiceflow.
4. En Voiceflow, revisa la integración de **Web Chat / Widget**, los permisos de dominio y la configuración del agente.
5. Publica esta carpeta en tu alojamiento (por ejemplo, Netlify Drop o un repositorio GitHub enlazado a Netlify). **Sube el contenido de la carpeta completa**, no el ZIP sin extraer, si tu proveedor no admite ZIP.
6. Abre la web publicada en PC y celular. Comprueba que el chat responde con tus fuentes oficiales.

## Configuración del bot

En `app.js`, al inicio, están estas variables:

```js
const VOICEFLOW = Object.freeze({
  projectID: '6ad8ff67b70fcc45e0aa5ccb',
  runtimeURL: 'https://general-runtime.voiceflow.com',
  versionID: 'production',
  widgetURL: 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
});
```

- `projectID`: ya configurado con el ID del bot del proyecto anterior. No cambies este valor salvo que Voiceflow te dé otro ID.
- `versionID`: se conserva `production` para la versión publicada.
- `render.mode: 'embedded'`: permite que el bot ocupe la zona central grande en lugar de aparecer solo como una burbuja pequeña.
- El chatbot requiere conexión a Internet. No es posible certificar su respuesta desde una vista local sin acceder a tu agente y sus documentos.
- Si el bot no carga, usa «Reintentar conexión», comprueba el permiso de dominio y la publicación Production.

## Interacciones

- Las cuatro tarjetas temáticas **envían consultas** usando `voiceflow.chat.interact()` cuando el widget está listo. Si no lo está, intentan copiar la pregunta para pegarla manualmente.
- El botón de ampliar expande el panel del chat y se puede cerrar con `Esc`, sin reiniciar la sesión.
- En celulares, las cinco tarjetas del equipo se deslizan con el dedo o con flechas; no llevan enlaces externos.
- «¿Cómo funciona?» abre un desplegable con indicaciones.
- Se respetan preferencias del sistema para reducir animaciones y se incluyen etiquetas de accesibilidad.

## Cómo cambiar contenido

- **Integrantes / docente / título:** edítalos directamente en `index.html` (sección `#equipo` y portada).
- **Consultas rápidas:** edita el atributo `data-question` de cada tarjeta en `index.html`.
- **Colores:** edita las variables `:root` al inicio de `styles.css`.
- **Tamaño del chat:** modifica `.chat-area` en `styles.css` y sus media queries.
- **Comportamiento de Voiceflow:** ajusta el agente en Voiceflow; la página web es solo la interfaz de presentación.

## Alcance y privacidad

Los nombres provienen de la lista facilitada para este trabajo. La página **no incluye** enlaces de Canvas ni datos privados, IDs de alumnos o credenciales. El estado visual «Interfaz de chat cargada» solo indica que el widget se insertó correctamente: **no garantiza** que la base de conocimientos esté publicada o que una respuesta específica sea correcta. Validar el agente en producción es un paso necesario antes de la exposición.
