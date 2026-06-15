import { createContext, useContext } from 'react'
import type { WeddingContent } from '../../types/wedding'

export type AdminEditorContext = {
  draft: WeddingContent
  updateDraft: (content: WeddingContent) => void
  saveDraft: () => Promise<void>
  pageTitle: string
  isDirty: boolean
  isSaving: boolean
  contentUpdatedAt: string | null
  savedMessage: string
  saveError: string
  logout: () => void
}

export const AdminContext = createContext<AdminEditorContext | null>(null)

export function useAdminEditor() {
  const context = useContext(AdminContext)

  if (!context) {
    throw new Error('useAdminEditor debe usarse dentro de AdminApp.')
  }

  return context
}

