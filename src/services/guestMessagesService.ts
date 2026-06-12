import type { RealtimeChannel } from '@supabase/supabase-js'
import { LIVE_MESSAGES_CONFIG } from '../config/liveMessagesConfig'
import { isSupabaseConfigured as hasSupabaseConfig, supabase } from '../lib/supabaseClient'

export type GuestMessageStatus = 'approved' | 'pending' | 'hidden'

export type GuestMessage = {
  id: string
  name: string
  message: string
  createdAt: string
  approved?: boolean
  likes?: number
  photo?: string
  status?: GuestMessageStatus
}

export type GuestMessagesSettings = {
  moderationEnabled: boolean
  displayDurationSeconds: number
}

type MessageInput = {
  name: string
  message: string
  photo?: string
}

type SupabaseGuestMessageRow = {
  id: string
  name: string
  message: string
  created_at: string
  approved: boolean | null
  likes: number | null
}

export const GUEST_MESSAGES_STORAGE_KEY = 'wedding-guest-messages'
export const GUEST_MESSAGES_SETTINGS_KEY = 'wedding-guest-messages-settings'
export const GUEST_MESSAGES_UPDATED_EVENT = 'guest-messages-updated'

const OLD_MESSAGE_STORAGE_KEYS = ['wedding-live-messages']
const OLD_SETTINGS_STORAGE_KEYS = ['wedding-live-messages-settings']
const GUEST_MESSAGES_CHANNEL = 'guest-messages-channel'
const POLLING_FALLBACK_MS = 2000
const SUPABASE_TABLE = 'guest_messages'

const defaultSettings: GuestMessagesSettings = {
  moderationEnabled: false,
  displayDurationSeconds: LIVE_MESSAGES_CONFIG.messageLifeTimeMs / 1000,
}

