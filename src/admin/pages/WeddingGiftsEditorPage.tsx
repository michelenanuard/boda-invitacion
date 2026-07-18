import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { TextEditorField } from '../components/TextEditorField'
import { useAdminEditor } from '../hooks/useAdminEditor'

export function WeddingGiftsEditorPage() {
  const { draft, updateDraft } = useAdminEditor()
  const updateGifts = (field: keyof typeof draft.gifts, value: string) => {
    updateDraft({ ...draft, gifts: { ...draft.gifts, [field]: value } })
  }

  return (
    <div className="grid gap-6">
      <EditableCard
        title="Regalos de Boda"
        description="Administra el mensaje, los datos bancarios y el enlace de la lista de regalos."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextEditorField
              label="Mensaje para los invitados"
              value={draft.gifts.message}
              onChange={(value) => updateGifts('message', value)}
              helperText="Este texto aparece debajo del título de la sección."
            />
          </div>
          <FormField label="Banco" value={draft.gifts.bank} onChange={(value) => updateGifts('bank', value)} />
          <FormField
            label="Tipo de cuenta"
            value={draft.gifts.accountType}
            onChange={(value) => updateGifts('accountType', value)}
          />
          <FormField
            label="Número de cuenta"
            value={draft.gifts.accountNumber}
            onChange={(value) => updateGifts('accountNumber', value)}
          />
          <FormField
            label="Titulares"
            value={draft.gifts.accountHolders}
            onChange={(value) => updateGifts('accountHolders', value)}
          />
          <FormField
            label="Cédula"
            value={draft.gifts.accountHolderId}
            onChange={(value) => updateGifts('accountHolderId', value)}
          />
          <FormField
            label="Enlace de la lista de regalos"
            type="url"
            value={draft.gifts.registryUrl}
            onChange={(value) => updateGifts('registryUrl', value)}
          />
        </div>
      </EditableCard>

      <EditableCard title="Vista previa de los datos">
        <div className="grid gap-4 rounded-[8px] border border-[#b88a43]/20 bg-[#fbf6ec] p-5 text-stone-700 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b88a43]">Cuenta bancaria</p>
            <p className="mt-3 font-semibold text-stone-950">{draft.gifts.bank || 'Banco sin definir'}</p>
            <p className="mt-1 text-sm">{draft.gifts.accountType} · Núm. {draft.gifts.accountNumber}</p>
            <p className="mt-1 text-sm">{draft.gifts.accountHolders}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b88a43]">Lista de regalos</p>
            <p className="mt-3 break-all text-sm">{draft.gifts.registryUrl || 'Enlace sin definir'}</p>
          </div>
        </div>
      </EditableCard>
    </div>
  )
}
