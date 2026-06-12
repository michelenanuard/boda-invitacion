# Supabase Realtime para mensajes en vivo

Esta guia conecta `/mensajes` y `/pantalla-mensajes` a Supabase para que los mensajes enviados desde celulares aparezcan en vivo sin refrescar.

## 1. Crear proyecto en Supabase

1. Entra a `https://supabase.com`.
2. Crea un proyecto nuevo.
3. Espera a que Supabase termine de inicializar la base de datos.

## 2. Crear tabla `guest_messages`

En Supabase, abre **SQL Editor** y ejecuta:

```sql
create table if not exists public.guest_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz default now(),
  approved boolean default true,
  likes integer default 0
);

alter table public.guest_messages enable row level security;

create policy "Anyone can read guest messages"
on public.guest_messages
for select
to anon
using (true);

create policy "Anyone can create guest messages"
on public.guest_messages
for insert
to anon
with check (
  length(trim(name)) > 0
  and length(trim(message)) > 0
);

create policy "Anyone can update guest message moderation"
on public.guest_messages
for update
to anon
using (true)
with check (true);

create policy "Anyone can delete guest messages"
on public.guest_messages
for delete
to anon
using (true);
```

Nota: las politicas de update/delete permiten que el admin temporal modere mensajes desde el frontend. Para una produccion con login real, reemplaza estas politicas por reglas autenticadas.

## 3. Activar Realtime

1. En Supabase, ve a **Database**.
2. Abre **Replication**.
3. Busca la publicacion `supabase_realtime`.
4. Activa la tabla:

```text
guest_messages
```

Si prefieres SQL, ejecuta:

```sql
alter publication supabase_realtime add table public.guest_messages;
```

Si Supabase indica que la tabla ya esta agregada, no necesitas repetirlo.

## 4. Copiar URL y anon key

En Supabase:

1. Ve a **Project Settings**.
2. Abre **API**.
3. Copia:
   - **Project URL**
   - **anon public key**

## 5. Configurar variables locales

Crea un archivo `.env` en la raiz del proyecto:

```bash
VITE_SUPABASE_URL=tu_project_url
VITE_SUPABASE_ANON_KEY=tu_anon_public_key
```

No subas `.env` al repositorio.

## 6. Configurar variables en Netlify

En Netlify:

1. Abre el sitio `anakary-marcos`.
2. Ve a **Site configuration**.
3. Abre **Environment variables**.
4. Agrega:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Guarda los cambios.
6. Vuelve a desplegar el sitio.

## 7. Compilar y publicar

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 8. Probar en local

Con Supabase configurado:

```bash
npm run dev
```

1. Abre `/pantalla-mensajes` en una ventana.
2. Abre `/mensajes` en otra ventana.
3. Envia un mensaje.
4. El mensaje debe aparecer en la pantalla en vivo sin refrescar.

Sin Supabase configurado:

1. Quita temporalmente las variables del `.env`.
2. Ejecuta `npm run dev`.
3. El sistema usa `localStorage` como fallback para desarrollo local.
4. El fallback no sincroniza entre dispositivos reales.

## 9. Probar en Netlify con celular y laptop

1. En la laptop o proyector abre:

```text
https://anakary-marcos.netlify.app/pantalla-mensajes
```

2. En el celular abre:

```text
https://anakary-marcos.netlify.app/mensajes
```

3. Envia un mensaje desde el celular.
4. Debe aparecer en la laptop sin refrescar.

## 10. Logs de desarrollo

En desarrollo veras logs con el prefijo:

```text
[SupabaseMessages]
```

Logs esperados:

- Supabase configurado
- Mensaje insertado
- Realtime recibido
- Error cargando mensajes
- Error insertando mensaje
- Fallback localStorage activo
