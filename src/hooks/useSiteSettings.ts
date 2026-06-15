import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getSiteSettings,
  saveSiteSettings,
  subscribeToSiteSettings,
  type SiteSettings,
} from '../services/siteSettingsService'

export function useSiteSettings(liveMessagesEnabledFallback = false) {
  const fallbackSettings = useMemo<SiteSettings>(
    () => ({ liveMessagesEnabled: liveMessagesEnabledFallback }),
    [liveMessagesEnabledFallback],
  )
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshSettings = useCallback(async () => {
    try {
      setError(null)
      const nextSettings = await getSiteSettings(fallbackSettings)
      setSettings(nextSettings)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo cargar la configuracion.')
      setSettings(fallbackSettings)
    } finally {
      setLoading(false)
    }
  }, [fallbackSettings])

  useEffect(() => {
    let isMounted = true

    const loadSettings = async () => {
      try {
        setError(null)
        const nextSettings = await getSiteSettings(fallbackSettings)

        if (isMounted) {
          setSettings(nextSettings)
        }
      } catch (nextError) {
        if (isMounted) {
          setError(nextError instanceof Error ? nextError.message : 'No se pudo cargar la configuracion.')
          setSettings(fallbackSettings)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSettings()

    const unsubscribe = subscribeToSiteSettings((nextSettings) => {
      if (isMounted) {
        setSettings(nextSettings)
      }
    }, fallbackSettings)

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [fallbackSettings])

  const saveSettings = useCallback(async (nextSettings: SiteSettings) => {
    setSaving(true)

    try {
      setError(null)
      const savedSettings = await saveSiteSettings(nextSettings)
      setSettings(savedSettings)
      return savedSettings
    } catch (nextError) {
      const message = nextError instanceof Error ? nextError.message : 'No se pudo guardar la configuracion.'
      setError(message)
      throw nextError
    } finally {
      setSaving(false)
    }
  }, [])

  return {
    settings,
    loading,
    saving,
    error,
    refreshSettings,
    saveSettings,
  }
}
