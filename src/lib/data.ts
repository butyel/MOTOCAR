import {
  Product,
  Category,
  Brand,
  Service,
  Banner,
  BlogPost,
  BlogCategory,
  ProductImage,
  ProductCompatibility,
  ProductVariant,
} from '@/types'
import {
  DEMO_CATEGORIES,
  DEMO_BRANDS,
  DEMO_PRODUCTS,
  DEMO_SERVICES,
  DEMO_BANNERS,
  DEMO_POSTS,
  DEMO_BLOG_CATEGORIES,
  DEMO_SITE_SETTINGS,
} from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/client'

const SUPABASE_CONFIGURED = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function mapProduct(row: Record<string, unknown>): Product {
  return {
    ...row as unknown as Product,
    images: (row.images as ProductImage[]) || [],
    compatibilities: (row.compatibilities as ProductCompatibility[]) || [],
    variants: (row.variants as ProductVariant[]) || [],
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  if (!SUPABASE_CONFIGURED) return DEMO_CATEGORIES
  const supabase = createClient()
  if (!supabase) return DEMO_CATEGORIES
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('order')
    .is('parent_id', null)
  if (!data) return DEMO_CATEGORIES
  return Promise.all(
    data.map(async (cat) => {
      const { data: children } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', cat.id)
        .order('order')
      return { ...cat, children: children || [] }
    })
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!SUPABASE_CONFIGURED) {
    return findCategoryBySlug(DEMO_CATEGORIES, slug)
  }
  const supabase = createClient()
  if (!supabase) return findCategoryBySlug(DEMO_CATEGORIES, slug)
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

function findCategoryBySlug(categories: Category[], slug: string): Category | null {
  for (const cat of categories) {
    if (cat.slug === slug) return cat
    if (cat.children) {
      const found = findCategoryBySlug(cat.children, slug)
      if (found) return found
    }
  }
  return null
}

export async function getAllSubcategoryIds(categoryId: string, categories: Category[] = DEMO_CATEGORIES): Promise<string[]> {
  const ids: string[] = [categoryId]
  for (const cat of categories) {
    if (cat.parent_id === categoryId) {
      ids.push(cat.id)
      const subIds = await getAllSubcategoryIds(cat.id, categories)
      ids.push(...subIds)
    }
  }
  return ids
}

// Products
export async function getProducts(options?: {
  categorySlug?: string
  categoryId?: string
  brandSlug?: string
  search?: string
  featured?: boolean
  onSale?: boolean
  isNew?: boolean
  page?: number
  pageSize?: number
  sort?: string
  motorcycleBrand?: string
  motorcycleModel?: string
  motorcycleYear?: string
}): Promise<{ products: Product[]; total: number }> {
  if (!SUPABASE_CONFIGURED) {
    let filtered = [...DEMO_PRODUCTS]
    if (options?.featured) filtered = filtered.filter(p => p.is_featured)
    if (options?.onSale) filtered = filtered.filter(p => p.promotional_price && p.promotional_ends_at && new Date(p.promotional_ends_at) > new Date())
    if (options?.isNew) filtered = filtered.filter(p => p.is_new)
    if (options?.categorySlug) {
      const cat = findCategoryBySlug(DEMO_CATEGORIES, options.categorySlug)
      if (cat) {
        const catIds = [cat.id]
        DEMO_CATEGORIES.filter(c => c.parent_id === cat.id).forEach(c => catIds.push(c.id))
        filtered = filtered.filter(p => p.category_id && catIds.includes(p.category_id))
      }
    }
    if (options?.search) {
      const q = options.search.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.brand_name && p.brand_name.toLowerCase().includes(q))
      )
    }
    if (options?.motorcycleBrand) {
      filtered = filtered.filter(p =>
        p.compatibilities?.some(c => c.motorcycle_brand.toLowerCase() === options.motorcycleBrand!.toLowerCase())
      )
    }
    const total = filtered.length
    return { products: filtered, total }
  }
  const supabase = createClient()
  if (!supabase) return { products: DEMO_PRODUCTS, total: DEMO_PRODUCTS.length }
  let query = supabase.from('products').select('*, images:product_images(*), compatibilities:product_compatibilities(*)', { count: 'exact' })
  if (options?.featured) query = query.eq('is_featured', true)
  if (options?.onSale) query = query.not('promotional_price', 'is', null)
  if (options?.isNew) query = query.eq('is_new', true)
  if (options?.search) query = query.or(`name.ilike.%${options.search}%,sku.ilike.%${options.search}%`)
  const page = options?.page || 1
  const pageSize = options?.pageSize || 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, count } = await query.range(from, to).order('created_at', { ascending: false })
  return { products: (data || []).map(mapProduct), total: count || 0 }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!SUPABASE_CONFIGURED) {
    return DEMO_PRODUCTS.find(p => p.slug === slug) || null
  }
  const supabase = createClient()
  if (!supabase) return DEMO_PRODUCTS.find(p => p.slug === slug) || null
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*), compatibilities:product_compatibilities(*), variants:product_variants(*), brand:brands(*), category:categories(*)')
    .eq('slug', slug)
    .single()
  return data ? mapProduct(data) : null
}

