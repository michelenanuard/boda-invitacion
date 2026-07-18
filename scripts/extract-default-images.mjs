import { mkdir, readFile, writeFile } from 'node:fs/promises'

const sourcePath = 'respaldo-invitacion-boda.json'
const outputDirectory = 'public/wedding-images'
const content = JSON.parse((await readFile(sourcePath, 'utf8')).replace(/^\uFEFF/, ''))

await mkdir(outputDirectory, { recursive: true })

async function extractImage(value, filename) {
  if (typeof value !== 'string' || !value.startsWith('data:image/')) {
    return value
  }

  const match = value.match(/^data:image\/([^;]+);base64,(.+)$/s)
  if (!match) throw new Error(`Formato de imagen inválido: ${filename}`)
  const extension = match[1] === 'jpeg' ? 'jpg' : match[1]
  const finalFilename = `${filename}.${extension}`
  await writeFile(`${outputDirectory}/${finalFilename}`, Buffer.from(match[2], 'base64'))
  return `/wedding-images/${finalFilename}`
}

content.heroImage = await extractImage(content.heroImage, 'hero')
content.bride.image = await extractImage(content.bride.image, 'bride')
content.groom.image = await extractImage(content.groom.image, 'groom')
content.galleryVideo.poster = await extractImage(content.galleryVideo.poster, 'video-poster')

for (let index = 0; index < content.gallery.length; index += 1) {
  content.gallery[index].src = await extractImage(content.gallery[index].src, `gallery-${index + 1}`)
}

await writeFile(sourcePath, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
console.log('Imágenes predeterminadas extraídas a public/wedding-images')
