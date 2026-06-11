# Deploy en Netlify

Guia rapida para publicar la landing de boda usando Netlify Drop.

## 1. Compilar el proyecto

Desde la raiz del proyecto ejecuta:

```bash
npm run build
```

Esto genera la carpeta:

```text
dist
```

Esa es la carpeta que se publica.

## 2. Subir a Netlify Drop

1. Abre Netlify Drop: `https://app.netlify.com/drop`.
2. Arrastra la carpeta `dist` al area de subida.
3. Espera a que Netlify termine el deploy.
4. Revisa la URL temporal que Netlify genera.

No subas `src`, `node_modules` ni el proyecto completo. Para este flujo manual, sube solo `dist`.

## 3. Netlify Forms

Si el RSVP usa Netlify Forms, el formulario debe estar incluido en el HTML final y tener atributos compatibles con Netlify:

```html
<form name="rsvp" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="rsvp" />
</form>
```

Notas importantes:

- `data-netlify="true"` permite que Netlify detecte el formulario.
- `name` identifica el formulario en Netlify.
- El campo oculto `form-name` debe coincidir con el nombre del formulario.
- Como esta app renderiza React en el cliente, `index.html` incluye un formulario oculto `rsvp` con los mismos nombres de campos del formulario visible.
- El formulario visible envia los datos en formato `application/x-www-form-urlencoded`, compatible con Netlify Forms para envios desde JavaScript.
- Si hay mas de un formulario, cada uno debe tener un `name` diferente.
- Despues del deploy, revisa las submissions desde el panel de Netlify.

## 4. Dominio personalizado

Cuando la landing ya este revisada:

1. Entra al sitio dentro del panel de Netlify.
2. Ve a la seccion de dominios.
3. Agrega el dominio personalizado.
4. Sigue las instrucciones DNS que indique Netlify.
5. Espera la propagacion y verifica HTTPS.

## 5. Actualizar el sitio

Cada vez que cambies contenido:

1. Ejecuta `npm run build`.
2. Sube de nuevo la carpeta `dist` a Netlify Drop.
3. Revisa la URL publicada.
