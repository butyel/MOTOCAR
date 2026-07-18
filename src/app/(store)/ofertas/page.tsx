import { Metadata } from 'next'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getProducts } from '@/lib/data'
import { calculateDiscount } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Ofertas e Promoções',
  description: 'Aproveite as melhores ofertas e promoções em peças e acessórios para motos na Motocar. Preços especiais por tempo limitado.',
}

export default async function OfertasPage() {
  const { products } = await getProducts({ onSale: true, pageSize: 50 })

  const sorted = [...products].sort((a, b) => {
    const discA = calculateDiscount(a.price, a.promotional_price) || 0
    const discB = calculateDiscount(b.price, b.promotional_price) || 0
    return discB - discA
  })

  return (
    <>
      <Breadcrumbs items={[{ label: 'Ofertas' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Tag className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ofertas</h1>
            <p className="text-sm text-gray-500">
              {sorted.length} produtos com preços promocionais
            </p>
          </div>
        </div>
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhuma oferta disponível no momento.</p>
            <Link href="/produtos" className="text-red-600 hover:underline text-sm mt-2 inline-block">
              Ver todos os produtos
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
