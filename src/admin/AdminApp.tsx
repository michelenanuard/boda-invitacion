import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AdminLayout } from './AdminLayout'
import { useAdminAuth } from './hooks/useAdminAuth'
import { useWeddingContent } from '../hooks/useWeddingContent'
import type { WeddingContent } from '../types/wedding'
import { AdminContext } from './hooks/useAdminEditor'
import { AdminDashboard } from './AdminDashboard'
import { CoupleEditorPage } from './pages/CoupleEditorPage'
import { EventDetailsEditorPage } from './pages/EventDetailsEditorPage'
import { FAQEditorPage } from './pages/FAQEditorPage'
import { FooterEditorPage } from './pages/FooterEditorPage'
import { GalleryEditorPage } from './pages/GalleryEditorPage'
import { GeneralSettingsPage } from './pages/GeneralSettingsPage'
import { HeroEditorPage } from './pages/HeroEditorPage'
import { LiveMessagesAdminPage } from './pages/LiveMessagesAdminPage'
import { PreviewPage } from './pages/PreviewPage'
import { StoryEditorPage } from './pages/StoryEditorPage'
import { TestimonialsEditorPage } from './pages/TestimonialsEditorPage'
import { ThemeEditorPage } from './pages/ThemeEditorPage'

const pageTitles: Record<string, string> = {
  '/admin': 'Inicio',
  '/admin/general': 'Datos generales',
  '/admin/hero': 'Portada',
  '/admin/events': 'Ceremonia y recepción',
  '/admin/couple': 'Los novios',
  '/admin/story': 'Nuestra historia',
  '/admin/gallery': 'Galería',
  '/admin/testimonials': 'Mensajes estáticos',
  '/admin/live-messages': 'Mensajes en vivo',
  '/admin/faq': 'Preguntas frecuentes',
  '/admin/footer': 'Footer',
  '/admin/theme': 'Estilo visual',
  '/admin/preview': 'Vista previa',
}

export function AdminApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout: logoutSession } = useAdminAuth()
  const { content, saveContent, loading: loadingContent, updatedAt: contentUpdatedAt, error: contentLoadError } = useWeddingContent()
  const [draft, setDraft] = useState<WeddingContent>(content)
  const [savedMessage, setSavedMessage] = useState('')
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasLocalEdits, setHasLocalEdits] = useState(false)

  const isDirty = useMemo(() => hasLocalEdits && JSON.stringify(draft) !== JSON.stringify(content), [content, draft, hasLocalEdits])
  const pageTitle = pageTitles[location.pathname] ?? 'Administrador'

  useEffect(() => {
    if (!hasLocalEdits) {
      setDraft(content)
    }
  }, [content, hasLocalEdits])

  useEffect(() => {
    if (contentLoadError) {
      setSaveError(contentLoadError)
    }
  }, [contentLoadError])

  useEffect(() => {
    const preventUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return
      }

      event.preventDefault()
    }

    window.addEventListener('beforeunload', preventUnload)
    return () => window.removeEventListener('beforeunload', preventUnload)
  }, [isDirty])

  const saveDraft = async () => {
    try {
      setIsSaving(true)
      await saveContent(draft)
      setHasLocalEdits(false)
      setSaveError('')
      setSavedMessage('Cambios guardados correctamente')
      window.setTimeout(() => setSavedMessage(''), 2500)
    } catch (error) {
      setSavedMessage('')
      setSaveError(error instanceof Error ? error.message : 'No se pudieron guardar los cambios.')
    } finally {
      setIsSaving(false)
    }
  }

  const updateDraft = (nextDraft: WeddingContent) => {
    setSaveError('')
    setHasLocalEdits(true)
    setDraft(nextDraft)
  }

  const logout = () => {
    if (isDirty && !window.confirm('Tienes cambios sin guardar. ¿Quieres salir sin guardarlos?')) {
      return
    }

    logoutSession()
    navigate('/admin/login')
  }

  return (
    <AdminContext.Provider
      value={{
        draft,
        updateDraft,
        saveDraft,
        pageTitle,
        isDirty: loadingContent ? false : isDirty,
        isSaving,
        contentUpdatedAt,
        savedMessage,
        saveError,
        logout,
      }}
    >
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="general" element={<GeneralSettingsPage />} />
          <Route path="hero" element={<HeroEditorPage />} />
          <Route path="events" element={<EventDetailsEditorPage />} />
          <Route path="couple" element={<CoupleEditorPage />} />
          <Route path="story" element={<StoryEditorPage />} />
          <Route path="gallery" element={<GalleryEditorPage />} />
          <Route path="testimonials" element={<TestimonialsEditorPage />} />
          <Route path="live-messages" element={<LiveMessagesAdminPage />} />
          <Route path="faq" element={<FAQEditorPage />} />
          <Route path="footer" element={<FooterEditorPage />} />
          <Route path="theme" element={<ThemeEditorPage />} />
          <Route path="preview" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminContext.Provider>
  )
}
