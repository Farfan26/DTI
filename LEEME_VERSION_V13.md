# SIGRED PMO-Bot V13 · Accesos rápidos contraíbles

## Cambios
- Los 8 accesos rápidos y los 3 dominios PMO de la barra inferior comienzan **ocultos**.
- `Mostrar accesos ⌄` abre el menú y `Ocultar accesos ⌃` lo cierra.
- Al elegir una opción del menú inferior, este se cierra y se procesa la consulta.
- Se libera espacio para el chat en móvil, tablet y PC.
- Botón accesible por teclado con estado `aria-expanded`; los paneles ocultos no reciben foco.
- Las tarjetas del inicio conservan su funcionamiento.

## Gemini intacto
Se conserva íntegro el código de `netlify/functions/`, las configuraciones en `config.js` y los endpoints `/api/chat` y `/api/health`. No se cambian claves ni variables de entorno.

## Publicación
Subir el contenido de la carpeta `DTI` como raíz del repositorio y redesplegar en Netlify. Verificar que `GEMINI_API_KEY` y `ENABLE_PUBLIC_AI=true` ya configurados sigan presentes.
