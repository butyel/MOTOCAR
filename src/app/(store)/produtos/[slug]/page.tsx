import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Truck, Store, ShieldCheck, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductActions } from '@/components/product/ProductActions'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import { formatPrice, calculateDiscount, isPromotionActive, formatInstallment } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Produto não encontrado' }
  return {
    title: product.meta_title || `${product.name} | Motocar`,
    description: product.meta_description || product.short_description || '',
  }
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.id, product.category_id ?? undefined)
  const discount = calculateDiscount(product.price, product.promotional_price)
  const isOnSale = product.promotional_price && isPromotionActive(product.promotional_ends_at)
  const primaryImage = product.images?.[0]

  const breadcrumbItems = [
    { label: 'Produtos', href: '/produtos' },
    { label: product.name },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description,
    sku: product.sku,
    brand: product.brand_name ? { '@type': 'Brand', name: product.brand_name } : undefined,
    offers: {
      '@type': 'Offer',
      price: isOnSale ? product.promotional_price : product.price,
      priceCurrency: 'BRL',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_CONFIG.url}/produtos/${product.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">Sem imagem</div>
            )}
            {discount && isOnSale && (
              <Badge className="absolute top-3 left-3 bg-red-600 text-white text-sm px-3 py-1">
                -{discount}%
              </Badge>
            )}
          </div>
          <div>
            <p className="text-sm text-red-600 font-medium mb-1">{product.brand_name}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span>SKU: {product.sku}</span>
              {product.warranty && (
                <>
                  <span>|</span>
                  <span>Garantia: {product.warranty}</span>
                </>
              )}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              {isOnSale ? (
                <>
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(product.promotional_price!)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="text-sm text-green-600 mb-2">
              {formatInstallment(isOnSale ? product.promotional_price! : product.price)}
            </p>
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="h-3 w-3 mr-1" /> Em estoque
                </Badge>
              ) : (
                <Badge variant="outline">Sob consulta</Badge>
              )}
              {product.is_new && <Badge variant="secondary">Novo</Badge>}
            </div>
            <ProductActions product={product} />

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-gray-400" />
                Calcule o frete e prazo de entrega
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Store className="h-4 w-4 text-gray-400" />
                Retirada na loja em Presidente Epitácio
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Compra segura e orçamento transparente
              </div>
            </div>
          </div>
        </div>

        {/* Compatibilidade */}
        {product.compatibilities && product.compatibilities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Compatibilidade</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
              {product.compatibilities.map((comp) => (
                <p key={comp.id} className="text-sm text-gray-700">
                  <strong>Compatível com:</strong> {comp.motorcycle_brand} {comp.motorcycle_model}
                  {comp.year_start && comp.year_end
                    ? ` (${comp.year_start} a ${comp.year_end})`
                    : comp.year_start
                    ? ` (${comp.year_start})`
                    : ''}
                  {comp.displacement ? ` - ${comp.displacement}` : ''}
                  {comp.notes ? ` - ${comp.notes}` : ''}
                </p>
              ))}
              <p className="text-xs text-gray-500 mt-2">
                Em caso de dúvida, confirme a aplicação com nossa equipe antes da compra.
              </p>
            </div>
          </div>
        )}

        {/* Descrição */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Especificações */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Especificações</h2>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex px-4 py-3 text-sm">
                  <span className="w-40 font-medium text-gray-700">{key}</span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Produtos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
