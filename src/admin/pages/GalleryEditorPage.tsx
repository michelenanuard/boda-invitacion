import type { GalleryImage } from '../../types/wedding'
import { useAdminEditor } from '../hooks/useAdminEditor'
import { EditableCard } from '../components/EditableCard'
import { FormField } from '../components/FormField'
import { ImagePickerField } from '../components/ImagePickerField'
import { RepeaterField } from '../components/RepeaterField'

const createGalleryImage = (): GalleryImage => ({
  id: `foto-${Date.now()}`,
  src: '',
  alt: 'Foto de la boda',
  caption: 'Nuevo recuerdo',
})

export function GalleryEditorPage() {
  const { draft, updateDraft } = useAdminEditor()

  const uploadVideo = (file: File) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft({ ...draft, galleryVideo: { ...draft.galleryVideo, src: reader.result } })
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-6">
      <EditableCard title="Video central" description="Este video aparece en el centro de la sección Momentos para recordar.">
        <div className="grid gap-5 lg:grid-cols-2">
          <FormField label="Título del video" value={draft.galleryVideo.title} onChange={(title) => updateDraft({ ...draft, galleryVideo: { ...draft.galleryVideo, title } })} />
          <div>
            <FormField
              label="Enlace de Drive o URL del video"
              type="url"
              value={draft.galleryVideo.src ?? ''}
              onChange={(src) => updateDraft({ ...draft, galleryVideo: { ...draft.galleryVideo, src } })}
              helperText="Pega un enlace compartido de Google Drive, una URL MP4 o sube un archivo desde este equipo."
            />
            <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-[#b88a43]/35 bg-[#fffdf8] px-4 text-sm font-bold text-[#211b17]">
              Subir video
              <input
                className="hidden"
                type="file"
                accept="video/*"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) uploadVideo(file)
                }}
              />
            </label>
            <p className="mt-2 text-xs leading-5 text-stone-500">
              En esta versión se guarda en el navegador; videos grandes pueden ocupar demasiado espacio.
            </p>
          </div>
          <ImagePickerField label="Imagen de portada del video" value={draft.galleryVideo.poster} onChange={(poster) => updateDraft({ ...draft, galleryVideo: { ...draft.galleryVideo, poster } })} />
          <FormField label="Texto del video" type="textarea" value={draft.galleryVideo.caption} onChange={(caption) => updateDraft({ ...draft, galleryVideo: { ...draft.galleryVideo, caption } })} />
        </div>
      </EditableCard>

      <EditableCard title="Fotos" description="Agrega, ordena o elimina fotos de la galería.">
        <RepeaterField
          title="Galería"
          items={draft.gallery}
          createItem={createGalleryImage}
          getItemLabel={(item, index) => item.caption || `Foto ${index + 1}`}
          onChange={(gallery) => updateDraft({ ...draft, gallery })}
          renderItem={(item, _index, updateItem) => (
            <div className="grid gap-4 lg:grid-cols-2">
              <FormField label="Título visible" value={item.caption} onChange={(caption) => updateItem({ ...item, caption })} />
              <FormField label="Descripción accesible" value={item.alt} onChange={(alt) => updateItem({ ...item, alt })} />
              <div className="lg:col-span-2">
                <ImagePickerField label="Imagen" value={item.src} onChange={(src) => updateItem({ ...item, src })} />
              </div>
            </div>
          )}
        />
      </EditableCard>
    </div>
  )
}
