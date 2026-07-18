import { Store, HeadphonesIcon, ShieldCheck, MessageCircle } from 'lucide-react'

const benefits = [
  { icon: Store, title: 'Retirada na loja', description: 'Compre online e retire em Presidente Epitácio' },
  { icon: HeadphonesIcon, title: 'Atendimento especializado', description: 'Equipe pronta para ajudar na escolha' },
  { icon: ShieldCheck, title: 'Compra segura', description: 'Ambiente protegido e dados seguros' },
  { icon: MessageCircle, title: 'Orçamento rápido', description: 'Solicite orçamento pelo WhatsApp' },
]

export function BenefitsBar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{benefit.title}</p>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
