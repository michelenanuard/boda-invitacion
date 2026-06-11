# Mensajes en vivo

La experiencia de mensajes en vivo tiene tres rutas:

- `/mensajes`: formulario público para invitados.
- `/pantalla-mensajes`: pantalla para proyección.
- `/admin/live-messages`: configuración y moderación.

## Almacenamiento actual

Los mensajes se guardan temporalmente en `localStorage` con el servicio `src/services/liveMessagesService.ts`.

También existe `src/services/guestMessagesService.ts` como alias semántico para el formulario público y futuras integraciones.

Cada mensaje tiene:

- `id`
- `name`
- `message`
- `photo`
- `createdAt`
- `status`

## Actualización sin refrescar

El servicio emite un evento custom cuando se guarda un mensaje y escucha:

- `storage`, para cambios entre pestañas.
- `wedding-live-messages-updated`, para cambios en la misma pestaña.
- `BroadcastChannel`, cuando está disponible.
- polling ligero como respaldo.

El polling se configura en `src/config/liveMessagesConfig.ts`.

## Animación

La pantalla usa `framer-motion`:

- `AnimatePresence`
- `motion.article`
- `layout`
- `initial`
- `animate`
- `exit`
- `transition`

Los mensajes entran con fade-in y movimiento hacia arriba, suben lentamente durante su tiempo visible y salen con fade-out.

## Configuración

Edita `src/config/liveMessagesConfig.ts`:

```ts
LIVE_MESSAGES_CONFIG = {
  maxVisibleMessages: 4,
  messageLifeTimeMs: 12000,
  entranceDelayMs: 600,
  pollingFallbackMs: 3000,
  queueIntervalMs: 900,
  animationDuration: 0.8,
}
```

El tiempo de permanencia también puede cambiarse desde `/admin/live-messages` en segundos.

## Cómo probar

1. Abre `/pantalla-mensajes` en una pestaña.
2. Abre `/mensajes` en otra pestaña.
3. Envía un mensaje.
4. El mensaje debe aparecer en la pantalla sin refrescar.
5. Espera el tiempo configurado.
6. El mensaje debe subir y desaparecer.

## Futuro Supabase/Firebase

Para producción real con invitados desde distintos teléfonos, reemplaza el almacenamiento local por:

- Supabase Realtime + Supabase Storage para fotos.
- Firebase Firestore `onSnapshot` + Firebase Storage.

La UI puede mantenerse igual; solo cambia el servicio de mensajes.
