import { Image, Play, X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { GalleryImage, GalleryVideo } from '../types/wedding'

interface GalleryProps {
  images: GalleryImage[]
  video: GalleryVideo
}

function GalleryTile({
  image,
  onSelect,
  className = '',
}: {
  image: GalleryImage
  onSelect: (image: GalleryImage) => void
  className?: string
}) {
  return (
    <button
      type="button"
      className={`group relative min-h-48 overflow-hidden rounded-[8px] bg-[#f3eadb] text-left shadow-[0_18px_60px_rgba(33,27,23,0.08)] ring-1 ring-[#b88a43]/10 ${className}`}
      onClick={() => onSelect(image)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#211b17]/72 via-[#211b17]/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
      <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/35 bg-white/14 text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" aria-hidden="true" />
      </span>
      {image.caption ? (
        <span className="absolute inset-x-0 bottom-0 p-4 font-serif-display text-xl font-semibold leading-tight text-white sm:p-5 sm:text-2xl">
          {image.caption}
        </span>
      ) : null}
    </button>
  )
}

function getDriveVideoEmbedUrl(url: string) {
  const fileMatch = url.match(/\/file\/d\/([^/]+)/)
  const idMatch = url.match(/[?&]id=([^&]+)/)
  const videoId = fileMatch?.[1] ?? idMatch?.[1]

  return videoId ? `https://drive.google.com/file/d/${videoId}/preview` : ''
}

function VideoFeature({ video }: { video: GalleryVideo }) {
  const hasVideo = Boolean(video.src?.trim())
  const driveEmbedUrl = hasVideo ? getDriveVideoEmbedUrl(video.src ?? '') : ''

  return (
    <figure className="luxury-card order-first overflow-hidden rounded-[8px] p-3 md:order-none md:min-h-[560px]">
      <div className="group relative h-full min-h-[420px] overflow-hidden rounded-[8px] bg-[#211b17] md:min-h-full">
        {driveEmbedUrl ? (
          <iframe
            className="h-full w-full"
            src={driveEmbedUrl}
            title={video.title}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : hasVideo ? (
          <video
            className="h-full w-full object-cover"
            controls
            poster={video.poster}
            preload="metadata"
          >
            <source src={video.src} />
          </video>
        ) : (
          <img
            src={video.poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {!hasVideo ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211b17]/72 via-[#211b17]/12 to-transparent" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/45 bg-white/16 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-1 h-8 w-8 fill-white" aria-hidden="true" />
              </span>
            </div>
          </>
        ) : null}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-center text-white sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7bd83]">
            {video.title}
          </p>
          <p className="mx-auto mt-3 max-w-sm font-serif-display text-2xl font-semibold leading-tight sm:text-3xl">
            {video.caption}
          </p>
        </figcaption>
      </div>
    </figure>
  )
}

export function Gallery({ images, video }: GalleryProps) {
  const featuredImages = images.slice(0, 4)
  const remainingImages = images.slice(4, 8)
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
    <section id="galeria" className="bg-[#fbf6ec] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#b88a43]">
            <Image className="h-4 w-4" aria-hidden="true" />
            Galería
          </p>
          <h2 className="font-serif-display text-[clamp(2.35rem,11vw,4.8rem)] font-semibold leading-[0.96] text-[#211b17]">
            Momentos para recordar
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[0.72fr_1.2fr_0.72fr] md:items-stretch">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {featuredImages.slice(0, 2).map((image) => (
              <GalleryTile key={image.id ?? image.src} image={image} onSelect={setSelectedImage} />
            ))}
          </div>

          <VideoFeature video={video} />

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {featuredImages.slice(2, 4).map((image) => (
              <GalleryTile key={image.id ?? image.src} image={image} onSelect={setSelectedImage} />
            ))}
          </div>
        </div>

        {remainingImages.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {remainingImages.map((image) => (
              <GalleryTile
                key={image.id ?? image.src}
                image={image}
                onSelect={setSelectedImage}
                className="aspect-[4/5]"
              />
            ))}
          </div>
        ) : null}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#211b17]/88 p-4 backdrop-blur-sm"
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
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fffdf8] text-[#211b17] shadow-lg"
              aria-label="Cerrar galería"
              ref={closeButtonRef}
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[84svh] w-full rounded-[8px] object-contain"
            />
            {selectedImage.caption ? (
              <p className="mt-3 text-center font-serif-display text-2xl font-semibold text-white">
                {selectedImage.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}
