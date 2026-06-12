# Diagnostico Supabase para mensajes en vivo

Usa esta guia si al enviar desde `/mensajes` no aparece una fila nueva en `public.guest_messages`.

## Senal principal

Abre la consola del navegador y envia un mensaje. Los logs relevantes tienen prefijo:

```text
[SupabaseMessages]
```

Si Supabase no esta configurado, veras:

```text
[SupabaseMessages] Supabase no configurado
```

## Causas comunes

### A. Variables no configuradas en Netlify

En Netlify deben existir:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Si faltan, Vite genera un build sin cliente Supabase y el insert no puede llegar a la tabla.

### B. Variables sin prefijo `VITE_`

Estas variables no sirven para frontend Vite:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
REACT_APP_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_URL
```

Usa exactamente:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### C. No se hizo nuevo deploy despues de agregar variables

Las variables `VITE_*` se incrustan durante `npm run build`. Despues de agregarlas en Netlify, haz un nuevo deploy.

### D. RLS sin policy de insert

Si la consola muestra `row-level security policy`, crea una policy de insert para `anon`:

```sql
create policy "Anyone can create guest messages"
on public.guest_messages
for insert
to anon
with check (
  length(trim(name)) > 0
  and length(trim(message)) > 0
);
```

### E. Tabla mal nombrada

El codigo inserta en:

```text
public.guest_messages
```

Si la tabla se llama distinto o esta en otro schema, Supabase devolvera `relation does not exist`.

### F. Proyecto Supabase equivocado

Confirma que `VITE_SUPABASE_URL` corresponde al mismo proyecto donde estas mirando Table Editor.

### G. Anon key incorrecta

Si ves `invalid API key` o errores JWT, copia de nuevo la `anon public key` desde Supabase Project Settings > API.

### H. CORS o conexion fallida

Si ves `failed to fetch`, revisa:

- URL del proyecto.
- Conexion del navegador.
- Bloqueadores/extensiones.
- Estado del proyecto Supabase.

### I. El formulario sigue usando localStorage

En produccion no debe reportar exito si Supabase no esta configurado. El fallback `localStorage` solo se usa en desarrollo local.

## Prueba directa desde consola

En desarrollo ejecuta:

```js
await window.__testSupabaseInsert()
```

Debe devolver el mensaje guardado y crear una fila real en `public.guest_messages`.

## Confirmar en Supabase Table Editor

1. Abre Supabase.
2. Entra al proyecto correcto.
3. Ve a Table Editor.
4. Abre `guest_messages`.
5. Ordena por `created_at` descendente.
6. Verifica que aparezca una fila con el `name` y `message` enviados.
