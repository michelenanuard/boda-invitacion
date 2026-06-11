import { Check, ExternalLink, EyeOff, MonitorUp, Trash2 } from 'lucide-react'
import { useLiveMessages } from '../../hooks/useLiveMessages'
import {
  clearLiveMessages,
  deleteLiveMessage,
  updateLiveMessageStatus,
} from '../../services/liveMessagesService'
import { EditableCard } from '../components/EditableCard'

function formatMessageTime(createdAt: number) {
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(createdAt))
}

export function LiveMessagesAdminPage() {
  const { messages, settings, saveSettings } = useLiveMessages()
  const pendingMessages = messages.filter((message) => message.status === 'pending')
  const visibleMessages = messages.filter((message) => message.status === 'approved')

  return (
    <div className="grid gap-6">
      <EditableCard
        title="Mensajes en vivo"
        description="Administra la pantalla que se proyectará durante la celebración."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-[8px] border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-800">
            <input
              checked={settings.moderationEnabled}
              type="checkbox"
              onChange={(event) =>
                saveSettings({ ...settings, moderationEnabled: event.target.checked })
              }
            />
            Requerir aprobación antes de proyectar
          </label>

          <label className="grid gap-2 text-sm font-semibold text-stone-800">
            Duración en pantalla
            <input
              className="w-36 rounded-[8px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/10"
              min={12}
              max={60}
              type="number"
              value={settings.displayDurationSeconds}
              onChange={(event) =>
                saveSettings({ ...settings, displayDurationSeconds: Number(event.target.value) })
              }
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#211b17] px-4 text-sm font-bold text-white"
              href="/pantalla-mensajes"
              target="_blank"
              rel="noreferrer"
            >
              <MonitorUp className="h-4 w-4" />
              Abrir pantalla
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-bold text-stone-800"
              href="/mensajes"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Formulario
            </a>
          </div>
        </div>
      </EditableCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <EditableCard title={`Pendientes (${pendingMessages.length})`} description="Mensajes esperando aprobación.">
          <div className="grid gap-3">
            {pendingMessages.length === 0 ? (
              <p className="rounded-[8px] bg-stone-50 p-4 text-sm text-stone-500">No hay mensajes pendientes.</p>
            ) : null}
            {pendingMessages.map((message) => (
              <article key={message.id} className="rounded-[8px] border border-stone-200 bg-white p-4">
                <div className="flex gap-3">
                  {message.photo ? (
                    <img src={message.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-stone-950">{message.name}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{message.message}</p>
                    <p className="mt-2 text-xs text-stone-400">{formatMessageTime(message.createdAt)}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-emerald-700 px-3 text-xs font-bold text-white"
                    onClick={() => updateLiveMessageStatus(message.id, 'approved')}
                  >
                    <Check className="h-4 w-4" />
                    Aprobar
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-stone-100 px-3 text-xs font-bold text-stone-700"
                    onClick={() => updateLiveMessageStatus(message.id, 'hidden')}
                  >
                    <EyeOff className="h-4 w-4" />
                    Ocultar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </EditableCard>

        <EditableCard title={`En pantalla (${visibleMessages.length})`} description="Mensajes aprobados para proyectar.">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 text-xs font-bold text-rose-700"
              onClick={() => {
                if (window.confirm('¿Quieres eliminar todos los mensajes?')) {
                  clearLiveMessages()
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              Limpiar todo
            </button>
          </div>
          <div className="grid gap-3">
            {visibleMessages.length === 0 ? (
              <p className="rounded-[8px] bg-stone-50 p-4 text-sm text-stone-500">Todavía no hay mensajes aprobados.</p>
            ) : null}
            {visibleMessages.map((message) => (
              <article key={message.id} className="rounded-[8px] border border-stone-200 bg-white p-4">
                <div className="flex gap-3">
                  {message.photo ? (
                    <img src={message.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-stone-950">{message.name}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{message.message}</p>
                    <p className="mt-2 text-xs text-stone-400">{formatMessageTime(message.createdAt)}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-stone-100 px-3 text-xs font-bold text-stone-700"
                    onClick={() => updateLiveMessageStatus(message.id, 'hidden')}
                  >
                    <EyeOff className="h-4 w-4" />
                    Ocultar
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-rose-50 px-3 text-xs font-bold text-rose-700"
                    onClick={() => deleteLiveMessage(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </EditableCard>
      </div>
    </div>
  )
}
