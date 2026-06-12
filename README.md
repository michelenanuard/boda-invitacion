# Landing de boda

Proyecto de landing page para una invitación de boda, creado con React, TypeScript y Vite. Incluye secciones para presentar la boda, lugares, galería, textos informativos, FAQ, testimonios y RSVP.

## Requisitos

- Node.js instalado.
- npm instalado.

Se recomienda usar una versión actual de Node.js compatible con Vite.

## Instalación

Instala las dependencias del proyecto:

```bash
npm install
```

## Desarrollo local

Levanta el servidor de desarrollo:

```bash
npm run dev
```

Abre la URL que muestre la terminal, normalmente `http://localhost:5173`.

## Administrador

La invitación pública vive en:

```text
/
```

El panel administrador vive en:

```text
/admin
```

Pantalla de acceso:

```text
/admin/login
```

Credenciales temporales de desarrollo:

```text
usuario: admin
contraseña: boda2026
```

El administrador permite editar textos, nombres, fecha, ceremonia, recepción, novios, historia, galería, video, testimonios, preguntas frecuentes, contacto, redes sociales y colores principales.

## Mensajes en vivo

El prototipo incluye una experiencia para proyectar mensajes durante la celebración:

```text
/mensajes
```

Formulario público para que los invitados escriban nombre, mensaje y foto opcional.

```text
/pantalla-mensajes
```

Pantalla pensada para abrir en una laptop conectada al proyector o pantalla LED.

```text
/admin/live-messages
```

Panel para moderar mensajes, abrir la pantalla de proyección, abrir el formulario, cambiar duración y activar aprobación previa.

Esta versión usa `localStorage` y `BroadcastChannel`, por lo que funciona para pruebas en pestañas del mismo navegador. Para uso real con invitados desde distintos teléfonos se debe conectar a Supabase Realtime, Firebase Firestore o un backend con WebSockets.

Los cambios se guardan en `localStorage` con la clave:

```text
wedding-invitation-content
```

Si no hay cambios guardados, la web carga los datos por defecto desde `src/data/weddingData.ts`.

Importante: la autenticación y el guardado en `localStorage` son temporales. Antes de producción se debe conectar un backend real como Supabase, Firebase, Netlify Functions/Blobs o una API propia.

## Compilar para producción

Genera los archivos finales:

```bash
npm run build
```

La compilación queda en la carpeta `dist`.

## Previsualizar la compilacion

Después de compilar, revisa localmente la versión de producción:

```bash
npm run preview
```

## Personalizar datos

La data principal de la boda vive en:

```text
src/data/weddingData.ts
```

Edita ese archivo para cambiar nombres, fecha, hora, lugares, textos, galería, preguntas frecuentes, testimonios, RSVP y enlaces de mapas.

También puedes hacerlo desde `/admin` sin tocar código. El archivo `src/data/weddingData.ts` queda como contenido por defecto y respaldo inicial.

Si quieres que los cambios hechos en `/admin` queden dentro del build de Netlify, exporta el respaldo desde **Datos generales** y aplícalo antes de compilar:

```bash
npm run content:apply -- respaldo-invitacion-boda.json
npm run build
```

El RSVP tambien tiene una plantilla HTML oculta en `index.html` para que Netlify Forms pueda detectarlo al publicar.

## Cambiar imágenes

Usa imágenes optimizadas para web. Desde `/admin` puedes pegar una URL o subir una imagen desde el equipo para portada, galería, video e historia.

En esta versión, las imágenes subidas desde el equipo se guardan como datos locales en `localStorage`. Funciona para prototipo y revisión, pero para producción conviene usar almacenamiento real.

Opciones recomendadas para producción:

- Supabase Storage
- Firebase Storage
- Netlify Blobs/Functions
- Un bucket propio conectado a una API

## Cambiar video

En `/admin/galeria` puedes pegar un enlace compartido de Google Drive, una URL directa MP4 o subir un archivo de video desde el equipo. Los videos subidos localmente pueden ocupar demasiado espacio en `localStorage`; para producción se recomienda almacenamiento externo.

## Deploy en Netlify

Para publicar manualmente:

1. Ejecuta `npm run build`.
2. Sube la carpeta `dist` a Netlify Drop.

No subas el proyecto completo ni `node_modules`; la carpeta correcta para Netlify Drop es `dist`.
