import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { ImagePickerField } from '../components/ImagePickerField'
import { TextEditorField } from '../components/TextEditorField'

export function HeroEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <EditableCard title="Portada" description="Esta es la primera impresión que verán los invitados.">
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Título principal" value={draft.heroTitle} onChange={(heroTitle) => updateDraft({ ...draft, heroTitle })} />
        <ImagePickerField
          label="Foto de portada"
          value={draft.heroImage}
          onChange={(heroImage) => updateDraft((current) => ({ ...current, heroImage }))}
        />
        <div className="lg:col-span-2">
          <TextEditorField
            label="Mensaje principal"
            value={draft.heroSubtitle}
            onChange={(heroSubtitle) => updateDraft({ ...draft, heroSubtitle })}
            helperText="Un mensaje corto y emotivo funciona mejor."
          />
        </div>
      </div>
    </EditableCard>
  )
}

