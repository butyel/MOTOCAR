'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, calculateDiscount, isPromotionActive, buildWhatsAppUrl, cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { Product } from '@/types'
import { SITE_CONFIG } from '@/lib/constants'

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useStore()
  const isFavorite = state.favorites.includes(product.id)
  const discount = calculateDiscount(product.price, product.promotional_price)
  const isOnSale = product.promotional_price && isPromotionActive(product.promotional_ends_at)
  const primaryImage = product.images?.[0]

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
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
        quantity: 1,
        variant_id: null,
        variant_name: null,
      },
    })
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id })
  }

  const whatsappMessage = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Olá, gostaria de saber mais sobre o produto: ${product.name} (Cód: ${product.sku})`
  )

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-sm transition-all">
      <Link href={`/produtos/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-sm">
              Sem imagem
            </div>
          )}
          {discount && isOnSale && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
              -{discount}%
            </Badge>
          )}
          {product.is_new && !isOnSale && (
            <Badge variant="secondary" className="absolute top-2 left-2 bg-green-600 text-white text-xs">
              Novo
            </Badge>
          )}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-gray-900/80 px-3 py-1 rounded">
                Esgotado
              </span>
            </div>
          )}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors',
              isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            )}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            {product.brand_name || 'Motocar'}
          </p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
          {product.compatibilities && product.compatibilities.length > 0 && (
            <p className="text-xs text-gray-400 mb-2 line-clamp-1">
              {product.compatibilities[0].motorcycle_brand} {product.compatibilities[0].motorcycle_model}
            </p>
          )}
          <div className="flex items-baseline gap-1.5 mb-1">
            {isOnSale ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(product.promotional_price!)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="text-xs text-green-600 mb-2">
            {product.stock > 0 ? 'Disponível' : 'Sob consulta'}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3 flex gap-2">
        <Button
          size="sm"
          className="flex-1 text-xs"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Adicionar
        </Button>
        <a
          href={whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center justify-center h-9 w-9 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors shrink-0'
          )}
          aria-label="Comprar pelo WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
