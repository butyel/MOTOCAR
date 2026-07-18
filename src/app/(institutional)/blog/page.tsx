import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { getPosts, getBlogCategories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog da Motocar',
  description: 'Dicas, guias e informações sobre manutenção de motos, peças, acessórios e cuidados para motociclistas.',
}

export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string; categoria?: string }>
}) {
  const { page: pageParam, categoria } = await props.searchParams
  const currentPage = Number(pageParam) || 1
  const pageSize = 6

  const { posts, total } = await getPosts({
    page: currentPage,
    pageSize,
    categorySlug: categoria,
  })

  const categories = await getBlogCategories()
  const totalPages = Math.ceil(total / pageSize)

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog' }]} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Blog da Motocar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Dicas, guias e informações para motociclistas
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !categoria ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?categoria=${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categoria === cat.slug ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-red-200 hover:shadow-sm transition-all"
                >
                  <div className="relative aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    ) : (
                      'Imagem do artigo'
                    )}
                  </div>
                  <div className="p-4">
                    {post.category_name && (
                      <p className="text-xs text-red-600 font-medium mb-1">{post.category_name}</p>
                    )}
                    <h2 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                        )}
                        {post.reading_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.reading_time} min
                          </span>
                        )}
                      </div>
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}${categoria ? `&categoria=${categoria}` : ''}`}
                    className={`w-10 h-10 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                      pageNum === currentPage
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="Nenhum artigo encontrado"
            description="Volte mais tarde para conferir novos conteúdos"
            action={{ label: 'Ver todos os artigos', href: '/blog' }}
          />
        )}
      </div>
    </>
  )
}
