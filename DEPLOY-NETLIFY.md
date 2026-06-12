# Deploy en Netlify desde VS Code

Guia para publicar cambios del proyecto en el sitio existente:

```text
https://anakary-marcos.netlify.app
```

## 1. Instalar Netlify CLI

Ejecuta una vez:

```bash
npm install -g netlify-cli
```

Verifica la instalacion:

```bash
netlify --version
```

## 2. Iniciar sesion

```bash
netlify login
```

Se abrira el navegador para autorizar la cuenta de Netlify.

## 3. Vincular este proyecto al sitio existente

Desde la raiz del proyecto:

```bash
netlify link
```

Cuando Netlify pregunte que sitio usar, selecciona el sitio existente:

```text
anakary-marcos
```

Esto crea la carpeta local `.netlify/` con la vinculacion del sitio. No es necesario subir esa carpeta manualmente.

## 4. Compilar

```bash
npm run build
```

El build de Vite genera la carpeta:

```text
dist
```

## 5. Publicar un deploy preview

```bash
netlify deploy --dir=dist
```

Netlify mostrara una URL de preview. Revisala antes de publicar en produccion.

## 6. Publicar en produccion

```bash
netlify deploy --prod --dir=dist
```

Al terminar, revisa:

```text
https://anakary-marcos.netlify.app
```

## 7. Rutas a probar despues del deploy

Abre estas rutas directamente y refresca cada una:

```text
/
/admin
/admin/login
/mensajes
/rsvp
/cualquier-ruta-interna
```

## Configuracion incluida

El archivo `netlify.toml` define:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Tambien existe `public/_redirects` con:

```text
/*    /index.html   200
```

Ambas reglas apuntan al mismo fallback de React Router y no se contradicen.

## Confirmar que el deploy fue exitoso

1. La terminal debe mostrar que el deploy finalizo sin errores.
2. Para produccion, Netlify debe indicar que publico con `--prod`.
3. La URL `https://anakary-marcos.netlify.app` debe cargar la invitacion actualizada.
4. Las rutas internas deben abrir directo sin 404.
5. En Netlify, el panel del sitio debe mostrar el deploy mas reciente como publicado.
