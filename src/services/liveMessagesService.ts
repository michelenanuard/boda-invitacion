import {
  clearGuestMessagesForTesting,
  deleteGuestMessage,
  getGuestMessages,
  getGuestMessagesSettings,
  saveGuestMessage,
  saveGuestMessages,
  saveGuestMessagesSettings,
  subscribeToGuestMessages,
  updateGuestMessageStatus,
  GUEST_MESSAGES_SETTINGS_KEY,
  GUEST_MESSAGES_STORAGE_KEY,
  GUEST_MESSAGES_UPDATED_EVENT,
  type GuestMessage,
  type GuestMessageStatus,
  type GuestMessagesSettings,
} from './guestMessagesService'

export type LiveMessageStatus = GuestMessageStatus
export type LiveGuestMessage = GuestMessage
export type LiveMessagesSettings = GuestMessagesSettings

export const LIVE_MESSAGES_STORAGE_KEY = GUEST_MESSAGES_STORAGE_KEY
export const LIVE_MESSAGES_SETTINGS_KEY = GUEST_MESSAGES_SETTINGS_KEY
export const LIVE_MESSAGES_UPDATED_EVENT = GUEST_MESSAGES_UPDATED_EVENT

export function getLiveMessages() {
  return getGuestMessages()
}

export function saveLiveMessages(messages: LiveGuestMessage[]) {
  return saveGuestMessages(messages)
}

export function getLiveMessagesSettings() {
  return getGuestMessagesSettings()
}

export function saveLiveMessagesSettings(settings: LiveMessagesSettings) {
  return saveGuestMessagesSettings(settings)
}

export function submitLiveMessage(input: { name: string; message: string; photo?: string }) {
  return saveGuestMessage(input)
}

export function updateLiveMessageStatus(id: string, status: LiveMessageStatus) {
  updateGuestMessageStatus(id, status)
}

export function deleteLiveMessage(id: string) {
  deleteGuestMessage(id)
}

export function clearLiveMessages() {
  clearGuestMessagesForTesting()
}

export function subscribeToLiveMessages(callback: () => void) {
  return subscribeToGuestMessages(callback)
}
