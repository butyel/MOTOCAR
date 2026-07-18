import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Motocar',
    short_name: 'Motocar',
    description:
      'Peças, acessórios, manutenção e atendimento especializado para motociclistas em Presidente Epitácio e região.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    icons: [
      { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
