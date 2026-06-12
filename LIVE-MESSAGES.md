# Mensajes en Vivo

La experiencia de mensajes en vivo tiene tres rutas:

- `/mensajes`: formulario público para invitados.
- `/pantalla-mensajes`: pantalla para proyección.
- `/admin/live-messages`: configuración y moderación.

## Almacenamiento Actual

Los mensajes se guardan temporalmente en `localStorage` con el servicio `src/services/liveMessagesService.ts`.

También existe `src/services/guestMessagesService.ts` como alias semántico para el formulario público y futuras integraciones.

Cada mensaje tiene:

- `id`
- `name`
- `message`
- `photo`
- `createdAt`
- `status`

## Actualización Sin Refrescar

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
  messageLifeTimeMs: 9000,
  entranceDelayMs: 350,
  pollingFallbackMs: 2500,
  queueIntervalMs: 900,
  animationDuration: 0.55,
  exitAnimationDuration: 0.45,
  verticalTravelDuration: 8,
}
```

## Ajustes Recomendados Para Proyector

- Permanencia base: 8.5 a 9 segundos para mensajes cortos.
- Mensajes medianos: 10 segundos.
- Mensajes largos: 12 segundos.
- Entrada: 0.45 a 0.65 segundos.
- Salida: 0.35 a 0.55 segundos.
- Cantidad máxima visible: 4 mensajes.

Para hacer la animación más rápida, baja `messageLifeTimeMs`, `verticalTravelDuration` o `animationDuration`.

Para hacerla más lenta y ceremonial, sube `messageLifeTimeMs` o `verticalTravelDuration`.

El tiempo de lectura se controla principalmente desde `messageLifeTimeMs` y la función `getMessageLifeTime()` en `src/config/liveMessagesConfig.ts`.

## Cómo Probar

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
