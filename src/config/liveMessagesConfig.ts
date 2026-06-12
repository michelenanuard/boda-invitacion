export const LIVE_MESSAGES_CONFIG = {
  // Recomendado para proyector: 3-4 mensajes mantiene lectura clara sin saturar la pantalla.
  maxVisibleMessages: 4,
  // Controla el tiempo base de lectura. Baja este valor para un ritmo más rápido; súbelo para más lectura.
  messageLifeTimeMs: 9000,
  // Entrada más ágil para eventos; súbelo si quieres una aparición más ceremonial.
  entranceDelayMs: 350,
  pollingFallbackMs: 2500,
  queueIntervalMs: 900,
  animationDuration: 0.55,
  exitAnimationDuration: 0.45,
  verticalTravelDuration: 8,
} as const

export function getMessageLifeTime(message: string) {
  if (message.length > 140) return 12000
  if (message.length > 80) return 10000
  return 8500
}
