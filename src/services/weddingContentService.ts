import { defaultWeddingContent } from '../data/weddingData'
import type { WeddingContent } from '../types/wedding'

export const WEDDING_CONTENT_STORAGE_KEY = 'wedding-invitation-content'
export const WEDDING_CONTENT_UPDATED_EVENT = 'wedding-content-updated'

function cloneContent(content: WeddingContent): WeddingContent {
  return JSON.parse(JSON.stringify(content)) as WeddingContent
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function getDefaultWeddingContent(): WeddingContent {
  return cloneContent(defaultWeddingContent)
}

export function getWeddingContent(): WeddingContent {
  if (typeof window === 'undefined') {
    return getDefaultWeddingContent()
  }

  const rawContent = window.localStorage.getItem(WEDDING_CONTENT_STORAGE_KEY)

  if (!rawContent) {
    return getDefaultWeddingContent()
  }

  try {
    const parsedContent = JSON.parse(rawContent)

    if (!isRecord(parsedContent)) {
      return getDefaultWeddingContent()
    }

    return {
      ...getDefaultWeddingContent(),
      ...parsedContent,
    } as WeddingContent
  } catch {
    return getDefaultWeddingContent()
  }
}

export function saveWeddingContent(content: WeddingContent) {
  window.localStorage.setItem(WEDDING_CONTENT_STORAGE_KEY, JSON.stringify(content))
  window.dispatchEvent(new CustomEvent(WEDDING_CONTENT_UPDATED_EVENT, { detail: content }))
}

export function resetWeddingContent() {
  window.localStorage.removeItem(WEDDING_CONTENT_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(WEDDING_CONTENT_UPDATED_EVENT, { detail: getDefaultWeddingContent() }))
}

export function exportWeddingContent() {
  return JSON.stringify(getWeddingContent(), null, 2)
}

export function importWeddingContent(json: string) {
  const parsedContent = JSON.parse(json) as WeddingContent

  if (!isRecord(parsedContent) || typeof parsedContent.coupleDisplayName !== 'string') {
    throw new Error('El archivo no parece ser un respaldo válido de la invitación.')
  }

  saveWeddingContent({
    ...getDefaultWeddingContent(),
    ...parsedContent,
  })
}

export function hasCustomContent() {
  return typeof window !== 'undefined' && window.localStorage.getItem(WEDDING_CONTENT_STORAGE_KEY) !== null
}
