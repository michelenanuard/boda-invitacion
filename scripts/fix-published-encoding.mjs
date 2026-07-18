import { readFile, writeFile } from 'node:fs/promises'
import { createClient } from '@supabase/supabase-js'

const parseEnv = (raw) => Object.fromEntries(
  raw.split(/\r?\n/).filter(Boolean).filter((line) => !line.trim().startsWith('#')).map((line) => {
    const index = line.indexOf('=')
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')]
  }),
)

const backupPath = 'respaldo-invitacion-boda.json'
const content = JSON.parse((await readFile(backupPath, 'utf8')).replace(/^\uFEFF/, ''))

content.ceremony.title = 'Ceremonia y recepci\u00f3n'
content.ceremony.address = 'Renaissance Santo Domingo Jaragua Hotel & Casino, avenida George Washington n\u00fam. 367, frente al emblem\u00e1tico Malec\u00f3n de Santo Domingo.'
content.reception.title = 'Recepci\u00f3n'
content.reception.venue = 'Sal\u00f3n Anacaona III'
content.reception.address = content.ceremony.address
content.bride.description = 'Con la bendici\u00f3n de Dios y el amor de nuestras familias, damos el paso m\u00e1s importante de nuestras vidas.'
content.bride.parents = 'Hija de Carlos Lapaix y Mar\u00eda Encarnaci\u00f3n'
content.groom.name = 'Marcos Michel\u00e9n'
content.groom.description = content.bride.description
content.groom.parents = 'Hijo de Winston Michel\u00e9n y Maribel Ram\u00edrez'
content.testimonials = [
  {
    name: 'Carlos Lapaix',
    relation: 'Padre de la novia',
    message: 'El amor es uno de los regalos m\u00e1s hermosos que Dios nos concede. Que su presencia sea siempre el fundamento de su hogar y la gu\u00eda de cada paso que den juntos.',
  },
  {
    name: 'Mar\u00eda Encarnaci\u00f3n',
    relation: 'Madre de la novia',
    message: 'Me hace muy feliz celebrar el inicio de esta nueva etapa, fruto de un amor genuino que hoy se fortalece con la promesa de caminar juntos para siempre.',
  },
]
content.faq = content.faq.map((item) => item.id === 'ceremonia' ? {
  ...item,
  question: '\u00bfD\u00f3nde ser\u00e1 la boda?',
  answer: 'La celebraci\u00f3n tendr\u00e1 lugar en el Renaissance Santo Domingo Jaragua Hotel & Casino (av. George Washington n\u00fam. 367). La ceremonia ser\u00e1 en el Palm Court y la recepci\u00f3n en el Sal\u00f3n Anacaona III. Puedes consultar la ubicaci\u00f3n en Google Maps.',
} : item)
content.gifts.message = 'Estamos muy agradecidos de compartir nuestra historia contigo y de recibir con amor la bendici\u00f3n que Dios ponga en tu coraz\u00f3n.'
content.gifts.accountHolders = 'Marcos Michel\u00e9n / Ana Lapaix'

await writeFile(backupPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8')

const env = parseEnv(await readFile('.env', 'utf8'))
const client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)
const found = await client.from('site_content').select('content').eq('id', 'main').single()
if (found.error) throw found.error

const current = found.data.content ?? {}
const next = {
  ...current,
  ceremony: { ...(current.ceremony ?? {}), ...content.ceremony },
  reception: { ...(current.reception ?? {}), ...content.reception },
  bride: { ...(current.bride ?? {}), name: content.bride.name, description: content.bride.description, parents: content.bride.parents },
  groom: { ...(current.groom ?? {}), name: content.groom.name, description: content.groom.description, parents: content.groom.parents },
  testimonials: content.testimonials,
  faq: content.faq,
  gifts: content.gifts,
}

const saved = await client.from('site_content').upsert({ id: 'main', content: next, updated_at: new Date().toISOString() }).select('updated_at').single()
if (saved.error) throw saved.error
console.log(`Contenido reparado: ${saved.data.updated_at}`)
