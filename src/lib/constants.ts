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

export const CATEGORY_ICONS: Record<string, string> = {
  'motor-e-mecanica': 'wrench',
  'eletrica-e-ignicao': 'zap',
  'sistema-de-freio': 'circle-slash',
  'transmissao-e-relacao': 'git-compare',
  'pneus-e-camaras': 'circle',
  'rodas-aros-e-raios': 'hexagon',
  suspensao: 'chevrons-up-down',
  filtros: 'filter',
  lubrificantes: 'droplet',
  carenagens: 'shield',
  'farois-e-iluminacao': 'sun',
  'cabos-e-manetes': 'minus',
  baterias: 'battery-charging',
  escapamentos: 'radius',
  acessorios: 'backpack',
  capacetes: 'helmet',
  vestuario: 'shirt',
  ferramentas: 'tool',
  ofertas: 'tag',
  novidades: 'sparkles',
}

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

export const SERVICE_HIGHLIGHTS = [
  'Atendimento especializado',
  'Peças para diferentes modelos',
  'Oficina em Presidente Epitácio',
  'Orçamento transparente',
  'Manutenção preventiva e corretiva',
  'Suporte antes e depois da compra',
]
