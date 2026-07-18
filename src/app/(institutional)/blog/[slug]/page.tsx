import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { getPostBySlug } from '@/lib/data'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Artigo não encontrado' }
  return {
    title: post.meta_title || `${post.title} | Motocar`,
    description: post.meta_description || post.excerpt || '',
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.published_at,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            {post.category_name && (
              <Link
                href={`/blog?categoria=${post.category_name?.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-red-600 font-medium hover:underline"
              >
                {post.category_name}
              </Link>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.author && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString('pt-BR')}
              </span>
            )}
            {post.reading_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.reading_time} min de leitura
              </span>
            )}
          </div>
        </div>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-sm max-w-none text-gray-700 mb-8">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Separator className="mb-6" />

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Compartilhar:</span>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${process.env.NEXT_PUBLIC_SITE_URL || 'https://motocar.com.br'}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
