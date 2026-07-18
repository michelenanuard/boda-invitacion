import { useEffect, useState } from 'react'
import type { WeddingContent } from '../types/wedding'
import {
  getWeddingContent,
  getPublishedWeddingContent,
  savePublishedWeddingContent,
  saveWeddingContent,
  subscribeToPublishedWeddingContent,
  WEDDING_CONTENT_STORAGE_KEY,
  WEDDING_CONTENT_UPDATED_EVENT,
} from '../services/weddingContentService'

export function useWeddingContent() {
  const [content, setContent] = useState<WeddingContent>(() => getWeddingContent())
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const refreshContent = (event?: Event) => {
      const updatedContent = event instanceof CustomEvent ? event.detail as WeddingContent | undefined : undefined
      setContent(updatedContent ?? getWeddingContent())
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === WEDDING_CONTENT_STORAGE_KEY) {
        refreshContent()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(WEDDING_CONTENT_UPDATED_EVENT, refreshContent)

    let isMounted = true

    const loadPublishedContent = async () => {
      try {
        setError(null)
        const publishedContent = await getPublishedWeddingContent()

        if (isMounted) {
          setContent(publishedContent.content)
          setUpdatedAt(publishedContent.updatedAt)
        }
      } catch (nextError) {
        if (isMounted) {
          setError(nextError instanceof Error ? nextError.message : 'No se pudo cargar el contenido online.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadPublishedContent()

    const unsubscribe = subscribeToPublishedWeddingContent((publishedContent) => {
      if (isMounted) {
        setContent(publishedContent.content)
        setUpdatedAt(publishedContent.updatedAt)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(WEDDING_CONTENT_UPDATED_EVENT, refreshContent)
    }
  }, [])

  const saveContent = async (nextContent: WeddingContent) => {
    const publishedContent = await savePublishedWeddingContent(nextContent)
    setContent(publishedContent.content)
    setUpdatedAt(publishedContent.updatedAt)
  }

  const saveContentLocally = (nextContent: WeddingContent) => {
    saveWeddingContent(nextContent)
    setContent(nextContent)
  }

  return { content, setContent, saveContent, saveContentLocally, loading, updatedAt, error }
}
