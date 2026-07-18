import type { Metadata } from 'next'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Toaster } from '@/components/ui/toaster'
import { getCategories } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    default: 'Motocar - Peças e Oficina de Motos em Presidente Epitácio',
    template: '%s | Motocar',
  },
  description:
    'Peças, acessórios, manutenção e atendimento especializado para motociclistas em Presidente Epitácio e região.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://motocar.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Motocar',
    title: 'Motocar - Peças e Oficina de Motos em Presidente Epitácio',
    description:
      'Peças, acessórios, manutenção e atendimento especializado para motociclistas em Presidente Epitácio e região.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <Header categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  )
}
