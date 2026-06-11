import type { SocialLink } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { RepeaterField } from '../components/RepeaterField'

const createSocialLink = (): SocialLink => ({
  id: `red-${Date.now()}`,
  label: 'Nueva red',
  url: 'https://',
})

export function FooterEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <div className="grid gap-6">
      <EditableCard title="Contacto y footer">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Email" type="email" value={draft.contact.email} onChange={(email) => updateDraft({ ...draft, contact: { ...draft.contact, email } })} />
          <FormField label="Teléfono" type="tel" value={draft.contact.phone} onChange={(phone) => updateDraft({ ...draft, contact: { ...draft.contact, phone } })} />
          <div className="md:col-span-2">
            <FormField label="Ubicación" value={draft.contact.location} onChange={(location) => updateDraft({ ...draft, contact: { ...draft.contact, location } })} />
          </div>
        </div>
      </EditableCard>

      <EditableCard title="Links de redes sociales">
        <RepeaterField
          title="Redes sociales"
          items={draft.socialLinks}
          createItem={createSocialLink}
          getItemLabel={(item, index) => item.label || `Red ${index + 1}`}
          onChange={(socialLinks) => updateDraft({ ...draft, socialLinks })}
          renderItem={(item, _index, updateItem) => (
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nombre de la red" value={item.label} onChange={(label) => updateItem({ ...item, label })} />
              <FormField label="Enlace" type="url" value={item.url} onChange={(url) => updateItem({ ...item, url })} />
            </div>
          )}
        />
      </EditableCard>
    </div>
  )
}