function logGuestMessages(message: string, data?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[SupabaseMessages] ${message}`, data ?? '')
  }
}

function warnGuestMessages(message: string, error?: unknown) {
  if (import.meta.env.DEV) {
    console.warn(`[SupabaseMessages] ${message}`, error ?? '')
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getChannel() {
  if (typeof BroadcastChannel === 'undefined') {
    return null
  }

  return new BroadcastChannel(GUEST_MESSAGES_CHANNEL)
}

function getStorageItem(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    warnGuestMessages(`No se pudo leer localStorage:${key}`, error)
    return null
  }
}

function setStorageItem(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch (error) {
    warnGuestMessages(`No se pudo escribir localStorage:${key}`, error)
    return false
  }
}

function removeStorageItem(key: string) {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    warnGuestMessages(`No se pudo limpiar localStorage:${key}`, error)
  }
}

function parseStorageArray(key: string) {
  const rawMessages = getStorageItem(key)

  if (!rawMessages) {
    return []
  }

  try {
    const parsedMessages = JSON.parse(rawMessages)

    if (!Array.isArray(parsedMessages)) {
      return []
    }

    return parsedMessages
  } catch (error) {
    const backupKey = `${GUEST_MESSAGES_STORAGE_KEY}-corrupted-backup-${Date.now()}`
    setStorageItem(backupKey, rawMessages)
    removeStorageItem(key)
    warnGuestMessages(`JSON corrupto respaldado en ${backupKey}`, error)
    return []
  }
}

function parseCreatedAt(value: unknown) {
  if (typeof value === 'string') {
    const timestamp = Date.parse(value)
    return Number.isNaN(timestamp) ? new Date().toISOString() : new Date(timestamp).toISOString()
  }

  if (typeof value === 'number') {
    return new Date(value).toISOString()
  }

  return new Date().toISOString()
}

function normalizeStatus(value: unknown): GuestMessageStatus | undefined {
  return value === 'approved' || value === 'pending' || value === 'hidden' ? value : undefined
}

function mapSupabaseRowToGuestMessage(row: SupabaseGuestMessageRow): GuestMessage {
  const approved = row.approved !== false

  return {
    id: row.id,
    name: row.name.trim(),
    message: row.message.trim(),
    createdAt: parseCreatedAt(row.created_at),
    approved,
    likes: typeof row.likes === 'number' ? row.likes : 0,
    status: approved ? 'approved' : 'hidden',
  }
}

export function normalizeGuestMessage(message: unknown): GuestMessage | null {
  if (!isRecord(message)) {
    return null
  }

  const name = typeof message.name === 'string' ? message.name.trim() : ''
  const text = typeof message.message === 'string' ? message.message.trim() : ''

  if (!name || !text) {
    return null
  }

  const status = normalizeStatus(message.status)
  const approved =
    typeof message.approved === 'boolean'
      ? message.approved
      : status === 'hidden' || status === 'pending'
        ? false
        : status === 'approved'
          ? true
          : undefined

  return {
    id: typeof message.id === 'string' && message.id.trim() ? message.id : createId(),
    name,
    message: text,
    photo: typeof message.photo === 'string' && message.photo ? message.photo : undefined,
    createdAt: parseCreatedAt(message.createdAt),
    approved,
    likes: typeof message.likes === 'number' ? message.likes : undefined,
    status: status ?? (approved === false ? 'hidden' : 'approved'),
  }
}

function dedupeAndSortMessages(messages: GuestMessage[]) {
  const uniqueMessages = new Map<string, GuestMessage>()

  messages.forEach((message) => {
    uniqueMessages.set(message.id, message)
  })

  return [...uniqueMessages.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

function dedupeAndSortMessagesAscending(messages: GuestMessage[]) {
  return dedupeAndSortMessages(messages).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
}

export function isSupabaseConfigured() {
  return hasSupabaseConfig && supabase !== null
}

function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  return supabase
}

export function migrateGuestMessagesStorage() {
  if (typeof window === 'undefined') {
    return []
  }

  const currentMessages = parseStorageArray(GUEST_MESSAGES_STORAGE_KEY)
    .map(normalizeGuestMessage)
    .filter((message): message is GuestMessage => Boolean(message))

  const oldMessages = OLD_MESSAGE_STORAGE_KEYS.flatMap((key) =>
    parseStorageArray(key)
      .map(normalizeGuestMessage)
      .filter((message): message is GuestMessage => Boolean(message)),
  )

  const migratedMessages = dedupeAndSortMessages([...currentMessages, ...oldMessages])

  if (oldMessages.length > 0 || migratedMessages.length !== currentMessages.length) {
    saveLocalGuestMessages(migratedMessages, { emit: false })
    OLD_MESSAGE_STORAGE_KEYS.forEach(removeStorageItem)
    logGuestMessages('Migracion localStorage completada', { count: migratedMessages.length })
  }

  OLD_SETTINGS_STORAGE_KEYS.forEach((oldKey) => {
    const oldSettings = getStorageItem(oldKey)
    const currentSettings = getStorageItem(GUEST_MESSAGES_SETTINGS_KEY)

    if (oldSettings && !currentSettings) {
      setStorageItem(GUEST_MESSAGES_SETTINGS_KEY, oldSettings)
      removeStorageItem(oldKey)
    }
  })

  return migratedMessages
}

function getLocalGuestMessages() {
  if (typeof window === 'undefined') {
    return []
  }

  migrateGuestMessagesStorage()

  const messages = parseStorageArray(GUEST_MESSAGES_STORAGE_KEY)
    .map(normalizeGuestMessage)
    .filter((message): message is GuestMessage => Boolean(message))

  const normalizedMessages = dedupeAndSortMessages(messages)
  logGuestMessages('Fallback localStorage activo', { count: normalizedMessages.length })
  return normalizedMessages
}

export async function getGuestMessages() {
  if (!isSupabaseConfigured()) {
    return getLocalGuestMessages()
  }

  const client = getSupabaseClient()
  const { data, error } = await client
    .from(SUPABASE_TABLE)
    .select('id,name,message,created_at,approved,likes')
    .order('created_at', { ascending: false })

  if (error) {
    warnGuestMessages('Error cargando mensajes', error)
    throw new Error('No se pudieron cargar los mensajes.')
  }

  const messages = dedupeAndSortMessages(
    (data ?? [])
      .map((row) => mapSupabaseRowToGuestMessage(row as SupabaseGuestMessageRow))
      .filter((message) => message.approved !== false),
  )

  logGuestMessages('Supabase configurado. Mensajes cargados', { count: messages.length })
  return messages
}

function saveLocalGuestMessages(messages: GuestMessage[], options: { emit?: boolean } = {}) {
  if (typeof window === 'undefined') {
    return false
  }

  const normalizedMessages = dedupeAndSortMessages(
    messages.map(normalizeGuestMessage).filter((message): message is GuestMessage => Boolean(message)),
  )

  const saved = setStorageItem(GUEST_MESSAGES_STORAGE_KEY, JSON.stringify(normalizedMessages.slice(0, 150)))

  if (saved && options.emit !== false) {
    emitGuestMessagesUpdated()
  }

  return saved
}

export async function saveGuestMessages(messages: GuestMessage[], options: { emit?: boolean } = {}) {
  if (!isSupabaseConfigured()) {
    return saveLocalGuestMessages(messages, options)
  }

  const normalizedMessages = messages
    .map(normalizeGuestMessage)
    .filter((message): message is GuestMessage => Boolean(message))

  const rows = normalizedMessages.map((message) => ({
    id: message.id,
    name: message.name,
    message: message.message,
    created_at: message.createdAt,
    approved: message.approved !== false,
    likes: message.likes ?? 0,
  }))

  const client = getSupabaseClient()
  const { error } = await client.from(SUPABASE_TABLE).upsert(rows)

  if (error) {
    warnGuestMessages('Error guardando mensajes', error)
    throw new Error('No se pudieron guardar los mensajes.')
  }

  if (options.emit !== false) {
    emitGuestMessagesUpdated()
  }

  return true
}

export function getGuestMessagesSettings(): GuestMessagesSettings {
  if (typeof window === 'undefined') {
    return defaultSettings
  }

  const rawSettings = getStorageItem(GUEST_MESSAGES_SETTINGS_KEY)

  if (!rawSettings) {
    return defaultSettings
  }

  try {
    const parsedSettings = JSON.parse(rawSettings)

    if (!isRecord(parsedSettings)) {
      return defaultSettings
    }

    return {
      moderationEnabled:
        typeof parsedSettings.moderationEnabled === 'boolean'
          ? parsedSettings.moderationEnabled
          : defaultSettings.moderationEnabled,
      displayDurationSeconds:
        typeof parsedSettings.displayDurationSeconds === 'number'
          ? Math.min(60, Math.max(8, parsedSettings.displayDurationSeconds))
          : defaultSettings.displayDurationSeconds,
    }
  } catch (error) {
    warnGuestMessages('Error parseando settings', error)
    return defaultSettings
  }
}

export function saveGuestMessagesSettings(settings: GuestMessagesSettings) {
  const saved = setStorageItem(
    GUEST_MESSAGES_SETTINGS_KEY,
    JSON.stringify({
      moderationEnabled: settings.moderationEnabled,
      displayDurationSeconds: Math.min(60, Math.max(8, settings.displayDurationSeconds)),
    }),
  )

  if (saved) {
    emitGuestMessagesUpdated()
  }

  return saved
}

export async function saveGuestMessage(input: MessageInput) {
  const name = input.name.trim()
  const text = input.message.trim()

  if (!name || !text) {
    throw new Error('Escribe tu nombre y un mensaje antes de enviarlo.')
  }

  if (!isSupabaseConfigured()) {
    const message: GuestMessage = {
      id: createId(),
      name,
      message: text,
      photo: input.photo,
      createdAt: new Date().toISOString(),
      approved: true,
      likes: 0,
      status: 'approved',
    }

    const saved = saveLocalGuestMessages([message, ...getLocalGuestMessages()])

    if (!saved) {
      throw new Error('No se pudo guardar el mensaje.')
    }

    logGuestMessages('Mensaje guardado en fallback localStorage', message)
    return message
  }

  const client = getSupabaseClient()
  const { data, error } = await client
    .from(SUPABASE_TABLE)
    .insert({
      name,
      message: text,
      approved: true,
      likes: 0,
    })
    .select('id,name,message,created_at,approved,likes')
    .single()

  if (error || !data) {
    warnGuestMessages('Error insertando mensaje', error)
    throw new Error('No se pudo guardar el mensaje.')
  }

  const savedMessage = mapSupabaseRowToGuestMessage(data as SupabaseGuestMessageRow)
  logGuestMessages('Mensaje insertado', savedMessage)
  return savedMessage
}

export async function updateGuestMessageStatus(id: string, status: GuestMessageStatus) {
  const approved = status === 'approved'

  if (!isSupabaseConfigured()) {
    saveLocalGuestMessages(
      getLocalGuestMessages().map((message) => (message.id === id ? { ...message, status, approved } : message)),
    )
    return
  }

  const client = getSupabaseClient()
  const { error } = await client.from(SUPABASE_TABLE).update({ approved }).eq('id', id)

  if (error) {
    warnGuestMessages('Error actualizando mensaje', error)
    throw new Error('No se pudo actualizar el mensaje.')
  }

  emitGuestMessagesUpdated()
}

export async function deleteGuestMessage(id: string) {
  if (!isSupabaseConfigured()) {
    saveLocalGuestMessages(getLocalGuestMessages().filter((message) => message.id !== id))
    return
  }

  const client = getSupabaseClient()
  const { error } = await client.from(SUPABASE_TABLE).delete().eq('id', id)

  if (error) {
    warnGuestMessages('Error eliminando mensaje', error)
    throw new Error('No se pudo eliminar el mensaje.')
  }

  emitGuestMessagesUpdated()
}

export async function clearGuestMessagesForTesting() {
  if (!isSupabaseConfigured()) {
    saveLocalGuestMessages([])
    return
  }

  const client = getSupabaseClient()
  const { error } = await client.from(SUPABASE_TABLE).delete().neq('id', '00000000-0000-0000-0000-000000000000')

  if (error) {
    warnGuestMessages('Error limpiando mensajes', error)
    throw new Error('No se pudieron limpiar los mensajes.')
  }

  emitGuestMessagesUpdated()
}

export function resetMessagesCacheForTesting() {
  if (typeof window === 'undefined') {
    return
  }

  removeStorageItem(GUEST_MESSAGES_STORAGE_KEY)
  OLD_MESSAGE_STORAGE_KEYS.forEach(removeStorageItem)
  emitGuestMessagesUpdated()
}

export function emitGuestMessagesUpdated() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(GUEST_MESSAGES_UPDATED_EVENT))

  const channel = getChannel()

  try {
    channel?.postMessage({ type: GUEST_MESSAGES_UPDATED_EVENT, sentAt: Date.now() })
  } finally {
    channel?.close()
  }
}

function subscribeToLocalGuestMessages(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  let lastSnapshot = ''
  const channel = getChannel()

  const runCallback = (reason: string) => {
    logGuestMessages(`Evento local recibido: ${reason}`)
    callback()
  }

  const checkForChanges = () => {
    const snapshot = getStorageItem(GUEST_MESSAGES_STORAGE_KEY) ?? ''

    if (snapshot !== lastSnapshot) {
      lastSnapshot = snapshot
      runCallback('polling')
    }
  }

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === GUEST_MESSAGES_STORAGE_KEY ||
      event.key === GUEST_MESSAGES_SETTINGS_KEY ||
      OLD_MESSAGE_STORAGE_KEYS.includes(event.key ?? '') ||
      OLD_SETTINGS_STORAGE_KEYS.includes(event.key ?? '')
    ) {
      runCallback('storage')
    }
  }

  const handleLocalUpdate = () => runCallback('custom-event')
  const handleBroadcast = () => runCallback('broadcast-channel')

  migrateGuestMessagesStorage()
  lastSnapshot = getStorageItem(GUEST_MESSAGES_STORAGE_KEY) ?? ''
  callback()

  window.addEventListener('storage', handleStorage)
  window.addEventListener(GUEST_MESSAGES_UPDATED_EVENT, handleLocalUpdate)
  channel?.addEventListener('message', handleBroadcast)

  const pollingInterval = window.setInterval(checkForChanges, POLLING_FALLBACK_MS)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(GUEST_MESSAGES_UPDATED_EVENT, handleLocalUpdate)
    channel?.removeEventListener('message', handleBroadcast)
    channel?.close()
    window.clearInterval(pollingInterval)
  }
}

export function subscribeToGuestMessages(callback: () => void) {
  if (!isSupabaseConfigured()) {
    logGuestMessages('Fallback localStorage activo')
    return subscribeToLocalGuestMessages(callback)
  }

  callback()

  const client = getSupabaseClient()
  const channel: RealtimeChannel = client
    .channel('guest_messages_realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: SUPABASE_TABLE,
      },
      (payload) => {
        const nextMessage = mapSupabaseRowToGuestMessage(payload.new as SupabaseGuestMessageRow)

        if (nextMessage.approved !== false) {
          logGuestMessages('Realtime recibido', nextMessage)
          callback()
        }
      },
    )
    .subscribe((status) => {
      logGuestMessages('Estado realtime', status)
    })

  return () => {
    void client.removeChannel(channel)
  }
}

export function mergeGuestMessages(currentMessages: GuestMessage[], incomingMessages: GuestMessage[]) {
  return dedupeAndSortMessagesAscending([...currentMessages, ...incomingMessages])
}

export function installGuestMessagesDevTools() {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return
  }

  const devWindow = window as typeof window & {
    __addTestGuestMessage?: () => Promise<GuestMessage>
    __resetGuestMessages?: () => void
  }

  devWindow.__addTestGuestMessage = () =>
    saveGuestMessage({
      name: 'Mensaje de prueba',
      message: `Prueba enviada ${new Date().toLocaleTimeString()}`,
    })

  devWindow.__resetGuestMessages = resetMessagesCacheForTesting
}
