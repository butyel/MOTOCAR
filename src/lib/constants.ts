export const SITE_CONFIG = {
  name: 'Motocar',
  fullName: 'Motocar - Oficina de Motos e Motopeças',
  description:
    'Peças, acessórios, manutenção e atendimento especializado para motociclistas em Presidente Epitácio e região.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://motocar.com.br',
  phone: '(18) 3281-7353',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '551832817353',
  email: 'contato@motocar.com.br',
  address: {
    street: 'Av. Presidente Vargas',
    number: '4-03',
    neighborhood: 'Centro',
    city: 'Presidente Epitácio',
    state: 'SP',
    zipcode: '19470-000',
    full: 'Av. Presidente Vargas, 4-03 - Centro, Presidente Epitácio - SP',
  },
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    'https://maps.google.com/?q=Av.+Presidente+Vargas,+4-03,+Centro,+Presidente+Epitácio,+SP',
  businessHours: {
    weekday: 'Seg a Sex: 08h - 18h',
    saturday: 'Sáb: 08h - 12h',
    sunday: 'Dom: Fechado',
  },
  cnpj: '59.002.817/0001-41',
  social: {
    instagram: 'https://instagram.com/motocar.epitacio',
    facebook: '#',
    youtube: '#',
  },
  enableOnlineCheckout:
    process.env.NEXT_PUBLIC_ENABLE_ONLINE_CHECKOUT === 'true',
} as const

export const MOTORCYCLE_BRANDS = [
  'Honda',
  'Yamaha',
  'Suzuki',
  'Kawasaki',
  'Harley-Davidson',
  'BMW',
  'Triumph',
  'Dafra',
  'Kasinski',
  'Shineray',
  'Haojue',
  'Royal Enfield',
]

export const NAV_LINKS = [
  { name: 'Peças', href: '/produtos' },
  { name: 'Acessórios', href: '/categorias/acessorios' },
  { name: 'Pneus', href: '/categorias/pneus-e-camaras' },
  { name: 'Lubrificantes', href: '/categorias/lubrificantes' },
  { name: 'Capacetes', href: '/categorias/capacetes' },
  { name: 'Oficina', href: '/servicos' },
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '/contato' },
] as const

export const POPULAR_CATEGORIES = [
  { id: 'cat-2', number: '01', name: 'Freios', slug: 'sistema-de-freio' },
  { id: 'cat-3', number: '02', name: 'Relação e Transmissão', slug: 'transmissao-e-relacao' },
  { id: 'cat-7', number: '03', name: 'Óleos e Lubrificantes', slug: 'lubrificantes' },
  { id: 'cat-6', number: '04', name: 'Filtros', slug: 'filtros' },
  { id: 'cat-5', number: '05', name: 'Pneus', slug: 'pneus-e-camaras' },
  { id: 'cat-8', number: '06', name: 'Baterias', slug: 'baterias' },
  { id: 'cat-4', number: '07', name: 'Elétrica', slug: 'eletrica-e-ignicao' },
  { id: 'cat-12', number: '08', name: 'Iluminação', slug: 'farois-e-iluminacao' },
  { id: 'cat-1', number: '09', name: 'Motor', slug: 'motor-e-mecanica' },
  { id: 'cat-9', number: '10', name: 'Acessórios', slug: 'acessorios' },
] as const
