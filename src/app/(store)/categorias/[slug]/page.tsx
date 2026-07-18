import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getProducts, getCategoryBySlug, getCategories } from '@/lib/data'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Categoria não encontrada' }
  return {
    title: `${category.name} | Motocar`,
    description: category.description || `Produtos da categoria ${category.name} na Motocar`,
  }
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const { products } = await getProducts({ categorySlug: slug, pageSize: 50 })
  const categories = await getCategories()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Produtos', href: '/produtos' },
          { label: category.name },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{products.length} produtos encontrados</p>
          </div>
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
                        className={`block text-sm py-1 transition-colors ${
                          cat.slug === slug ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'
                        }`}
                      >
                        {cat.name}
                      </Link>
                      {cat.children && cat.children.length > 0 && (
                        <ul className="ml-4 space-y-0.5 mt-0.5">
                          {cat.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={`/categorias/${child.slug}`}
                                className={`block text-sm py-0.5 transition-colors ${
                                  child.slug === slug ? 'text-red-600 font-medium' : 'text-gray-500 hover:text-red-600'
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                <Link href="/produtos" className="text-red-600 hover:underline text-sm mt-2 inline-block">
                  Ver todos os produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
