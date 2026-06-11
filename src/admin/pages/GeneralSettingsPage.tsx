import { useRef, useState } from 'react'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import {
  exportWeddingContent,
  importWeddingContent,
  resetWeddingContent,
} from '../../services/weddingContentService'

export function GeneralSettingsPage() {
  const { draft, updateDraft } = useAdminEditor()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')

  const update = (key: keyof typeof draft, value: string) => {
    updateDraft({ ...draft, [key]: value })
  }

  const exportBackup = () => {
    const blob = new Blob([exportWeddingContent()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'respaldo-invitacion-boda.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importBackup = async (file: File) => {
    try {
      importWeddingContent(await file.text())
      setMessage('Respaldo importado correctamente.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos importar el respaldo.')
    }
  }

  const resetContent = () => {
    if (!window.confirm('¿Restaurar la invitación a sus valores por defecto?')) {
      return
    }

    resetWeddingContent()
    window.location.reload()
  }

  return (
    <div className="grid gap-6">
      <EditableCard title="Datos de la boda" description="Estos datos aparecen en varias partes de la invitación.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Nombre de la novia" value={draft.brideName} onChange={(value) => update('brideName', value)} />
          <FormField label="Nombre del novio" value={draft.groomName} onChange={(value) => update('groomName', value)} />
          <FormField label="Nombre mostrado" value={draft.coupleDisplayName} onChange={(value) => update('coupleDisplayName', value)} />
          <FormField label="Hashtag" value={draft.hashtag} onChange={(value) => update('hashtag', value)} />
          <FormField label="Fecha" type="date" value={draft.weddingDate} onChange={(value) => update('weddingDate', value)} />
          <FormField label="Hora" type="time" value={draft.weddingTime} onChange={(value) => update('weddingTime', value)} />
          <div className="md:col-span-2">
            <FormField label="Fecha para mostrar" value={draft.displayDate} onChange={(value) => update('displayDate', value)} />
          </div>
        </div>
      </EditableCard>

      <EditableCard title="Respaldos" description="Guarda una copia de la información o restaura los valores iniciales.">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-full bg-[#211b17] px-5 py-3 text-sm font-bold text-white" onClick={exportBackup}>
            Exportar respaldo
          </button>
          <button type="button" className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-800" onClick={() => fileRef.current?.click()}>
            Importar respaldo
          </button>
          <button type="button" className="rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-700" onClick={resetContent}>
            Restaurar valores por defecto
          </button>
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            accept="application/json"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void importBackup(file)
            }}
          />
        </div>
        {message ? <p className="mt-3 text-sm font-semibold text-stone-700">{message}</p> : null}
      </EditableCard>
    </div>
  )
}

