import type { WeddingData } from '../types/wedding'

export const weddingData: WeddingData = {
  brideName: 'Amelia',
  groomName: 'James',
  coupleDisplayName: 'Amelia & James',
  weddingDate: '2026-12-12',
  weddingTime: '17:30',
  displayDate: 'Sábado 12 de diciembre de 2026',
  hashtag: '#AmeliaYJames',
  heroTitle: 'Amelia & James',
  heroSubtitle: 'Nos encantaría compartir este día especial contigo',
  heroImage:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85',
  ceremony: {
    title: 'Ceremonia',
    time: '5:30 PM',
    venue: 'Capilla Santa Clara',
    address: 'Avenida Jardines 124, Santo Domingo',
    mapUrl: 'https://maps.google.com/?q=Capilla+Santa+Clara',
    note: 'Por favor llega 20 minutos antes para ubicarte con calma.',
  },
  reception: {
    title: 'Recepción',
    time: '7:30 PM',
    venue: 'Hacienda Las Rosas',
    address: 'Camino del Lago 45, Santo Domingo',
    mapUrl: 'https://maps.google.com/?q=Hacienda+Las+Rosas',
    note: 'Cena, brindis y baile después de la ceremonia.',
  },
  bride: {
    name: 'Amelia Rose',
    role: 'bride',
    roleLabel: 'La novia',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
    description:
      'Creativa, serena y amante de los detalles simples que hacen memorable cada momento.',
    parents: 'Hija de Eleanor y Thomas Rose',
  },
  groom: {
    name: 'James Carter',
    role: 'groom',
    roleLabel: 'El novio',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    description:
      'Leal, alegre y convencido de que las mejores historias empiezan con una conversación honesta.',
    parents: 'Hijo de Margaret y William Carter',
  },
  story: [
    {
      year: '2020',
      title: 'Primer encuentro',
      description:
        'Una tarde tranquila, una mesa compartida y una conversación que ninguno de los dos quiso terminar.',
    },
    {
      year: '2021',
      title: 'Primera cita',
      description:
        'Cena, risas y la certeza de haber encontrado a alguien con quien todo se sentía natural.',
    },
    {
      year: '2025',
      title: 'La propuesta',
      description:
        'Bajo luces cálidas y con la familia cerca, llegó la pregunta que cambió el rumbo de nuestra historia.',
    },
    {
      year: '2026',
      title: 'El gran día',
      description:
        'Celebraremos el amor, la familia y el inicio de una nueva vida juntos.',
    },
  ],
  gallery: [
    {
      id: 'paseo',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
      alt: 'Pareja caminando en una boda',
      caption: 'Un paseo para recordar',
    },
    {
      id: 'decoracion',
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85',
      alt: 'Mesa elegante de recepción',
      caption: 'Detalles de la celebración',
    },
    {
      id: 'ramo',
      src: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1000&q=85',
      alt: 'Ramo de novia con flores blancas',
      caption: 'Flores y promesas',
    },
    {
      id: 'anillos',
      src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85',
      alt: 'Anillos de boda',
      caption: 'Símbolos de una promesa',
    },
    {
      id: 'venue',
      src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85',
      alt: 'Decoración romántica de boda',
      caption: 'La atmósfera del día',
    },
    {
      id: 'ceremonia',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85',
      alt: 'Ceremonia al aire libre',
      caption: 'El camino al altar',
    },
    {
      id: 'pastel',
      src: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=85',
      alt: 'Pastel blanco de boda',
      caption: 'Dulce celebración',
    },
    {
      id: 'baile',
      src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85',
      alt: 'Invitados bailando bajo luces cálidas',
      caption: 'Nuestro primer baile',
    },
  ],
  testimonials: [
    {
      message:
        'Verlos construir una historia tan bonita ha sido un regalo para toda la familia.',
      name: 'Nolan Racine',
      relation: 'Padre de la novia',
    },
    {
      message:
        'Su amor se nota en la calma, en la risa y en la forma en que se cuidan cada día.',
      name: 'Jensen Cameron',
      relation: 'Madre del novio',
    },
    {
      message:
        'No puedo esperar para celebrar este capítulo con ustedes. Será inolvidable.',
      name: 'Susan Aguilar',
      relation: 'Mejor amiga',
    },
  ],
  faq: [
    {
      id: 'vestimenta',
      question: '¿Cuál es el código de vestimenta?',
      answer:
        'Formal elegante. Sugerimos tonos neutros, pasteles o colores sobrios para acompañar la estética de la celebración.',
    },
    {
      id: 'acompanante',
      question: '¿Puedo llevar acompañante?',
      answer:
        'Por favor revisa tu invitación. Si incluye acompañante, podrás indicarlo al confirmar asistencia.',
    },
    {
      id: 'ceremonia',
      question: '¿Dónde será la ceremonia?',
      answer:
        'La ceremonia será en la Capilla Santa Clara. Puedes abrir la ubicación desde el botón de Google Maps.',
    },
    {
      id: 'parqueo',
      question: '¿Hay parqueo?',
      answer:
        'Sí, la recepción cuenta con parqueo privado y personal de apoyo para orientar a los invitados.',
    },
    {
      id: 'fecha-limite',
      question: '¿Hasta cuándo puedo confirmar?',
      answer: 'Agradecemos confirmar asistencia antes del 14 de noviembre de 2026.',
    },
  ],
  rsvp: {
    title: 'Confirma tu asistencia',
    description: 'Tu respuesta nos ayuda a preparar cada detalle con cariño.',
    successMessage: 'Gracias por confirmar. Hemos recibido tu respuesta.',
    submitLabel: 'Enviar RSVP',
    attendanceOptions: [
      { label: 'Sí asistiré', value: 'si' },
      { label: 'No podré asistir', value: 'no' },
    ],
  },
  contact: {
    email: 'confirmaciones@ameliayjames.com',
    phone: '+1 809 555 0184',
    location: 'Santo Domingo, República Dominicana',
  },
  theme: {
    ivory: '#fffaf0',
    paper: '#fffdf8',
    linen: '#e9dcc8',
    gold: '#b98d4b',
    ink: '#2d2722',
    muted: '#766b60',
  },
}

export default weddingData
