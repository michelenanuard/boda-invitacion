# Personalizacion

Toda la data principal de la landing vive en:

```text
src/data/weddingData.ts
```

Ese archivo debe ser el primer lugar a revisar cuando quieras cambiar contenido visible de la invitacion.

## Datos principales

En `src/data/weddingData.ts` edita:

- Nombres de la pareja.
- Fecha de la boda.
- Hora de la ceremonia y de la celebracion.
- Lugares del evento.
- Direcciones y links de mapas.
- Textos principales de la invitacion.

## Lugares y mapas

Actualiza los datos de ceremonia, recepcion o cualquier punto importante:

- Nombre del lugar.
- Direccion.
- Hora.
- Link de Google Maps, Waze u otro servicio de mapas.

Verifica los links antes de publicar para confirmar que abren la ubicacion correcta.

## Galeria

Para cambiar la galeria:

1. Agrega o reemplaza las imagenes del proyecto.
2. Actualiza la lista de imagenes en `src/data/weddingData.ts`.
3. Usa nombres claros y archivos optimizados para web.

Si una imagen se importa desde codigo, normalmente debe estar en `src/assets/`. Si se referencia por URL publica, puede estar en `public/`.

## Textos, FAQ y testimonios

Edita en `src/data/weddingData.ts`:

- Mensajes de bienvenida.
- Descripciones de secciones.
- Preguntas frecuentes.
- Respuestas de FAQ.
- Testimonios o frases destacadas.

Manten los textos breves para que se lean bien en celular.

## RSVP

Revisa la configuracion de RSVP en `src/data/weddingData.ts`:

- Titulo del formulario.
- Descripcion.
- Mensaje de exito.
- Texto del boton.
- Opciones de asistencia.

Si cambias nombres de campos en el codigo del formulario visible, actualiza tambien el formulario oculto de `index.html`. Netlify Forms lo usa para detectar el formulario durante el deploy.

## Colores y estilo

Los colores pueden estar definidos en la data, en estilos CSS o en clases del proyecto. Para ajustar la identidad visual:

- Busca valores de color en `src/data/weddingData.ts`.
- Revisa los archivos CSS si el color no esta en la data.
- Manten buen contraste entre texto y fondo.
- Prueba los cambios en desktop y celular.

## Checklist antes de publicar

- Nombres correctos.
- Fecha y hora correctas.
- Lugares y direcciones revisadas.
- Links de mapas funcionando.
- Galeria actualizada.
- FAQ completa.
- RSVP probado.
- Colores legibles.
- Build generado con `npm run build`.
