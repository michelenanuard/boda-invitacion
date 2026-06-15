import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './components/AdminSidebar'
import { AdminTopbar } from './components/AdminTopbar'
import { SaveBar } from './components/SaveBar'
import { useAdminEditor } from './hooks/useAdminEditor'

export function AdminLayout() {
  const { pageTitle, isDirty, isSaving, contentUpdatedAt, savedMessage, saveError, saveDraft, logout } = useAdminEditor()

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-stone-950 lg:grid lg:grid-cols-[280px_1fr]">
      <AdminSidebar onLogout={logout} />
      <div className="min-w-0">
        <AdminTopbar
          title={pageTitle}
          isDirty={isDirty}
          isSaving={isSaving}
          contentUpdatedAt={contentUpdatedAt}
          saveError={saveError}
          onSave={saveDraft}
        />
        <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          <Outlet />
          <SaveBar
            isDirty={isDirty}
            isSaving={isSaving}
            savedMessage={savedMessage}
            saveError={saveError}
            onSave={saveDraft}
          />
        </main>
      </div>
    </div>
  )
}

