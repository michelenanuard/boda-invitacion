import { useAdminEditor } from '../hooks/useAdminEditor'
import { ColorPickerField } from '../components/ColorPickerField'
import { EditableCard } from '../components/EditableCard'

export function ThemeEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  const updateTheme = (key: keyof typeof draft.theme, value: string) => {
    updateDraft({ ...draft, theme: { ...draft.theme, [key]: value } })
  }

  return (
    <EditableCard title="Estilo visual" description="Ajusta los colores principales de la invitación.">
      <div className="grid gap-5 md:grid-cols-2">
        <ColorPickerField label="Fondo claro" value={draft.theme.ivory} onChange={(value) => updateTheme('ivory', value)} />
        <ColorPickerField label="Papel" value={draft.theme.paper} onChange={(value) => updateTheme('paper', value)} />
        <ColorPickerField label="Lino" value={draft.theme.linen} onChange={(value) => updateTheme('linen', value)} />
        <ColorPickerField label="Acento dorado" value={draft.theme.gold} onChange={(value) => updateTheme('gold', value)} />
        <ColorPickerField label="Texto principal" value={draft.theme.ink} onChange={(value) => updateTheme('ink', value)} />
        <ColorPickerField label="Texto secundario" value={draft.theme.muted} onChange={(value) => updateTheme('muted', value)} />
      </div>
    </EditableCard>
  )
}

