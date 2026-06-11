import type { Testimonial } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { RepeaterField } from '../components/RepeaterField'
import { TextEditorField } from '../components/TextEditorField'

const createTestimonial = (): Testimonial => ({
  message: 'Escribe un mensaje especial para los novios.',
  name: 'Nombre',
  relation: 'Relación',
})

export function TestimonialsEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <EditableCard title="Mensajes" description="Palabras de familiares y amistades cercanas.">
      <RepeaterField
        title="Mensajes"
        items={draft.testimonials}
        createItem={createTestimonial}
        getItemLabel={(item, index) => item.name || `Mensaje ${index + 1}`}
        onChange={(testimonials) => updateDraft({ ...draft, testimonials })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4">
            <FormField label="Nombre" value={item.name} onChange={(name) => updateItem({ ...item, name })} />
            <FormField label="Relación" value={item.relation} onChange={(relation) => updateItem({ ...item, relation })} />
            <TextEditorField label="Mensaje" value={item.message} onChange={(message) => updateItem({ ...item, message })} />
          </div>
        )}
      />
    </EditableCard>
  )
}

