import type { StoryEvent } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { ImagePickerField } from '../components/ImagePickerField'
import { RepeaterField } from '../components/RepeaterField'
import { TextEditorField } from '../components/TextEditorField'

const createStoryEvent = (): StoryEvent => ({
  year: '2026',
  title: 'Nuevo momento',
  description: 'Describe este capítulo de su historia.',
  image: '',
})

export function StoryEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <EditableCard title="Nuestra historia" description="Agrega los momentos más importantes de la relación.">
      <RepeaterField
        title="Momentos"
        items={draft.story}
        createItem={createStoryEvent}
        getItemLabel={(item, index) => item.title || `Momento ${index + 1}`}
        onChange={(story) => updateDraft({ ...draft, story })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4">
            <FormField label="Año o fecha" value={item.year} onChange={(year) => updateItem({ ...item, year })} />
            <FormField label="Título" value={item.title} onChange={(title) => updateItem({ ...item, title })} />
            <TextEditorField label="Historia de cómo se conocieron" value={item.description} onChange={(description) => updateItem({ ...item, description })} />
            <ImagePickerField label="Imagen del momento" value={item.image ?? ''} onChange={(image) => updateItem({ ...item, image })} />
          </div>
        )}
      />
    </EditableCard>
  )
}
