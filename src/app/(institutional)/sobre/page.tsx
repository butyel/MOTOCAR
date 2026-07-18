import { Metadata } from 'next'
import { MapPin, Phone, MessageCircle, Clock, Wrench, Users, Award } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sobre a Motocar',
  description:
    'Conheça a Motocar, sua oficina de motos e loja de peças em Presidente Epitácio. Qualidade e atendimento especializado para sua motocicleta.',
}

export default async function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Sobre' }]} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Sobre a Motocar</h1>

        <div className="space-y-8">
          <section>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                A <strong>Motocar</strong> é uma oficina de motos e loja de peças localizada em Presidente Epitácio, SP. 
                Oferecemos peças, acessórios, manutenção e atendimento especializado para motociclistas da região.
              </p>
              <p>
                Nosso objetivo é oferecer produtos de qualidade e serviços confiáveis, com transparência e 
                atendimento próximo. Trabalhamos para que cada cliente encontre a peça certa ou o serviço 
                adequado para sua moto, seja para uso diário, viagens ou lazer.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Oficina Especializada</h3>
              <p className="text-sm text-gray-500">Manutenção preventiva e corretiva para sua motocicleta</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Atendimento Personalizado</h3>
              <p className="text-sm text-gray-500">Suporte antes e depois da compra com orientação técnica</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Qualidade Garantida</h3>
              <p className="text-sm text-gray-500">Produtos de marcas reconhecidas e serviços com garantia</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nossa História</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                A Motocar nasceu da paixão por motos e do desejo de oferecer um atendimento diferenciado 
                para motociclistas em Presidente Epitácio e região. Com uma equipe experiente e dedicada, 
                buscamos sempre a melhor solução para cada cliente.
              </p>
              <p>
                Ao longo dos anos, construímos uma relação de confiança com nossos clientes, oferecendo 
                produtos de qualidade, serviços transparentes e um atendimento que vai além da venda.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Missão, Visão e Valores</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Missão</h3>
                <p className="text-sm text-gray-600">
                  Oferecer peças e serviços de qualidade para motociclistas, com atendimento próximo e transparente.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Visão</h3>
                <p className="text-sm text-gray-600">
                  Ser referência em peças e serviços para motos em Presidente Epitácio e região.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Valores</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mt-2">
                  <li>Compromisso com a qualidade</li>
                  <li>Transparência e honestidade</li>
                  <li>Atendimento humanizado</li>
                  <li>Responsabilidade com a segurança</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nossa Estrutura</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                Nossa oficina conta com estrutura e equipamentos para realizar diagnósticos precisos 
                e serviços de qualidade. Dispomos de peças de diversas marcas e categorias, 
                desde itens de reposição básica até componentes específicos.
              </p>
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Localização</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Endereço</p>
                  <p className="text-gray-500">{SITE_CONFIG.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-gray-500 hover:text-red-600">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MessageCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    Fale conosco
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Horários</p>
                  <p className="text-gray-500">{SITE_CONFIG.businessHours.weekday}</p>
                  <p className="text-gray-500">{SITE_CONFIG.businessHours.saturday}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
