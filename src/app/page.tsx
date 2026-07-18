import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wrench, ShieldCheck, MessageCircle, Star, MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BenefitsBar } from '@/components/shared/BenefitsBar'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { ProductCard } from '@/components/product/ProductCard'
import { getProducts, getBanners, getServices } from '@/lib/data'
import { DEMO_POSTS } from '@/lib/demo-data'
import { formatPrice } from '@/lib/utils'
import { SITE_CONFIG, SERVICE_HIGHLIGHTS } from '@/lib/constants'

const popularCategories = [
  { name: 'Freios', slug: 'sistema-de-freio', icon: ShieldCheck, color: 'bg-red-50 text-red-600' },
  { name: 'Relação', slug: 'transmissao-e-relacao', icon: Wrench, color: 'bg-orange-50 text-orange-600' },
  { name: 'Óleo', slug: 'lubrificantes', icon: Wrench, color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Filtros', slug: 'filtros', icon: Wrench, color: 'bg-blue-50 text-blue-600' },
  { name: 'Pneus', slug: 'pneus-e-camaras', icon: Wrench, color: 'bg-green-50 text-green-600' },
  { name: 'Baterias', slug: 'baterias', icon: Wrench, color: 'bg-purple-50 text-purple-600' },
  { name: 'Elétrica', slug: 'eletrica-e-ignicao', icon: Wrench, color: 'bg-cyan-50 text-cyan-600' },
  { name: 'Iluminação', slug: 'farois-e-iluminacao', icon: Wrench, color: 'bg-amber-50 text-amber-600' },
  { name: 'Carenagens', slug: 'carenagens', icon: Wrench, color: 'bg-pink-50 text-pink-600' },
  { name: 'Acessórios', slug: 'acessorios', icon: Wrench, color: 'bg-indigo-50 text-indigo-600' },
]

export default async function HomePage() {
  const [featuredProducts, banners, services] = await Promise.all([
    getProducts({ featured: true, pageSize: 8 }),
    getBanners(),
    getServices(),
  ])

  const promotions = featuredProducts.products.filter(
    p => p.promotional_price && p.promotional_ends_at && new Date(p.promotional_ends_at) > new Date()
  )
  const recentPosts = DEMO_POSTS.filter(p => p.is_published).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Motocar',
    description: 'Oficina de motos e motopeças em Presidente Epitácio',
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zipcode,
      addressCountry: 'BR',
    },
    openingHours: 'Mo-Fr 08:00-18:00, Sa 08:00-12:00',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      {banners.length > 0 && (
        <section className="relative bg-gray-900 overflow-hidden">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={banners[0].image}
              alt={banners[0].title}
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Peças e oficina de motos em Presidente Epitácio
                </h1>
                <p className="text-base md:text-lg text-gray-200 mb-6">
                  A Motocar oferece peças, acessórios, manutenção e atendimento especializado para motociclistas de Presidente Epitácio e região. Encontre o produto certo para sua moto ou solicite um orçamento para nossos serviços.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                    <Link href="/produtos">Encontrar peças</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    <Link href="/agendamento">Agendar serviço</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <BenefitsBar />

      {/* Buscador por moto */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <MotorcycleFinder />
        </div>
      </section>

      {/* Categorias populares */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Categorias populares</h2>
            <Link href="/produtos" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {popularCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/categorias/${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-gray-600 text-center font-medium">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Produtos em destaque</h2>
            <Link href="/produtos" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas da semana */}
      {promotions.length > 0 && (
        <section className="py-10 bg-red-600 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Ofertas da semana</h2>
                <p className="text-sm text-red-200">Aproveite os preços especiais</p>
              </div>
              <Link href="/ofertas" className="text-sm text-white hover:text-red-200 font-medium flex items-center gap-1 border border-white/40 rounded-md px-3 py-1.5">
                Ver ofertas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {promotions.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Serviços */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Serviços da oficina</h2>
            <Link href="/servicos" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.slice(0, 10).map((service) => (
              <Link
                key={service.id}
                href={`/servicos/${service.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-200 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h3>
                {service.duration && (
                  <p className="text-xs text-gray-400">{service.duration}</p>
                )}
                {service.price_min && (
                  <p className="text-sm font-bold text-red-600 mt-2">
                    A partir de {formatPrice(service.price_min)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-8 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Marcas que trabalhamos</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'NGK', 'Michelin', 'Pirelli', 'Pro Tork', 'Magnetron', 'Cobreq', 'Moura', 'Mobil'].map((brand) => (
              <Link
                key={brand}
                href={`/marcas/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white border border-gray-200 rounded-lg px-6 py-3 text-sm font-semibold text-gray-600 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            Experiência e confiança para cuidar da sua moto
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Na Motocar, cada motociclista recebe atendimento próximo e orientação para escolher as peças e os serviços adequados. Nosso objetivo é ajudar você a manter sua moto segura, confiável e pronta para o dia a dia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_HIGHLIGHTS.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-10 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Depoimentos</h2>
          <p className="text-sm text-gray-400 mb-6">Em breve, depoimentos reais dos nossos clientes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic mb-4">
                  &ldquo;Espaço reservado para depoimento real de cliente.&rdquo;
                </p>
                <p className="text-sm font-semibold text-gray-700">— Cliente Motocar</p>
                <p className="text-xs text-gray-400">Ambiente de demonstração</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Blog da Motocar</h2>
            <Link href="/blog" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-red-200 hover:shadow-sm transition-all"
              >
                <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                  Imagem do artigo
                </div>
                <div className="p-4">
                  <p className="text-xs text-red-600 font-medium mb-1">
                    {post.category_name || 'Blog'}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.reading_time} min de leitura</span>
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : ''}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Onde estamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Endereço</p>
                  <p className="text-sm text-gray-500">{SITE_CONFIG.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Telefone</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-gray-500 hover:text-red-600">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Fale conosco pelo WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Horários</p>
                  <p className="text-sm text-gray-500">{SITE_CONFIG.businessHours.weekday}</p>
                  <p className="text-sm text-gray-500">{SITE_CONFIG.businessHours.saturday}</p>
                </div>
              </div>
              <Button asChild>
                <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Como chegar
                </a>
              </Button>
            </div>
            <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center text-gray-400 text-sm">
              Mapa incorporado
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}

function MotorcycleFinder() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="h-5 w-5 text-red-600" />
        <h3 className="font-semibold text-gray-900">Buscar peças pela sua moto</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <select className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Marca da moto</option>
          <option value="honda">Honda</option>
          <option value="yamaha">Yamaha</option>
          <option value="suzuki">Suzuki</option>
          <option value="kawasaki">Kawasaki</option>
        </select>
        <select className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Modelo</option>
          <option value="cg-160">CG 160</option>
          <option value="fan">Fan</option>
          <option value="titan">Titan</option>
          <option value="fazer-250">Fazer 250</option>
        </select>
        <select className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Ano</option>
          {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Cilindrada</option>
          <option value="150">150cc</option>
          <option value="160">160cc</option>
          <option value="250">250cc</option>
          <option value="300">300cc</option>
          <option value="600">600cc</option>
        </select>
        <Button className="h-10">
          Encontrar peças compatíveis
        </Button>
      </div>
    </div>
  )
}
