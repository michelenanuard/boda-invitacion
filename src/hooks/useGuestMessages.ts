import { useCallback, useEffect, useState } from 'react'
import {
  getGuestMessages,
  getGuestMessagesSettings,
  subscribeToGuestMessages,
  type GuestMessage,
  type GuestMessagesSettings,
} from '../services/guestMessagesService'

function dedupeAndSortMessages(messages: GuestMessage[]) {
  const uniqueMessages = new Map<string, GuestMessage>()

  messages.forEach((message) => {
    uniqueMessages.set(message.id, message)
  })

  return [...uniqueMessages.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

export function useGuestMessages() {
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [settings, setSettings] = useState<GuestMessagesSettings>(() => getGuestMessagesSettings())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshMessages = useCallback(async () => {
    try {
      setMessages(dedupeAndSortMessages(await getGuestMessages()))
      setSettings(getGuestMessagesSettings())
      setError('')
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'No se pudieron leer los mensajes.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const refreshAsync = () => {
      window.setTimeout(() => {
        void refreshMessages()
      }, 0)
    }
    const unsubscribe = subscribeToGuestMessages(refreshAsync)

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshAsync()
      }
    }

    window.addEventListener('focus', refreshAsync)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      unsubscribe()
      window.removeEventListener('focus', refreshAsync)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [refreshMessages])

  return { messages, settings, loading, error, refreshMessages }
}
