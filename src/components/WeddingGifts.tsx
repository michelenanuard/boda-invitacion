import { Building2, ExternalLink, Gift } from 'lucide-react'
import type { WeddingGifts as WeddingGiftsContent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

export function WeddingGifts({ gifts }: { gifts: WeddingGiftsContent }) {
  return (
    <section id="regalos" className="section-band scroll-mt-24 bg-[#fffdf8]/74">
      <div className="section-shell">
        <SectionTitle eyebrow="Regalos de Boda" title="Su presencia es nuestro mejor regalo" description={gifts.message} />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="luxury-card rounded-[8px] p-6 sm:p-8">
            <Building2 className="mb-5 text-[#b88a43]" size={30} aria-hidden="true" />
            <h3 className="font-serif-display text-3xl font-semibold text-[#211b17]">Datos bancarios</h3>
            <dl className="mt-6 space-y-3 leading-7 text-[#6f655d]">
              <div><dt className="font-semibold text-[#394136]">Banco</dt><dd>{gifts.bank}</dd></div>
              <div><dt className="font-semibold text-[#394136]">Cuenta</dt><dd>{gifts.accountType} · Núm. {gifts.accountNumber}</dd></div>
              <div><dt className="font-semibold text-[#394136]">Titulares</dt><dd>{gifts.accountHolders}</dd></div>
              <div><dt className="font-semibold text-[#394136]">Cédula</dt><dd>{gifts.accountHolderId}</dd></div>
            </dl>
          </article>
          <article className="luxury-card flex flex-col rounded-[8px] p-6 sm:p-8">
            <Gift className="mb-5 text-[#b88a43]" size={30} aria-hidden="true" />
            <h3 className="font-serif-display text-3xl font-semibold text-[#211b17]">Lista de regalos</h3>
            <p className="mt-6 flex-1 leading-7 text-[#6f655d]">También hemos preparado una lista de bodas en Amazon.</p>
            <a href={gifts.registryUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#b88a43] px-6 py-3 font-semibold text-white transition hover:bg-[#9d7335] focus:outline-none focus:ring-2 focus:ring-[#b88a43] focus:ring-offset-2">
              Ver lista de regalos <ExternalLink size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
