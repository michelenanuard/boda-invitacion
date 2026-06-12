# Live Messages Flow

## Fuente Oficial

La key oficial de mensajes es:

```ts
wedding-guest-messages
```

Toda lectura y escritura pasa por `src/services/guestMessagesService.ts`.

La key anterior `wedding-live-messages` se migra automaticamente a la key oficial y luego se limpia si la migracion fue segura.

## Flujo Completo

1. El invitado abre `/mensajes`.
2. `GuestMessagesPage` valida nombre y mensaje.
3. `saveGuestMessage()` crea:
   - `id` unico con `crypto.randomUUID()` o fallback.
   - `createdAt` como ISO string.
   - `approved` segun configuracion de moderacion.
   - `status` compatible con el admin.
4. El servicio normaliza, elimina duplicados y guarda en `localStorage`.
5. El servicio emite `guest-messages-updated`.
6. La pantalla `/pantalla-mensajes` escucha con `useGuestMessages()`.
7. Los mensajes visibles entran a la cola visual y se animan.

## Sincronizacion

La sincronizacion tiene cuatro capas:

- `CustomEvent("guest-messages-updated")` para la misma pestaña.
- `storage` para otras pestañas del mismo navegador/origen.
- `BroadcastChannel` como canal adicional entre pestañas.
- Polling fallback cada 2 segundos.

El hook tambien refresca al recuperar foco o visibilidad.

## Filtros De Visibilidad

La pantalla muestra mensajes cuando:

```ts
message.approved !== false &&
message.status !== "hidden" &&
message.status !== "pending"
```

Esto evita que mensajes antiguos sin `approved` o `status` queden invisibles. Si la moderacion esta activa, los mensajes nuevos quedan `pending` y deben aprobarse desde `/admin/live-messages`.

## JSON Corrupto

Si `localStorage` contiene JSON invalido:

1. El valor corrupto se respalda en:
   `wedding-guest-messages-corrupted-backup-[timestamp]`
2. Se limpia la key principal.
3. La app sigue funcionando con una lista vacia.

## Utilidades En Desarrollo

Solo en `import.meta.env.DEV`:

```js
window.__addTestGuestMessage()
window.__resetGuestMessages()
```

## Prueba Con Dos Pestañas

1. Abre `/pantalla-mensajes` en una pestaña.
2. Abre `/mensajes` en otra pestaña del mismo navegador.
3. Envia un mensaje.
4. Debe aparecer en la pantalla sin refrescar.

## Si No Aparecen Mensajes

1. Revisa si la moderacion esta activa en `/admin/live-messages`.
2. Si esta activa, aprueba los mensajes pendientes.
3. En consola ejecuta:

```js
localStorage.getItem("wedding-guest-messages")
```

4. En desarrollo, prueba:

```js
window.__addTestGuestMessage()
```

5. Para limpiar cache de mensajes en desarrollo:

```js
window.__resetGuestMessages()
```

## Service Worker Y Cache

No se encontro `serviceWorker`, `registerSW`, `vite-plugin-pwa` ni manifest PWA en el proyecto. El problema no viene de un service worker.

## Backend Realtime Futuro

Para invitados desde celulares distintos y una computadora proyectando, `localStorage` no es suficiente porque no sincroniza entre dispositivos. El siguiente paso recomendado es reemplazar el servicio por:

- Supabase Realtime + Supabase Storage para fotos.
- Firebase Firestore `onSnapshot` + Firebase Storage.

La UI y el hook pueden mantenerse; solo cambia la implementacion del servicio.
