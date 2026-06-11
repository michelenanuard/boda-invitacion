import {
  clearLiveMessages,
  getLiveMessages,
  saveLiveMessages,
  subscribeToLiveMessages,
  submitLiveMessage,
  type LiveGuestMessage,
} from './liveMessagesService'

export type GuestMessage = LiveGuestMessage

export function getGuestMessages() {
  return getLiveMessages()
}

export function saveGuestMessage(input: { name: string; message: string; photo?: string }) {
  return submitLiveMessage(input)
}

export function saveGuestMessages(messages: GuestMessage[]) {
  saveLiveMessages(messages)
}

export function subscribeToGuestMessages(callback: () => void) {
  return subscribeToLiveMessages(callback)
}

export function clearGuestMessages() {
  clearLiveMessages()
}
