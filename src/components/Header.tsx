import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Monogram } from './Monogram'

interface HeaderProps {
  brideName: string
  groomName: string
  coupleDisplayName: string
  liveMessagesEnabled?: boolean
}

const leftNavItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Historia', href: '#historia' },
  { label: 'Galería', href: '#galeria' },
]

const rightNavItems = [
  { label: 'Detalles', href: '#detalles' },
  { label: 'Preguntas', href: '#preguntas' },
  { label: 'Mensajes', href: '/mensajes' },
  { label: 'RSVP', href: '#rsvp' },
]

export function Header({ brideName, groomName, coupleDisplayName, liveMessagesEnabled = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const visibleRightNavItems = liveMessagesEnabled
    ? rightNavItems
    : rightNavItems.filter((item) => item.href !== '/mensajes')
  const navItems = [...leftNavItems, ...visibleRightNavItems]

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#b88a43]/12 bg-[#fffdf8]/88 shadow-[0_10px_38px_rgba(33,27,23,0.045)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <nav className="hidden items-center justify-end gap-8 pr-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#6f655d] lg:flex">
          {leftNavItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[#b88a43]">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#inicio"
          className="inline-flex min-w-0 items-center gap-3 font-serif-display text-lg leading-none text-[#211b17] no-underline sm:text-xl lg:justify-center"
          onClick={closeMenu}
        >
          <Monogram brideName={brideName} groomName={groomName} className="h-12 w-12 text-[0.62rem]" />
          <span className="min-w-0 truncate lg:hidden">{coupleDisplayName}</span>
        </a>

        <nav className="hidden items-center gap-6 pl-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#6f655d] lg:flex">
          {visibleRightNavItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[#b88a43]">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b88a43]/20 bg-[#fffdf8]/85 text-[#211b17] shadow-sm lg:col-start-3 lg:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-[#b88a43]/15 bg-[#fffdf8]/96 px-4 py-4 shadow-lg shadow-stone-950/5 backdrop-blur-xl sm:px-6 lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-md px-3 py-3 text-left text-base font-medium text-[#394136] transition-colors hover:bg-[#f3eadb] hover:text-[#b88a43]"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
