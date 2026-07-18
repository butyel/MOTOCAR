import { Metadata } from 'next'
import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getProducts, getCategories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Produtos para Motos',
  description:
    'Encontre peças, acessórios e componentes para sua moto na Motocar. Pastilhas de freio, relação, óleo, filtros, pneus, baterias e muito mais.',
}

export default async function ProductsPage() {
  const { products } = await getProducts({ pageSize: 24 })
  const categories = await getCategories()

  return (
    <>
      <Breadcrumbs items={[{ label: 'Produtos' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Produtos</h1>
            <p className="text-sm text-gray-500 mt-1">{products.length} produtos encontrados</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2 hover:border-red-300 hover:text-red-600 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Categorias</h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/categorias/${cat.slug}`}
                        className="block text-sm text-gray-600 hover:text-red-600 py-1 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Preço</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="R$ min"
                    className="w-full h-9 rounded-md border border-gray-300 px-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="R$ max"
                    className="w-full h-9 rounded-md border border-gray-300 px-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Disponibilidade</h3>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Em estoque
                </label>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <select className="h-9 rounded-md border border-gray-300 px-3 text-sm text-gray-600">
                <option>Relevância</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Mais recentes</option>
                <option>Maior desconto</option>
                <option>Nome</option>
              </select>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">Nenhum produto encontrado.</p>
                <Link href="/produtos" className="text-red-600 hover:underline text-sm mt-2 inline-block">
                  Limpar filtros
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
