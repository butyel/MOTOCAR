'use client'

import { useRouter } from 'next/navigation'
import { MessageCircle, ShoppingBag, ArrowLeft, CreditCard, Truck, Store, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatPrice, buildWhatsAppUrl } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { SITE_CONFIG } from '@/lib/constants'

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useStore()
  const cartItems = state.cart

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.promotional_price || item.price
    return sum + price * item.quantity
  }, 0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  function getWhatsappMessage(): string {
    let msg = 'Olá, vim pelo site da Motocar e gostaria de finalizar este pedido:\n\n'
    cartItems.forEach((item) => {
      const price = item.promotional_price || item.price
      msg += `${item.quantity}x ${item.name}`
      if (item.variant_name) msg += ` (${item.variant_name})`
      msg += ` - ${formatPrice(price * item.quantity)}\n`
    })
    msg += `\nSubtotal: ${formatPrice(subtotal)}`
    msg += `\n\n*Dados para entrega:*`
    msg += `\n*Forma de pagamento:*`
    return msg
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: 'Finalizar compra' }]} />
        <EmptyState
          icon={<ShoppingBag className="h-16 w-16" />}
          title="Seu carrinho está vazio"
          description="Adicione produtos ao carrinho antes de finalizar a compra"
          action={{ label: 'Ver produtos', href: '/produtos' }}
        />
      </div>
    )
  }

  const isOnlineCheckout = SITE_CONFIG.enableOnlineCheckout

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs items={[{ label: 'Finalizar compra' }]} />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
            <div className="space-y-3">
              {cartItems.map((item) => {
                const price = item.promotional_price || item.price
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                      {item.variant_name && <span className="text-gray-400"> ({item.variant_name})</span>}
                    </span>
                    <span className="text-gray-900 font-medium">{formatPrice(price * item.quantity)}</span>
                  </div>
                )
              })}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Itens ({totalItems})</span>
                <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-gray-400">Calcular no orçamento</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg text-red-600">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Formas de Pagamento</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span>Cartão de crédito (débito ou crédito)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Store className="h-5 w-5 text-gray-400" />
                <span>Pix</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-gray-400" />
                <span>Dinheiro</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-gray-400" />
                <span>Transferência bancária</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Entrega</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Store className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Retirada na loja</p>
                  <p>{SITE_CONFIG.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Entrega</p>
                  <p>Consulte nossos valores e prazos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Finalizar Pedido</h2>
            <p className="text-sm text-gray-500">
              {isOnlineCheckout
                ? 'O checkout online está disponível.'
                : 'O checkout online está temporariamente desativado. Finalize seu pedido pelo WhatsApp.'}
            </p>
            <a
              href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, getWhatsappMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Finalizar pelo WhatsApp
            </a>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/carrinho')}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao carrinho
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Seu orçamento será respondido em breve
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
