export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string | null
  parent_id: string | null
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string | null
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  barcode: string | null
  brand_id: string | null
  brand_name?: string
  category_id: string | null
  category_name?: string
  description: string
  short_description: string | null
  specifications: Record<string, string> | null
  highlights: string[] | null
  price: number
  promotional_price: number | null
  promotional_ends_at: string | null
  cost_price: number | null
  stock: number
  stock_unlimited: boolean
  is_active: boolean
  is_featured: boolean
  is_new: boolean
  weight: number | null
  length: number | null
  width: number | null
  height: number | null
  warranty: string | null
  installation_info: string | null
  meta_title: string | null
  meta_description: string | null
  views: number
  created_at: string
  updated_at: string
  images: ProductImage[]
  compatibilities: ProductCompatibility[]
  variants: ProductVariant[]
  category?: Category
  brand?: Brand
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt: string | null
  order: number
  is_primary: boolean
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number | null
  stock: number
  is_active: boolean
}

export interface ProductCompatibility {
  id: string
  product_id: string
  motorcycle_brand: string
  motorcycle_model: string
  motorcycle_version: string | null
  year_start: number | null
  year_end: number | null
  displacement: string | null
  notes: string | null
}

export interface Service {
  id: string
  name: string
  slug: string
  summary: string | null
  description: string | null
  image: string | null
  benefits: string[] | null
  duration: string | null
  price_min: number | null
  price_max: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  motorcycle_brand: string
  motorcycle_model: string
  motorcycle_year: string | null
  motorcycle_plate: string | null
  motorcycle_mileage: string | null
  service_id: string | null
  service_name: string | null
  problem_description: string | null
  preferred_date: string
  preferred_period: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  protocol: string
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Banner {
  id: string
  title: string
  subtitle: string | null
  image: string
  link: string | null
  button_text: string | null
  button_text_secondary: string | null
  link_secondary: string | null
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  image: string | null
  author: string
  category_id: string | null
  category_name?: string
  reading_time: number | null
  is_published: boolean
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  category?: BlogCategory
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  name: string
  slug: string
  image: string | null
  price: number
  promotional_price: number | null
  quantity: number
  variant_id: string | null
  variant_name: string | null
}

export interface Coupon {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_order_value: number | null
  max_uses: number | null
  used_count: number
  starts_at: string | null
  expires_at: string | null
  is_active: boolean
}

export interface Review {
  id: string
  product_id: string
  customer_name: string
  rating: number
  title: string | null
  comment: string | null
  is_approved: boolean
  created_at: string
}

export interface SiteSetting {
  key: string
  value: string
  type: 'text' | 'image' | 'number' | 'boolean' | 'json'
}

export interface Order {
  id: string
  customer_id: string | null
  customer_name: string
  customer_email: string | null
  customer_phone: string
  status: string
  total: number
  discount: number
  coupon_code: string | null
  delivery_method: string
  payment_method: string | null
  notes: string | null
  whatsapp_message: string | null
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  customer_id: string
  label: string
  street: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  zipcode: string
  is_default: boolean
}

export interface NewsletterSubscriber {
  id: string
  name: string
  email: string
  is_active: boolean
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  source: string
  message: string | null
  created_at: string
}

export interface Profile {
  id: string
  name: string
  email: string
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type MotorcycleSelection = {
  brand: string
  model: string
  year: string
  displacement: string
} | null
