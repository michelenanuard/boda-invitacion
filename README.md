# Landing de boda

Proyecto de landing page para una invitacion de boda, creado con React, TypeScript y Vite. Incluye secciones para presentar la boda, lugares, galeria, textos informativos, FAQ, testimonios y RSVP.

## Requisitos

- Node.js instalado.
- npm instalado.

Se recomienda usar una version actual de Node.js compatible con Vite.

## Instalacion

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

## Compilar para produccion

Genera los archivos finales:

```bash
npm run build
```

La compilacion queda en la carpeta `dist`.

## Previsualizar la compilacion

Despues de compilar, revisa localmente la version de produccion:

```bash
npm run preview
```

## Personalizar datos

La data principal de la boda vive en:

```text
src/data/weddingData.ts
```

Edita ese archivo para cambiar nombres, fecha, hora, lugares, textos, galeria, preguntas frecuentes, testimonios, RSVP y enlaces de mapas.

El RSVP tambien tiene una plantilla HTML oculta en `index.html` para que Netlify Forms pueda detectarlo al publicar.

## Cambiar imagenes

Usa imagenes optimizadas para web y reemplaza o agrega los archivos en las carpetas de assets del proyecto, por ejemplo:

- `src/assets/` para imagenes importadas desde componentes.
- `public/` para archivos publicos referenciados por ruta directa.

Luego actualiza las referencias correspondientes en el codigo o en `src/data/weddingData.ts`, segun como este configurada cada imagen.

## Deploy en Netlify

Para publicar manualmente:

1. Ejecuta `npm run build`.
2. Sube la carpeta `dist` a Netlify Drop.

No subas el proyecto completo ni `node_modules`; la carpeta correcta para Netlify Drop es `dist`.
