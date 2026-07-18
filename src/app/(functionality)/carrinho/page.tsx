'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, MessageCircle, ArrowLeft, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatPrice, buildWhatsAppUrl } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { SITE_CONFIG } from '@/lib/constants'
import { useState } from 'react'

export default function CartPage() {
  const { state, dispatch } = useStore()
  const [couponCode, setCouponCode] = useState('')
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
        <Breadcrumbs items={[{ label: 'Carrinho' }]} />
        <EmptyState
          icon={<ShoppingCart className="h-16 w-16" />}
          title="Seu carrinho está vazio"
          description="Adicione produtos para começar sua compra"
          action={{ label: 'Ver produtos', href: '/produtos' }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs items={[{ label: 'Carrinho' }]} />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Carrinho de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const price = item.promotional_price || item.price
            return (
              <div key={item.id} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-xs">
                      Sem img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {item.variant_name && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.variant_name}</p>
                  )}
                  <p className="text-sm font-semibold text-red-600 mt-1">{formatPrice(price)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_CART_QUANTITY',
                            payload: {
                              productId: item.product_id,
                              variantId: item.variant_id ?? undefined,
                              quantity: item.quantity - 1,
                            },
                          })
                        }
                        className="p-1.5 text-gray-400 hover:text-gray-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_CART_QUANTITY',
                            payload: {
                              productId: item.product_id,
                              variantId: item.variant_id ?? undefined,
                              quantity: item.quantity + 1,
                            },
                          })
                        }
                        className="p-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: {
                            productId: item.product_id,
                            variantId: item.variant_id ?? undefined,
                          },
                        })
                      }
                      className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{formatPrice(price * item.quantity)}</p>
                </div>
              </div>
            )
          })}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/produtos">
                <ArrowLeft className="h-4 w-4" />
                Continuar comprando
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              <Trash2 className="h-4 w-4" />
              Limpar carrinho
            </Button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Resumo</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Itens ({totalItems})</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Frete</span>
                <span className="text-gray-400">Calcular no orçamento</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Subtotal</span>
                <span className="font-bold text-lg text-gray-900">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Tag className="h-4 w-4" />
                Cupom de desconto
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Digite o cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline" size="sm" className="shrink-0">
                  Aplicar
                </Button>
              </div>
            </div>
            <Separator />
            <a
              href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, getWhatsappMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Finalizar pelo WhatsApp
            </a>
            <Button asChild variant="outline" className="w-full">
              <Link href="/checkout">Finalizar compra online</Link>
            </Button>
            <p className="text-xs text-gray-400 text-center">
              O valor final será confirmado no orçamento
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
