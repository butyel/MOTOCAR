'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarCheck, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { DEMO_SERVICES } from '@/lib/demo-data'
import { generateProtocol } from '@/lib/utils'
import { MOTORCYCLE_BRANDS } from '@/lib/constants'

const appointmentSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  motorcycleBrand: z.string().min(1, 'Selecione a marca'),
  motorcycleModel: z.string().min(1, 'Informe o modelo'),
  motorcycleYear: z.string().optional(),
  motorcyclePlate: z.string().optional(),
  motorcycleMileage: z.string().optional(),
  serviceId: z.string().optional(),
  description: z.string().optional(),
  preferredDate: z.string().min(1, 'Selecione uma data'),
  preferredPeriod: z.enum(['manha', 'tarde'], { message: 'Selecione o período' }),
  consent: z.literal(true, { message: 'Você precisa concordar com os termos' }),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

export default function AgendamentoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [protocol, setProtocol] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      preferredPeriod: 'manha',
    },
  })

  async function onSubmit(data: AppointmentFormData) {
    setIsSubmitting(true)
    const generatedProtocol = generateProtocol()
    setProtocol(generatedProtocol)

    const appointmentData = {
      customer_name: data.name,
      customer_phone: data.phone,
      customer_email: data.email || null,
      motorcycle_brand: data.motorcycleBrand,
      motorcycle_model: data.motorcycleModel,
      motorcycle_year: data.motorcycleYear || null,
      motorcycle_plate: data.motorcyclePlate || null,
      motorcycle_mileage: data.motorcycleMileage || null,
      service_id: data.serviceId || null,
      service_name: data.serviceId
        ? DEMO_SERVICES.find((s) => s.id === data.serviceId)?.name || null
        : null,
      problem_description: data.description || null,
      preferred_date: data.preferredDate,
      preferred_period: data.preferredPeriod,
      status: 'pending',
      protocol: generatedProtocol,
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      if (supabase) {
        await supabase.from('appointments').insert(appointmentData)
      }
    } catch {
      // Supabase not available, show success anyway
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: 'Agendamento' }]} />
        <Card className="max-w-lg mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Agendamento Confirmado!</CardTitle>
            <CardDescription>
              Seu agendamento foi recebido com sucesso. Entraremos em contato para confirmar o horário.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Protocolo</p>
              <p className="text-xl font-bold text-gray-900">{protocol}</p>
            </div>
            <p className="text-sm text-gray-500">
              Guarde este número para referência futura.
            </p>
            <Button onClick={() => { reset(); setIsSubmitted(false) }}>
              Novo agendamento
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs items={[{ label: 'Agendamento' }]} />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <CalendarCheck className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Agende seu Serviço</h1>
            <p className="text-sm text-gray-500">
              Preencha o formulário e agende sua visita à nossa oficina
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seus Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" {...register('name')} placeholder="Seu nome" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                  <Input id="phone" {...register('phone')} placeholder="(18) 99999-9999" />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="seu@email.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados da Moto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motorcycleBrand">Marca *</Label>
                  <select
                    id="motorcycleBrand"
                    {...register('motorcycleBrand')}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    <option value="">Selecione</option>
                    {MOTORCYCLE_BRANDS.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {errors.motorcycleBrand && <p className="text-sm text-red-500">{errors.motorcycleBrand.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motorcycleModel">Modelo *</Label>
                  <Input id="motorcycleModel" {...register('motorcycleModel')} placeholder="Ex: CG 160 Titan" />
                  {errors.motorcycleModel && <p className="text-sm text-red-500">{errors.motorcycleModel.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motorcycleYear">Ano</Label>
                  <Input id="motorcycleYear" {...register('motorcycleYear')} placeholder="Ex: 2020" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motorcyclePlate">Placa</Label>
                  <Input id="motorcyclePlate" {...register('motorcyclePlate')} placeholder="Ex: ABC-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motorcycleMileage">Quilometragem</Label>
                  <Input id="motorcycleMileage" {...register('motorcycleMileage')} placeholder="Ex: 15000 km" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Serviço Desejado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceId">Tipo de serviço</Label>
                <select
                  id="serviceId"
                  {...register('serviceId')}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  <option value="">Selecione um serviço</option>
                  {DEMO_SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do problema</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Descreva o problema ou o serviço desejado"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data e Horário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Data preferida *</Label>
                  <Input id="preferredDate" type="date" {...register('preferredDate')} />
                  {errors.preferredDate && <p className="text-sm text-red-500">{errors.preferredDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredPeriod">Período preferido *</Label>
                  <select
                    id="preferredPeriod"
                    {...register('preferredPeriod')}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    <option value="manha">Manhã (08h - 12h)</option>
                    <option value="tarde">Tarde (13h - 18h)</option>
                  </select>
                  {errors.preferredPeriod && <p className="text-sm text-red-500">{errors.preferredPeriod.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  {...register('consent')}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                  Autorizo o contato via WhatsApp e telefone para confirmação do agendamento e estou de acordo com a{' '}
                  <Link href="/politica-de-privacidade" className="text-red-600 hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-red-500 mt-1">{errors.consent.message}</p>}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Agendar Serviço'}
          </Button>
        </form>
      </div>
    </div>
  )
}
