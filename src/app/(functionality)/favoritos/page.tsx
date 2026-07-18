'use client'

import { Heart } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { useStore } from '@/lib/store'
import { DEMO_PRODUCTS } from '@/lib/demo-data'

export default function FavoritesPage() {
  const { state } = useStore()
  const favoriteIds = state.favorites
  const favoriteProducts = DEMO_PRODUCTS.filter((p) => favoriteIds.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs items={[{ label: 'Favoritos' }]} />
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <Heart className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Favoritos</h1>
          <p className="text-sm text-gray-500">{favoriteProducts.length} produtos favoritados</p>
        </div>
      </div>
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="h-16 w-16" />}
          title="Nenhum favorito ainda"
          description="Salve seus produtos favoritos para encontrá-los facilmente depois"
          action={{ label: 'Ver produtos', href: '/produtos' }}
        />
      )}
    </div>
  )
}
