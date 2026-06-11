import { useEffect, useState } from 'react'
import {
  getLiveMessages,
  getLiveMessagesSettings,
  saveLiveMessagesSettings,
  subscribeToLiveMessages,
  type LiveGuestMessage,
  type LiveMessagesSettings,
} from '../services/liveMessagesService'

export function useLiveMessages() {
  const [messages, setMessages] = useState<LiveGuestMessage[]>(() => getLiveMessages())
  const [settings, setSettings] = useState<LiveMessagesSettings>(() => getLiveMessagesSettings())

  useEffect(() => {
    const refresh = () => {
      setMessages(getLiveMessages())
      setSettings(getLiveMessagesSettings())
    }

    return subscribeToLiveMessages(refresh)
  }, [])

  const saveSettings = (nextSettings: LiveMessagesSettings) => {
    saveLiveMessagesSettings(nextSettings)
    setSettings(getLiveMessagesSettings())
  }

  return { messages, settings, saveSettings }
}
