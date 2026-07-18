'use client'

import { X, ShoppingCart, Trash2, Plus, Minus, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatPrice, buildWhatsAppUrl } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { SITE_CONFIG } from '@/lib/constants'

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, dispatch } = useStore()
  const cartItems = state.cart
  const total = cartItems.reduce((sum, item) => {
    const price = item.promotional_price || item.price
    return sum + price * item.quantity
  }, 0)

  function getWhatsappMessage(): string {
    let msg = 'Olá, vim pelo site da Motocar e gostaria de consultar este pedido:\n\n'
    cartItems.forEach((item) => {
      const price = item.promotional_price || item.price
      msg += `${item.quantity}x ${item.name} - ${formatPrice(price * item.quantity)}\n`
    })
    msg += `\nSubtotal: ${formatPrice(total)}`
    return msg
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Carrinho ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
                <p className="text-sm text-gray-400 mt-1 mb-4">
                  Adicione produtos para começar
                </p>
                <Button onClick={onClose} asChild>
                  <Link href="/produtos">Ver produtos</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cartItems.map((item) => {
                    const price = item.promotional_price || item.price
                    return (
                      <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-white shrink-0">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 text-xs">
                              Sem img
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          {item.variant_name && (
                            <p className="text-xs text-gray-400">{item.variant_name}</p>
                          )}
                          <p className="text-sm font-semibold text-red-600 mt-1">
                            {formatPrice(price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
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
                              className="p-0.5 text-gray-400 hover:text-gray-600"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
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
                              className="p-0.5 text-gray-400 hover:text-gray-600"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
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
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                          aria-label="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    O valor final será confirmado no orçamento
                  </p>
                  <Button asChild className="w-full" onClick={onClose}>
                    <Link href="/carrinho">Ver carrinho completo</Link>
                  </Button>
                  <a
                    href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, getWhatsappMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Finalizar pelo WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
