import { Metadata } from 'next'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getBrands } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Marcas de Peças para Motos',
  description: 'Trabalhamos com as melhores marcas de peças e acessórios para motos. Honda, Yamaha, Suzuki, Kawasaki, NGK, Michelin, Pirelli, Pro Tork e muito mais.',
}

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <>
      <Breadcrumbs items={[{ label: 'Marcas' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Marcas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Trabalhamos com as melhores marcas do mercado
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marcas/${brand.slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-red-200 hover:shadow-sm transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                <Building2 className="h-8 w-8 text-gray-400 group-hover:text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                {brand.name}
              </h2>
              {brand.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{brand.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
