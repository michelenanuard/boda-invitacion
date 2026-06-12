import { useEffect, useState } from 'react'
import {
  getLiveMessages,
  getLiveMessagesSettings,
  saveLiveMessagesSettings,
  subscribeToLiveMessages,
  type LiveGuestMessage,
  type LiveMessagesSettings,
} from '../services/liveMessagesService'
import { LIVE_MESSAGES_CONFIG } from '../config/liveMessagesConfig'

export function useLiveMessages() {
  const [messages, setMessages] = useState<LiveGuestMessage[]>(() => getLiveMessages())
  const [settings, setSettings] = useState<LiveMessagesSettings>(() => getLiveMessagesSettings())

  useEffect(() => {
    const refresh = () => {
      setMessages(getLiveMessages())
      setSettings(getLiveMessagesSettings())
    }

    const unsubscribe = subscribeToLiveMessages(refresh)
    refresh()

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refresh()
      }
    }

    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const pollingInterval = window.setInterval(refresh, LIVE_MESSAGES_CONFIG.pollingFallbackMs)

    return () => {
      unsubscribe()
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.clearInterval(pollingInterval)
    }
  }, [])

  const saveSettings = (nextSettings: LiveMessagesSettings) => {
    saveLiveMessagesSettings(nextSettings)
    setSettings(getLiveMessagesSettings())
  }

  return { messages, settings, saveSettings }
}
