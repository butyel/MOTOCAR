import { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getProducts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Novidades em Peças para Motos',
  description: 'Confira os lançamentos e novidades em peças e acessórios para motos na Motocar. Produtos novos toda semana.',
}

export default async function NovidadesPage() {
  const { products } = await getProducts({ isNew: true, pageSize: 50 })

  return (
    <>
      <Breadcrumbs items={[{ label: 'Novidades' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Novidades</h1>
            <p className="text-sm text-gray-500">
              {products.length} produtos novos adicionados
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhuma novidade no momento.</p>
            <Link href="/produtos" className="text-red-600 hover:underline text-sm mt-2 inline-block">
              Ver todos os produtos
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