export async function getRelatedProducts(productId: string, categoryId?: string): Promise<Product[]> {
  if (!SUPABASE_CONFIGURED) {
    return DEMO_PRODUCTS.filter(p => p.id !== productId && p.category_id === categoryId).slice(0, 4)
  }
  const supabase = createClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('category_id', categoryId)
    .neq('id', productId)
    .limit(4)
  return (data || []).map(mapProduct)
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  if (!SUPABASE_CONFIGURED) return DEMO_BRANDS
  const supabase = createClient()
  if (!supabase) return DEMO_BRANDS
  const { data } = await supabase.from('brands').select('*').order('name')
  return data || DEMO_BRANDS
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!SUPABASE_CONFIGURED) return DEMO_BRANDS.find(b => b.slug === slug) || null
  const supabase = createClient()
  if (!supabase) return DEMO_BRANDS.find(b => b.slug === slug) || null
  const { data } = await supabase.from('brands').select('*').eq('slug', slug).single()
  return data
}

// Services
export async function getServices(): Promise<Service[]> {
  if (!SUPABASE_CONFIGURED) return DEMO_SERVICES
  const supabase = createClient()
  if (!supabase) return DEMO_SERVICES
  const { data } = await supabase.from('services').select('*').order('name')
  return data || DEMO_SERVICES
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!SUPABASE_CONFIGURED) return DEMO_SERVICES.find(s => s.slug === slug) || null
  const supabase = createClient()
  if (!supabase) return DEMO_SERVICES.find(s => s.slug === slug) || null
  const { data } = await supabase.from('services').select('*').eq('slug', slug).single()
  return data
}

// Banners
export async function getBanners(): Promise<Banner[]> {
  if (!SUPABASE_CONFIGURED) return DEMO_BANNERS
  const supabase = createClient()
  if (!supabase) return DEMO_BANNERS
  const { data } = await supabase.from('banners').select('*').eq('is_active', true).order('order')
  return data || DEMO_BANNERS
}

// Blog
export async function getPosts(options?: { page?: number; pageSize?: number; categorySlug?: string }): Promise<{ posts: BlogPost[]; total: number }> {
  if (!SUPABASE_CONFIGURED) {
    let filtered = [...DEMO_POSTS].filter(p => p.is_published)
    if (options?.categorySlug) {
      const cat = DEMO_BLOG_CATEGORIES.find(c => c.slug === options.categorySlug)
      if (cat) filtered = filtered.filter(p => p.category_id === cat.id)
    }
    const total = filtered.length
    return { posts: filtered, total }
  }
  const supabase = createClient()
  if (!supabase) return { posts: DEMO_POSTS, total: DEMO_POSTS.length }
  let query = supabase.from('posts').select('*, category:post_categories(*)', { count: 'exact' }).eq('is_published', true)
  if (options?.categorySlug) {
    const { data: cat } = await supabase.from('post_categories').select('id').eq('slug', options.categorySlug).single()
    if (cat) query = query.eq('category_id', cat.id)
  }
  const page = options?.page || 1
  const pageSize = options?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, count } = await query.range(from, to).order('published_at', { ascending: false })
  return { posts: data || [], total: count || 0 }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!SUPABASE_CONFIGURED) return DEMO_POSTS.find(p => p.slug === slug) || null
  const supabase = createClient()
  if (!supabase) return DEMO_POSTS.find(p => p.slug === slug) || null
  const { data } = await supabase.from('posts').select('*, category:post_categories(*)').eq('slug', slug).eq('is_published', true).single()
  return data
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  if (!SUPABASE_CONFIGURED) return DEMO_BLOG_CATEGORIES
  const supabase = createClient()
  if (!supabase) return DEMO_BLOG_CATEGORIES
  const { data } = await supabase.from('post_categories').select('*').order('name')
  return data || DEMO_BLOG_CATEGORIES
}

// Settings
export async function getSiteSetting(key: string): Promise<string | null> {
  if (!SUPABASE_CONFIGURED) return DEMO_SITE_SETTINGS[key] || null
  const supabase = createClient()
  if (!supabase) return DEMO_SITE_SETTINGS[key] || null
  const { data } = await supabase.from('site_settings').select('value').eq('key', key).single()
  return data?.value || null
}
