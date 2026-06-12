import { saveLiveMessagesSettings, type LiveMessagesSettings } from '../services/liveMessagesService'
import { useGuestMessages } from './useGuestMessages'

export function useLiveMessages() {
  const guestMessagesState = useGuestMessages()

  const saveSettings = (nextSettings: LiveMessagesSettings) => {
    saveLiveMessagesSettings(nextSettings)
    guestMessagesState.refreshMessages()
  }

  return { ...guestMessagesState, saveSettings }
}
