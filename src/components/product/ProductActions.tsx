'use client'

import { useState } from 'react'
import { ShoppingCart, MessageCircle, Heart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { buildWhatsAppUrl } from '@/lib/utils'
import { Product } from '@/types'
import { SITE_CONFIG } from '@/lib/constants'

export function ProductActions({ product }: { product: Product }) {
  const { state, dispatch } = useStore()
  const [quantity, setQuantity] = useState(1)
  const isFavorite = state.favorites.includes(product.id)
  const primaryImage = product.images?.[0]

  function handleAddToCart() {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: `${product.id}-${Date.now()}`,
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        image: primaryImage?.url || null,
        price: product.price,
        promotional_price: product.promotional_price,
        quantity,
        variant_id: null,
        variant_name: null,
      },
    })
  }

  function handleToggleFavorite() {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id })
  }

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Olá, gostaria de saber mais sobre o produto: ${product.name} (SKU: ${product.sku})`
  )

  const cartItem = state.cart.find(
    item => item.product_id === product.id && !item.variant_id
  )
  const cartQuantity = cartItem?.quantity || 0

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {cartQuantity > 0 && (
          <span className="text-xs text-gray-500">
            {cartQuantity} no carrinho
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock <= 0}>
          <ShoppingCart className="h-5 w-5" />
          Adicionar ao carrinho
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-12 px-5 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Comprar pelo WhatsApp</span>
        </a>
        <button
          onClick={handleToggleFavorite}
          className={`inline-flex items-center justify-center h-12 w-12 rounded-md border border-gray-300 transition-colors ${
            isFavorite ? 'text-red-500 border-red-300' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  )
}
