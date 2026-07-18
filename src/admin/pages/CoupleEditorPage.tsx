import type { PersonProfile } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { ImagePickerField } from '../components/ImagePickerField'
import { TextEditorField } from '../components/TextEditorField'

function PersonFields({
  title,
  person,
  onChange,
  onImageChange,
}: {
  title: string
  person: PersonProfile
  onChange: (person: PersonProfile) => void
  onImageChange: (image: string) => void
}) {
  return (
    <EditableCard title={title}>
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Nombre" value={person.name} onChange={(value) => onChange({ ...person, name: value })} />
        <FormField label="Etiqueta" value={person.roleLabel} onChange={(value) => onChange({ ...person, roleLabel: value })} />
        <ImagePickerField label="Foto" value={person.image} onChange={onImageChange} />
        <FormField label="Familia / padres" value={person.parents ?? ''} onChange={(value) => onChange({ ...person, parents: value })} />
        <div className="lg:col-span-2">
          <TextEditorField label="Descripción" value={person.description} onChange={(value) => onChange({ ...person, description: value })} />
        </div>
      </div>
    </EditableCard>
  )
}

export function CoupleEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <div className="grid gap-6">
      <PersonFields
        title="Información de la novia"
        person={draft.bride}
        onChange={(bride) => updateDraft({ ...draft, bride })}
        onImageChange={(image) => updateDraft((current) => ({ ...current, bride: { ...current.bride, image } }))}
      />
      <PersonFields
        title="Información del novio"
        person={draft.groom}
        onChange={(groom) => updateDraft({ ...draft, groom })}
        onImageChange={(image) => updateDraft((current) => ({ ...current, groom: { ...current.groom, image } }))}
      />
    </div>
  )
}

