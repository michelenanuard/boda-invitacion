const MAX_IMAGE_DIMENSION = 1400
const IMAGE_QUALITY = 0.78
const MAX_SOURCE_FILE_SIZE = 12 * 1024 * 1024
const MAX_STORED_IMAGE_SIZE = 900 * 1024

function readImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('No pudimos leer la imagen seleccionada.'))
    }

    image.src = objectUrl
  })
}

function getScaledSize(width: number, height: number) {
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(width, height))

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

export async function prepareImageForStorage(file: File) {
  if (file.size > MAX_SOURCE_FILE_SIZE) {
    throw new Error('La imagen supera el límite de 12 MB. Selecciona una imagen más liviana.')
  }

  const image = await readImage(file)
  const { width, height } = getScaledSize(image.naturalWidth, image.naturalHeight)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Tu navegador no pudo procesar esta imagen.')
  }

  canvas.width = width
  canvas.height = height
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(image, 0, 0, width, height)

  const result = canvas.toDataURL('image/jpeg', IMAGE_QUALITY)

  if (result.length > MAX_STORED_IMAGE_SIZE) {
    throw new Error('La imagen procesada sigue siendo demasiado pesada. Usa una imagen de menor resolución.')
  }

  return result
}
