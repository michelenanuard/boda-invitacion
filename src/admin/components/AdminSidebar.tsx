import {
  CalendarHeart,
  FileQuestion,
  GalleryHorizontal,
  Heart,
  Home,
  Image,
  LogOut,
  MessageSquareQuote,
  Palette,
  PanelLeft,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', href: '/admin', icon: Home },
  { label: 'Datos generales', href: '/admin/general', icon: PanelLeft },
  { label: 'Portada', href: '/admin/hero', icon: Image },
  { label: 'Ceremonia y recepción', href: '/admin/events', icon: CalendarHeart },
  { label: 'Los novios', href: '/admin/couple', icon: Users },
  { label: 'Nuestra historia', href: '/admin/story', icon: Heart },
  { label: 'Galería', href: '/admin/gallery', icon: GalleryHorizontal },
  { label: 'Mensajes', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Preguntas frecuentes', href: '/admin/faq', icon: FileQuestion },
  { label: 'Footer', href: '/admin/footer', icon: PanelLeft },
  { label: 'Estilo visual', href: '/admin/theme', icon: Palette },
  { label: 'Vista previa', href: '/admin/preview', icon: Image },
]

type AdminSidebarProps = {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <aside className="border-r border-stone-200 bg-white p-4 lg:sticky lg:top-0 lg:h-screen">
      <div className="mb-6 px-2">
        <p className="font-serif-display text-2xl font-semibold text-stone-950">Panel de boda</p>
        <p className="mt-1 text-xs leading-5 text-stone-500">Edita tu invitación sin tocar código.</p>
      </div>
      <nav className="grid gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-semibold transition ${
                isActive ? 'bg-[#fbf6ec] text-[#b88a43]' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          className="mt-4 flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}
