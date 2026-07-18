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
            <p className="mt-2 text-xs leading-5 text-stone-500">
              Por estabilidad, utiliza un enlace compartido o una URL MP4. Los videos no se almacenan dentro del contenido de la invitación.
            </p>
          </div>
          <ImagePickerField label="Imagen de portada del video" value={draft.galleryVideo.poster} onChange={(poster) => updateDraft((current) => ({ ...current, galleryVideo: { ...current.galleryVideo, poster } }))} />
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
                <ImagePickerField
                  label="Imagen"
                  value={item.src}
                  onChange={(src) => updateDraft((current) => ({
                    ...current,
                    gallery: current.gallery.map((image) => image.id === item.id ? { ...image, src } : image),
                  }))}
                />
              </div>
            </div>
          )}
        />
      </EditableCard>
    </div>
  )
}
