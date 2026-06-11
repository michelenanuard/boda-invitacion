import type { FAQItem } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { RepeaterField } from '../components/RepeaterField'
import { TextEditorField } from '../components/TextEditorField'

const createFAQ = (): FAQItem => ({
  id: `pregunta-${Date.now()}`,
  question: 'Nueva pregunta',
  answer: 'Escribe una respuesta clara para los invitados.',
})

export function FAQEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <EditableCard title="Preguntas frecuentes" description="Responde dudas sobre vestimenta, parqueo, horarios y confirmación.">
      <RepeaterField
        title="Preguntas que los invitados podrían tener"
        items={draft.faq}
        createItem={createFAQ}
        getItemLabel={(item, index) => item.question || `Pregunta ${index + 1}`}
        onChange={(faq) => updateDraft({ ...draft, faq })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4">
            <FormField label="Pregunta" value={item.question} onChange={(question) => updateItem({ ...item, question })} />
            <TextEditorField label="Respuesta" value={item.answer} onChange={(answer) => updateItem({ ...item, answer })} />
          </div>
        )}
      />
    </EditableCard>
  )
}

