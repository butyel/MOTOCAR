import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Wrench, Clock, DollarSign, CheckCircle, ArrowLeft, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getServiceBySlug } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Serviço não encontrado' }
  return {
    title: `${service.name} | Motocar`,
    description: service.summary || `${service.name} na Motocar em Presidente Epitácio`,
  }
}

export default async function ServicoPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Serviços', href: '/servicos' },
          { label: service.name },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{service.name}</h1>
              {service.summary && (
                <p className="text-gray-500 mt-1">{service.summary}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                {service.duration && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {service.duration}
                  </Badge>
                )}
                {service.price_min && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    A partir de {formatPrice(service.price_min)}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          {service.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre o Serviço</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          )}

          {service.benefits && service.benefits.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Benefícios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Agende este serviço</h2>
          <p className="text-sm text-gray-600 mb-4">
            Leve sua moto para nossa oficina em Presidente Epitácio
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/agendamento">
                <CalendarCheck className="h-4 w-4" />
                Agendar serviço
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contato">
                <ArrowLeft className="h-4 w-4" />
                Entrar em contato
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
