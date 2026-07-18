import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getBrandBySlug, getProducts } from '@/lib/data'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const brand = await getBrandBySlug(slug)
  if (!brand) return { title: 'Marca não encontrada' }
  return {
    title: `Peças ${brand.name} | Motocar`,
    description: brand.description || `Produtos da marca ${brand.name} na Motocar`,
  }
}

export default async function BrandPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const brand = await getBrandBySlug(slug)
  if (!brand) notFound()

  const { products } = await getProducts({ brandSlug: slug, pageSize: 50 })

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Marcas', href: '/marcas' },
          { label: brand.name },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/marcas" className="text-sm text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Voltar
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{brand.name}</h1>
            {brand.description && (
              <p className="text-sm text-gray-500 mt-1">{brand.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">{products.length} produtos encontrados</p>
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
            <p className="text-gray-500">Nenhum produto encontrado para esta marca.</p>
            <Link href="/marcas" className="text-red-600 hover:underline text-sm mt-2 inline-block">
              Ver todas as marcas
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
