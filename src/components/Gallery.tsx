import { Image, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { GalleryImage } from '../types/wedding'

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  const galleryImages = images.slice(0, 8)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selectedImage) {
      return undefined
    }

    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedImage])

  return (
    <section id="galeria" className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
            <Image className="h-4 w-4" aria-hidden="true" />
            Galería
          </p>
          <h2 className="font-serif-display text-4xl font-semibold text-stone-950 sm:text-5xl">
            Momentos para recordar
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.id ?? image.src}
              className={`group relative aspect-[4/5] overflow-hidden rounded-md bg-stone-100 text-left shadow-sm ${
                index === 0 || index === 5 ? 'md:row-span-2 md:aspect-auto' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {image.caption ? (
                <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {image.caption}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90svh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-950 shadow-lg"
              aria-label="Cerrar galería"
              ref={closeButtonRef}
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90svh] w-full rounded-md object-contain"
            />
            {selectedImage.caption ? (
              <p className="mt-3 text-center text-sm font-medium text-white">
                {selectedImage.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}
