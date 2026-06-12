# Checklist Netlify + Supabase

Usa esta lista antes de probar mensajes en produccion.

## 1. Variables de entorno

En Netlify entra a:

```text
Project configuration > Environment variables
```

Crea estas variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

No uses nombres sin `VITE_`.

## 2. Nuevo deploy

Despues de crear o cambiar variables, haz un nuevo deploy. Las variables de Vite se leen en tiempo de build.

## 3. Build local

Desde VS Code:

```bash
npm run build
```

Esto genera:

```text
dist
```

## 4. Publicar produccion

```bash
netlify deploy --prod --dir=dist
```

## 5. Confirmar que no estas viendo un deploy viejo

En Netlify:

1. Abre el sitio `anakary-marcos`.
2. Ve a **Deploys**.
3. Confirma que el deploy mas reciente esta publicado.
4. Abre `https://anakary-marcos.netlify.app` en una ventana nueva.

## 6. Probar con consola abierta

1. Abre:

```text
https://anakary-marcos.netlify.app/mensajes
```

2. Abre DevTools > Console.
3. Envia un mensaje.
4. Si falla, busca logs con:

```text
[SupabaseMessages]
```

## 7. Confirmar insert

En Supabase Table Editor:

1. Abre `public.guest_messages`.
2. Ordena por `created_at`.
3. Confirma que aparece una fila nueva.

## 8. Probar pantalla en vivo

1. Laptop/proyector:

```text
https://anakary-marcos.netlify.app/pantalla-mensajes
```

2. Celular:

```text
https://anakary-marcos.netlify.app/mensajes
```

3. Envia un mensaje desde el celular.
4. Debe aparecer en la pantalla sin refrescar.
