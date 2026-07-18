'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    `Olá, gostaria de saber mais sobre: ${product.name} (Cód: ${product.sku})`
  )

  return (
    <div className="group relative border border-motocar-light-gray bg-white hover:border-motocar-red transition-colors">
      <Link href={`/produtos/${product.slug}`} className="block">
        <div className="relative aspect-square bg-motocar-off-white overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-motocar-gray text-xs font-semibold uppercase tracking-wider">
              Sem imagem
            </div>
          )}
          {discount && isOnSale && (
            <span className="absolute top-2 left-2 bg-motocar-red text-white text-[10px] font-bold px-1.5 py-0.5 leading-tight">
              -{discount}%
            </span>
          )}
          {product.is_new && !isOnSale && (
            <span className="absolute top-2 left-2 bg-motocar-green text-white text-[10px] font-bold px-1.5 py-0.5 leading-tight">
              Novo
            </span>
          )}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-motocar-graphite/60 flex items-center justify-center">
              <span className="text-white font-bold text-xs bg-motocar-dark px-2 py-1">
                Esgotado
              </span>
            </div>
          )}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-2 right-2 p-1 border transition-colors',
              isFavorite ? 'bg-motocar-red border-motocar-red text-white' : 'bg-white/90 border-motocar-light-gray text-motocar-gray hover:text-motocar-red hover:border-motocar-red'
            )}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={cn('h-3.5 w-3.5', isFavorite && 'fill-current')} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-[10px] text-motocar-gray font-semibold uppercase tracking-wider mb-0.5">
            {product.brand_name || 'Motocar'}
          </p>
          <h3 className="text-sm font-semibold text-motocar-graphite line-clamp-2 mb-0.5 leading-snug">
            {product.name}
          </h3>
          {product.compatibilities && product.compatibilities.length > 0 && (
            <p className="text-[11px] text-motocar-gray line-clamp-1 mb-1">
              {product.compatibilities[0].motorcycle_brand} {product.compatibilities[0].motorcycle_model}
            </p>
          )}
          <p className="text-[10px] text-motocar-gray font-mono mb-1.5">
            SKU: {product.sku}
          </p>
          <div className="flex items-baseline gap-1.5 mb-1">
            {isOnSale ? (
              <>
                <span className="text-base font-bold text-motocar-red">
                  {formatPrice(product.promotional_price!)}
                </span>
                <span className="text-[11px] text-motocar-gray line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-motocar-graphite">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-motocar-green font-medium">
            {product.stock > 0 ? 'Disponível' : 'Sob consulta'}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3 flex gap-1.5">
        <Button
          size="sm"
          className="flex-1 text-[11px]"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="h-3 w-3" />
          Adicionar
        </Button>
        <a
          href={whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-8 w-8 border border-motocar-light-gray text-motocar-green hover:border-motocar-green hover:bg-motocar-green hover:text-white transition-colors shrink-0"
          aria-label="Consultar pelo WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
