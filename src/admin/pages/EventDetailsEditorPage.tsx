import type { WeddingEvent } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'

function EventFields({
  title,
  event,
  onChange,
  showDescription = false,
}: {
  title: string
  event: WeddingEvent
  onChange: (event: WeddingEvent) => void
  showDescription?: boolean
}) {
  return (
    <EditableCard title={title}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Título" value={event.title} onChange={(value) => onChange({ ...event, title: value })} />
        <FormField label="Hora" value={event.time} onChange={(value) => onChange({ ...event, time: value })} />
        <FormField label="Lugar" value={event.venue} onChange={(value) => onChange({ ...event, venue: value })} />
        <FormField label="Google Maps" type="url" value={event.mapUrl} onChange={(value) => onChange({ ...event, mapUrl: value })} />
        <div className="md:col-span-2">
          <FormField label="Dirección" value={event.address} onChange={(value) => onChange({ ...event, address: value })} />
        </div>
        {showDescription ? (
          <div className="md:col-span-2">
            <FormField
              label="Texto de la recepción"
              type="textarea"
              value={event.description ?? ''}
              onChange={(value) => onChange({ ...event, description: value })}
            />
          </div>
        ) : null}
        <div className="md:col-span-2">
          <FormField label="Nota para invitados" type="textarea" value={event.note ?? ''} onChange={(value) => onChange({ ...event, note: value })} />
        </div>
      </div>
    </EditableCard>
  )
}

export function EventDetailsEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  return (
    <div className="grid gap-6">
      <EventFields title="Ceremonia" event={draft.ceremony} onChange={(ceremony) => updateDraft({ ...draft, ceremony })} />
      <EventFields
        title="Recepción"
        event={draft.reception}
        showDescription
        onChange={(reception) => updateDraft({ ...draft, reception })}
      />
    </div>
  )
}

