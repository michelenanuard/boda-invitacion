import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  coupleDisplayName: string
}

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nuestra Historia', href: '#historia' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Preguntas', href: '#preguntas' },
  { label: 'RSVP', href: '#rsvp' },
]

export function Header({ coupleDisplayName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/75 shadow-sm shadow-stone-950/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#inicio"
          className="inline-flex items-center gap-2 font-serif-display text-xl text-stone-900 no-underline"
          onClick={closeMenu}
        >
          <Heart className="h-5 w-5 fill-rose-200 text-rose-400" aria-hidden="true" />
          <span>{coupleDisplayName}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-700 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-rose-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#rsvp"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-800"
          >
            Confirmar Asistencia
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/85 text-stone-900 shadow-sm lg:hidden"
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
          className="border-t border-stone-200/80 bg-white/95 px-5 py-5 shadow-lg shadow-stone-950/5 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-left text-base font-medium text-stone-800 transition-colors hover:bg-rose-50 hover:text-rose-800"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#rsvp"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm"
              onClick={closeMenu}
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Confirmar Asistencia
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
