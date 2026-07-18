import { Metadata } from 'next'
import { Search } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { getProducts } from '@/lib/data'
import { Product } from '@/types'

export const metadata: Metadata = {
  title: 'Busca de Produtos',
  description: 'Encontre peças e acessórios para sua moto na Motocar.',
}

export default async function SearchPage(props: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await props.searchParams
  const query = q || ''

  let products: Product[] = []
  if (query) {
    const result = await getProducts({ search: query, pageSize: 50 })
    products = result.products
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Busca' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {query ? `Resultados para "${query}"` : 'Buscar Produtos'}
          </h1>
          {query && (
            <p className="text-sm text-gray-500 mt-1">
              {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          )}
        </div>
        {!query ? (
          <EmptyState
            icon={<Search className="h-16 w-16" />}
            title="Faça uma busca"
            description="Digite o nome do produto, marca ou código no campo de busca acima"
          />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Search className="h-16 w-16" />}
            title="Nenhum resultado encontrado"
            description={`Não encontramos resultados para "${query}". Tente outros termos.`}
            action={{ label: 'Ver todos os produtos', href: '/produtos' }}
          />
        )}
      </div>
    </>
  )
}
