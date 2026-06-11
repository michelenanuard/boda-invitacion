import { useEffect, useState } from 'react'
import type { WeddingContent } from '../types/wedding'
import {
  getWeddingContent,
  saveWeddingContent,
  WEDDING_CONTENT_STORAGE_KEY,
  WEDDING_CONTENT_UPDATED_EVENT,
} from '../services/weddingContentService'

export function useWeddingContent() {
  const [content, setContent] = useState<WeddingContent>(() => getWeddingContent())

  useEffect(() => {
    const refreshContent = () => setContent(getWeddingContent())

    const handleStorage = (event: StorageEvent) => {
      if (event.key === WEDDING_CONTENT_STORAGE_KEY) {
        refreshContent()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(WEDDING_CONTENT_UPDATED_EVENT, refreshContent)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(WEDDING_CONTENT_UPDATED_EVENT, refreshContent)
    }
  }, [])

  const saveContent = (nextContent: WeddingContent) => {
    saveWeddingContent(nextContent)
    setContent(nextContent)
  }

  return { content, setContent, saveContent }
}
