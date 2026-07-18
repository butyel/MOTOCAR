import { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getServices } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Serviços para Motos',
  description: 'Oficina especializada em manutenção de motos em Presidente Epitácio. Revisão, troca de óleo, freios, pneus, elétrica e muito mais.',
}

export default async function ServicosPage() {
  const services = await getServices()

  return (
    <>
      <Breadcrumbs items={[{ label: 'Serviços' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Nossos Serviços</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manutenção especializada para sua motocicleta em Presidente Epitácio
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicos/${service.slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-red-200 hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Wrench className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                {service.name}
              </h2>
              {service.summary && (
                <p className="text-sm text-gray-500 mb-4">{service.summary}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                {service.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                )}
                {service.price_min && (
                  <span className="flex items-center gap-1 font-semibold text-red-600">
                    <DollarSign className="h-4 w-4" />
                    A partir de {formatPrice(service.price_min)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 bg-gray-50 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Não encontrou o serviço que precisa?</h2>
          <p className="text-sm text-gray-500 mb-4">
            Entre em contato conosco e faremos um orçamento personalizado
          </p>
          <Button asChild>
            <Link href="/contato">Fale conosco</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
