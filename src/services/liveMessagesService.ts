export type LiveMessageStatus = 'approved' | 'pending' | 'hidden'

export type LiveGuestMessage = {
  id: string
  name: string
  message: string
  photo?: string
  createdAt: number
  status: LiveMessageStatus
}

export type LiveMessagesSettings = {
  moderationEnabled: boolean
  displayDurationSeconds: number
}

export const LIVE_MESSAGES_STORAGE_KEY = 'wedding-live-messages'
export const LIVE_MESSAGES_SETTINGS_KEY = 'wedding-live-messages-settings'
export const LIVE_MESSAGES_UPDATED_EVENT = 'wedding-live-messages-updated'
const LIVE_MESSAGES_CHANNEL = 'wedding-live-messages-channel'

const defaultSettings: LiveMessagesSettings = {
  moderationEnabled: false,
  displayDurationSeconds: 28,
}

function createMessageId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `message-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getChannel() {
  if (typeof BroadcastChannel === 'undefined') {
    return null
  }

  return new BroadcastChannel(LIVE_MESSAGES_CHANNEL)
}

function notifyLiveMessages() {
  window.dispatchEvent(new CustomEvent(LIVE_MESSAGES_UPDATED_EVENT))

  const channel = getChannel()
  channel?.postMessage({ type: LIVE_MESSAGES_UPDATED_EVENT })
  channel?.close()
}

export function getLiveMessages(): LiveGuestMessage[] {
  if (typeof window === 'undefined') {
    return []
  }

  const rawMessages = window.localStorage.getItem(LIVE_MESSAGES_STORAGE_KEY)

  if (!rawMessages) {
    return []
  }

  try {
    const parsedMessages = JSON.parse(rawMessages)

    if (!Array.isArray(parsedMessages)) {
      return []
    }

    return parsedMessages.filter(isLiveMessage).sort((a, b) => b.createdAt - a.createdAt)
  } catch {
    return []
  }
}

export function saveLiveMessages(messages: LiveGuestMessage[]) {
  window.localStorage.setItem(LIVE_MESSAGES_STORAGE_KEY, JSON.stringify(messages))
  notifyLiveMessages()
}

export function getLiveMessagesSettings(): LiveMessagesSettings {
  if (typeof window === 'undefined') {
    return defaultSettings
  }

  const rawSettings = window.localStorage.getItem(LIVE_MESSAGES_SETTINGS_KEY)

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
          ? Math.min(60, Math.max(12, parsedSettings.displayDurationSeconds))
          : defaultSettings.displayDurationSeconds,
    }
  } catch {
    return defaultSettings
  }
}

export function saveLiveMessagesSettings(settings: LiveMessagesSettings) {
  window.localStorage.setItem(
    LIVE_MESSAGES_SETTINGS_KEY,
    JSON.stringify({
      moderationEnabled: settings.moderationEnabled,
      displayDurationSeconds: Math.min(60, Math.max(12, settings.displayDurationSeconds)),
    }),
  )
  notifyLiveMessages()
}

export function submitLiveMessage(input: { name: string; message: string; photo?: string }) {
  const settings = getLiveMessagesSettings()
  const nextMessage: LiveGuestMessage = {
    id: createMessageId(),
    name: input.name.trim(),
    message: input.message.trim(),
    photo: input.photo,
    createdAt: Date.now(),
    status: settings.moderationEnabled ? 'pending' : 'approved',
  }

  saveLiveMessages([nextMessage, ...getLiveMessages()].slice(0, 150))
  return nextMessage
}

export function updateLiveMessageStatus(id: string, status: LiveMessageStatus) {
  saveLiveMessages(getLiveMessages().map((message) => (message.id === id ? { ...message, status } : message)))
}

export function deleteLiveMessage(id: string) {
  saveLiveMessages(getLiveMessages().filter((message) => message.id !== id))
}

export function clearLiveMessages() {
  saveLiveMessages([])
}

export function subscribeToLiveMessages(callback: () => void) {
  const channel = getChannel()

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LIVE_MESSAGES_STORAGE_KEY || event.key === LIVE_MESSAGES_SETTINGS_KEY) {
      callback()
    }
  }

  const handleLocalUpdate = () => callback()
  const handleBroadcast = () => callback()

  window.addEventListener('storage', handleStorage)
  window.addEventListener(LIVE_MESSAGES_UPDATED_EVENT, handleLocalUpdate)
  channel?.addEventListener('message', handleBroadcast)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(LIVE_MESSAGES_UPDATED_EVENT, handleLocalUpdate)
    channel?.removeEventListener('message', handleBroadcast)
    channel?.close()
  }
}

function isLiveMessage(value: unknown): value is LiveGuestMessage {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.message === 'string' &&
    typeof value.createdAt === 'number' &&
    (value.status === 'approved' || value.status === 'pending' || value.status === 'hidden')
  )
}
