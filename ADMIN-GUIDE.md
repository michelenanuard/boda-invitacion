# Guía del administrador

## Acceso

Abre el sitio en desarrollo y entra a:

```text
/admin/login
```

Credenciales temporales:

```text
usuario: admin
contraseña: boda2026
```

Esta autenticación es solo temporal. Antes de publicar en producción debe reemplazarse por Supabase, Firebase, Netlify Identity, Netlify Functions con sesión segura o una API propia.

## Editar la portada

Entra en **Portada** para cambiar:

- título principal
- mensaje principal
- foto de portada

Guarda con **Guardar cambios**. Luego abre **Ver invitacion** para revisar el resultado publico.

## Editar fecha y lugar

En **Datos generales** puedes modificar nombres, fecha, hora, fecha visible y hashtag.

En **Ceremonia y recepción** puedes modificar lugar, dirección, hora, nota y enlace de Google Maps.

## Editar textos

Los textos largos usan un editor simple con:

- negrita
- cursiva
- título
- alineación de vista previa
- saltos de linea

La vista previa ayuda a revisar el tono antes de guardar.

## Agregar historia

En **Nuestra historia** puedes agregar, duplicar, eliminar y reordenar momentos. Cada bloque permite editar fecha, título, descripción e imagen propia.

## Agregar fotos y video

En **Galería** puedes:

- cambiar la imagen de portada del video
- pegar un enlace compartido de Google Drive
- pegar una URL directa de video MP4
- subir un archivo de video desde el equipo
- editar el texto del video
- agregar, duplicar, eliminar y reordenar fotos
- subir imágenes desde el equipo o pegarlas como URL

Las imágenes y videos subidos desde el equipo se guardan localmente como datos del navegador. Esto es útil para prototipo, pero no reemplaza un almacenamiento real. Para producción se recomienda conectar carga directa a Supabase Storage, Firebase Storage o un bucket propio.

## Proyectar mensajes en vivo

En **Mensajes en vivo** puedes:

- abrir la pantalla de proyección
- abrir el formulario público para invitados
- activar aprobación previa
- aprobar, ocultar o eliminar mensajes
- cambiar cuántos segundos dura cada mensaje en pantalla
- limpiar todos los mensajes

Para la boda, abre `/pantalla-mensajes` en la laptop conectada al proyector y pon el navegador en pantalla completa. Los invitados entran a `/mensajes` para enviar su mensaje.

La versión actual sincroniza mensajes usando el navegador local. Para una celebración real con invitados desde múltiples teléfonos, conecta el módulo a Supabase Realtime, Firebase Firestore o un backend con WebSockets.

## Agregar preguntas frecuentes

En **Preguntas frecuentes** puedes agregar preguntas que los invitados podrían tener sobre vestimenta, parqueo, horarios, acompañantes o confirmación.

## Respaldos

En **Datos generales** estan las opciones:

- **Exportar respaldo**: descarga un archivo JSON con toda la información.
- **Importar respaldo**: carga un respaldo guardado previamente.
- **Restaurar valores por defecto**: vuelve al contenido inicial del proyecto.

Antes de restaurar, el sistema pide confirmación.

## Como se guardan los cambios

Esta primera version guarda todo en el navegador usando `localStorage` con la clave:

```text
wedding-invitation-content
```

Esto permite editar sin backend, pero los cambios viven en ese navegador. Para producción real debe conectarse una base de datos o servicio persistente.

## Antes de publicar en producción

Reemplazar:

- autenticación temporal
- guardado en localStorage
- archivos de imagen/video guardados como base64 local si se desea carga directa

Opciones recomendadas:

- Supabase Auth + Supabase Database + Supabase Storage
- Firebase Auth + Firestore + Firebase Storage
- Netlify Identity + Netlify Blobs/Functions
- API propia con base de datos
