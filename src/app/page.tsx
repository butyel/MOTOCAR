import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Phone, Clock, Wrench, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/ProductCard'
import { getProducts, getBanners, getServices } from '@/lib/data'
import { DEMO_POSTS } from '@/lib/demo-data'
import { SITE_CONFIG, POPULAR_CATEGORIES } from '@/lib/constants'

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
  const officeServices = services.slice(0, 6)
  const heroBanner = banners[0]

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

      {/* HERO */}
      <section className="bg-motocar-off-white">
        <div className="container-motocar">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[520px]">
            <div className="lg:col-span-7 flex flex-col justify-center py-8 lg:py-12 lg:pr-10">
              <span className="inline-block text-[11px] font-bold text-motocar-red uppercase tracking-[0.15em] mb-4">
                Peças &bull; Acessórios &bull; Mecânica Especializada
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-motocar-graphite leading-[0.9] mb-4 tracking-tight">
                Tudo para sua moto.
                <br />
                <span className="text-motocar-red">Aqui em Presidente Epitácio.</span>
              </h1>
              <p className="text-base sm:text-lg text-motocar-gray max-w-md mb-6 leading-relaxed">
                Peças, acessórios e serviços de oficina com atendimento direto para ajudar você a encontrar o que sua moto realmente precisa.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <Button asChild size="lg">
                  <Link href="/produtos">Buscar uma peça</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/agendamento">Falar com a oficina</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-motocar-gray">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-motocar-green rounded-full" />
                  Retire na loja
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-motocar-red rounded-full" />
                  Atendimento local
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-motocar-green rounded-full" />
                  Orçamento pelo WhatsApp
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
              {heroBanner && (
                <div className="absolute inset-0 lg:relative lg:h-full">
                  <Image
                    src={heroBanner.image}
                    alt={heroBanner.title}
                    fill
                    className="object-cover lg:object-contain lg:object-right-bottom lg:!relative lg:!h-full lg:!w-auto lg:max-w-full"
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BUSCADOR POR MOTO */}
      <section className="bg-motocar-graphite">
        <div className="container-motocar py-6 md:py-7">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="md:w-48 shrink-0">
              <p className="text-xs font-bold text-motocar-gray uppercase tracking-wider mb-1">Qual é a sua moto?</p>
              <h2 className="font-heading text-xl font-bold text-white leading-tight">Encontre peças compatíveis</h2>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-motocar-gray uppercase tracking-wider mb-1 block">Marca</label>
                <select className="w-full h-9 bg-motocar-dark text-white border border-motocar-graphite px-2.5 text-sm focus:outline-none focus:border-motocar-red transition-colors">
                  <option value="">Selecione</option>
                  <option value="honda">Honda</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="suzuki">Suzuki</option>
                  <option value="kawasaki">Kawasaki</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-motocar-gray uppercase tracking-wider mb-1 block">Modelo</label>
                <select className="w-full h-9 bg-motocar-dark text-white border border-motocar-graphite px-2.5 text-sm focus:outline-none focus:border-motocar-red transition-colors">
                  <option value="">Selecione</option>
                  <option value="cg-160">CG 160</option>
                  <option value="fan">Fan</option>
                  <option value="titan">Titan</option>
                  <option value="fazer-250">Fazer 250</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-motocar-gray uppercase tracking-wider mb-1 block">Ano</label>
                <select className="w-full h-9 bg-motocar-dark text-white border border-motocar-graphite px-2.5 text-sm focus:outline-none focus:border-motocar-red transition-colors">
                  <option value="">Selecione</option>
                  {Array.from({ length: 15 }, (_, i) => 2026 - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-motocar-gray uppercase tracking-wider mb-1 block">Cilindrada</label>
                <select className="w-full h-9 bg-motocar-dark text-white border border-motocar-graphite px-2.5 text-sm focus:outline-none focus:border-motocar-red transition-colors">
                  <option value="">Selecione</option>
                  <option value="150">150cc</option>
                  <option value="160">160cc</option>
                  <option value="250">250cc</option>
                  <option value="300">300cc</option>
                  <option value="600">600cc</option>
                </select>
              </div>
            </div>
            <Button className="shrink-0 h-9 px-6 bg-motocar-red hover:bg-motocar-red-dark">
              Encontrar peças
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORIAS - CATÁLOGO */}
      <section className="bg-white border-b border-motocar-light-gray">
        <div className="container-motocar py-10 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-motocar-graphite">Categorias</h2>
            <Link href="/produtos" className="text-sm font-bold text-motocar-red hover:text-motocar-red-dark transition-colors flex items-center gap-1">
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-motocar-light-gray border border-motocar-light-gray">
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="bg-white p-4 sm:p-5 hover:bg-motocar-off-white transition-colors group flex flex-col"
              >
                <span className="text-[10px] font-bold text-motocar-red tracking-wider mb-1">{cat.number}</span>
                <span className="font-heading text-base font-bold text-motocar-graphite group-hover:text-motocar-red transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="bg-white border-b border-motocar-light-gray">
        <div className="container-motocar py-10 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-motocar-graphite">Produtos em destaque</h2>
            <Link href="/produtos" className="text-sm font-bold text-motocar-red hover:text-motocar-red-dark transition-colors flex items-center gap-1">
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredProducts.products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* OFICINA - SEÇÃO VISUAL */}
      <section className="bg-motocar-graphite border-b border-motocar-light-gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src="/imagens/fachada.jpg"
              alt="Oficina Motocar em Presidente Epitácio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Sua moto nas mãos<br />de quem entende
            </h2>
            <p className="text-motocar-gray text-sm md:text-base mb-6 max-w-md leading-relaxed">
              Manutenção preventiva, diagnóstico e substituição de peças com atendimento direto em Presidente Epitácio.
            </p>
            <ul className="space-y-2 mb-6">
              {officeServices.map((service) => (
                <li key={service.id} className="flex items-center gap-2.5 text-sm text-motocar-gray">
                  <Wrench className="h-3.5 w-3.5 text-motocar-red shrink-0" />
                  {service.name}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/servicos">Conhecer a oficina</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/agendamento">Solicitar orçamento</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      {promotions.length > 0 && (
        <section className="bg-motocar-red">
          <div className="container-motocar py-10 md:py-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">Ofertas da Motocar</h2>
                <p className="text-sm text-white/70 mt-0.5">Peças com preços especiais</p>
              </div>
              <Link href="/ofertas" className="text-sm font-bold text-white hover:text-white/70 transition-colors flex items-center gap-1">
                Ver ofertas <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {promotions.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROVA LOCAL - FACHADA + INFORMAÇÕES */}
      <section className="bg-motocar-off-white">
        <div className="container-motocar py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-motocar-graphite mb-4">
                Motocar em Presidente Epitácio
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-motocar-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-motocar-graphite">Endereço</p>
                    <p className="text-sm text-motocar-gray">{SITE_CONFIG.address.full}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-motocar-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-motocar-graphite">Telefone</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-motocar-gray hover:text-motocar-red transition-colors">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-motocar-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-motocar-graphite">Horários</p>
                    <p className="text-sm text-motocar-gray">{SITE_CONFIG.businessHours.weekday}</p>
                    <p className="text-sm text-motocar-gray">{SITE_CONFIG.businessHours.saturday}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Como chegar
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Falar pelo WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative min-h-[300px]">
              <Image
                src="/imagens/fachada.jpg"
                alt="Fachada da Motocar em Presidente Epitácio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-white">
        <div className="container-motocar py-10 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-motocar-graphite">Blog da Motocar</h2>
            <Link href="/blog" className="text-sm font-bold text-motocar-red hover:text-motocar-red-dark transition-colors flex items-center gap-1">
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <Link
                href={`/blog/${recentPosts[0].slug}`}
                className="md:col-span-7 group relative min-h-[320px] bg-motocar-off-white border border-motocar-light-gray overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Image
                    src={recentPosts[0].image || '/imagens/fachada.jpg'}
                    alt={recentPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-motocar-graphite/80 via-motocar-graphite/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="inline-block text-[10px] font-bold text-motocar-red uppercase tracking-wider mb-2 bg-white px-1.5 py-0.5">
                    {recentPosts[0].category_name || 'Blog'}
                  </span>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-tight mb-1">
                    {recentPosts[0].title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2">{recentPosts[0].excerpt}</p>
                </div>
              </Link>
              <div className="md:col-span-5 flex flex-col gap-4">
                {recentPosts.slice(1, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 border border-motocar-light-gray bg-motocar-off-white p-3 hover:border-motocar-red transition-colors"
                  >
                    <div className="relative w-24 h-24 shrink-0 bg-motocar-light-gray overflow-hidden">
                      <Image
                        src={post.image || '/imagens/interior.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-motocar-red uppercase tracking-wider">
                        {post.category_name || 'Blog'}
                      </span>
                      <h3 className="text-sm font-bold text-motocar-graphite group-hover:text-motocar-red transition-colors line-clamp-2 leading-snug mt-0.5">
                        {post.title}
                      </h3>
                      <p className="text-xs text-motocar-gray mt-1">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
