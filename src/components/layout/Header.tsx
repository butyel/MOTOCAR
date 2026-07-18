'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, User, Store } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { SearchBar } from '@/components/layout/SearchBar'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Category } from '@/types'

export function Header({ categories }: { categories: Category[] }) {
  const { state } = useStore()
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = state.cart.reduce((sum, item) => {
    const price = item.promotional_price || item.price
    return sum + price * item.quantity
  }, 0)

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <MobileMenu categories={categories} />
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-red-600">
                <Store className="h-7 w-7" />
                <span className="hidden sm:inline">Motocar</span>
              </Link>
            </div>
            <SearchBar />
            <div className="flex items-center gap-1">
              <Link
                href="/favoritos"
                className="hidden sm:flex flex-col items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                <span className="text-[10px] leading-none mt-0.5">Favoritos</span>
                {state.favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                    {state.favorites.length}
                  </span>
                )}
              </Link>
              <Link
                href="/minha-conta"
                className="hidden sm:flex flex-col items-center px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-[10px] leading-none mt-0.5">Conta</span>
              </Link>
              <Link
                href="/carrinho"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <span className="text-[10px] opacity-80">Carrinho</span>
                  <br />
                  <span className="text-xs font-semibold">
                    {cartTotal > 0 ? formatPrice(cartTotal) : 'Vazio'}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MegaMenu categories={categories} />
    </header>
  )
}
