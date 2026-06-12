import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [, , inputArg, outputArg] = process.argv

if (!inputArg) {
  console.error('Uso: npm run content:apply -- <respaldo.json>')
  process.exit(1)
}

const inputPath = resolve(process.cwd(), inputArg)
const outputPath = resolve(process.cwd(), outputArg ?? 'src/data/weddingData.ts')

function assertWeddingContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    throw new Error('El respaldo no contiene un objeto valido.')
  }

  const requiredStringFields = ['brideName', 'groomName', 'coupleDisplayName', 'weddingDate', 'weddingTime', 'displayDate']

  for (const field of requiredStringFields) {
    if (typeof content[field] !== 'string') {
      throw new Error(`El respaldo no contiene el campo requerido "${field}".`)
    }
  }
}

const rawContent = (await readFile(inputPath, 'utf8')).replace(/^\uFEFF/, '')
const content = JSON.parse(rawContent)

assertWeddingContent(content)

const fileContent = `import type { WeddingData } from '../types/wedding'

export const weddingData: WeddingData = ${JSON.stringify(content, null, 2)}

export const defaultWeddingContent = weddingData

export default weddingData
`

await writeFile(outputPath, fileContent, 'utf8')

console.log(`Contenido aplicado en ${outputPath}`)
