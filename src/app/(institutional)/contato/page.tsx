import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, MessageCircle, Clock, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Motocar. Tire dúvidas, solicite orçamentos ou agende serviços pelo WhatsApp, telefone ou e-mail.',
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contato' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Fale Conosco</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Endereço</p>
                    <p className="text-sm text-gray-500">{SITE_CONFIG.address.full}</p>
                    <a
                      href={SITE_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-600 hover:underline"
                    >
                      Ver no mapa
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Telefone</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-gray-500 hover:text-red-600">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      Fale conosco pelo WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-gray-500 hover:text-red-600">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Horários de Funcionamento</p>
                    <p className="text-sm text-gray-500">{SITE_CONFIG.businessHours.weekday}</p>
                    <p className="text-sm text-gray-500">{SITE_CONFIG.businessHours.saturday}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg h-[250px] flex items-center justify-center text-gray-400 text-sm">
              Mapa do Google Maps
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Envie sua Mensagem</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(18) 99999-9999" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Ex: Orçamento, dúvida, agendamento..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Digite sua mensagem" rows={5} required />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Ao enviar, você concorda com nossa{' '}
                <Link href="/politica-de-privacidade" className="text-red-600 hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
