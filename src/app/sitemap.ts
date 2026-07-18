import { MetadataRoute } from 'next'
import { getProducts, getServices, getPosts, getCategories } from '@/lib/data'
import { DEMO_POSTS } from '@/lib/demo-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://motocar.com.br'

  const { products } = await getProducts({ pageSize: 1000 })
  const services = await getServices()
  const categories = await getCategories()
  const { posts } = await getPosts({ pageSize: 100 })

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/produtos`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/servicos`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ofertas`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/novidades`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contato`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/agendamento`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/sobre`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: product.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/servicos/${service.slug}`,
    lastModified: service.updated_at,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categorias/${category.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const uniqueSlugs = new Set<string>()
  const filteredPosts = (posts.length > 0 ? posts : DEMO_POSTS.filter(p => p.is_published))
  const blogPages: MetadataRoute.Sitemap = filteredPosts
    .filter((post) => {
      if (uniqueSlugs.has(post.slug)) return false
      uniqueSlugs.add(post.slug)
      return true
    })
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at || post.published_at || undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  return [
    ...staticPages,
    ...productPages,
    ...servicePages,
    ...categoryPages,
    ...blogPages,
  ]
}
