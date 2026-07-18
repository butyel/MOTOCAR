import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { CreditCard, Landmark, Banknote, Smartphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Formas de Pagamento',
  description: 'Formas de pagamento aceitas na Motocar. Cartão de crédito, débito, Pix, dinheiro e transferência bancária.',
}

export default function PaymentMethodsPage() {
  const methods = [
    {
      icon: CreditCard,
      title: 'Cartão de Crédito',
      description: 'Aceitamos as principais bandeiras: Visa, Mastercard, Elo, American Express e Hipercard. Parcelamento em até 12x.',
    },
    {
      icon: CreditCard,
      title: 'Cartão de Débito',
      description: 'Aceitamos cartões de débito das principais bandeiras.',
    },
    {
      icon: Smartphone,
      title: 'Pix',
      description: 'Pagamento instantâneo via Pix. Aprovação imediata e sem custos adicionais.',
    },
    {
      icon: Banknote,
      title: 'Dinheiro',
      description: 'Aceitamos pagamento em dinheiro na loja física.',
    },
    {
      icon: Landmark,
      title: 'Transferência Bancária',
      description: 'Transferência ou depósito em conta corrente. Consulte nossos dados bancários.',
    },
  ]

  return (
    <>
      <Breadcrumbs items={[{ label: 'Formas de Pagamento' }]} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Formas de Pagamento</h1>
        <p className="text-gray-500 mb-6">
          Confira as formas de pagamento que aceitamos na Motocar
        </p>
        <div className="space-y-4">
          {methods.map((method, index) => {
            const Icon = method.icon
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{method.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
