'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, User, MessageCircle } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { SearchBar } from '@/components/layout/SearchBar'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Category } from '@/types'
import { SITE_CONFIG } from '@/lib/constants'

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
      <div className="border-b border-motocar-light-gray">
        <div className="container-motocar">
          <div className="flex items-center justify-between h-12 md:h-14">
            <div className="flex items-center gap-2">
              <MobileMenu categories={categories} />
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/imagens/logotipo.png"
                  alt="Motocar"
                  width={130}
                  height={36}
                  className="h-7 sm:h-9 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
            <SearchBar />
            <div className="flex items-center gap-0.5 md:gap-1">
              <Link
                href="/favoritos"
                className="flex flex-col items-center px-1.5 md:px-2.5 py-1 text-motocar-gray hover:text-motocar-red transition-colors relative"
              >
                <Heart className="h-4 w-4" />
                <span className="text-[9px] leading-none mt-0.5 hidden sm:block">Favoritos</span>
                {state.favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-motocar-red text-white text-[8px] rounded-sm h-3.5 w-3.5 flex items-center justify-center font-bold">
                    {state.favorites.length}
                  </span>
                )}
              </Link>
              <Link
                href="/minha-conta"
                className="hidden sm:flex flex-col items-center px-1.5 md:px-2.5 py-1 text-motocar-gray hover:text-motocar-red transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-[9px] leading-none mt-0.5">Conta</span>
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:hidden flex-col items-center px-1.5 py-1 text-motocar-gray hover:text-motocar-green transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-[9px] leading-none mt-0.5">WhatsApp</span>
              </a>
              <Link
                href="/carrinho"
                className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 bg-motocar-red text-white hover:bg-motocar-red-dark transition-colors ml-1"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-white text-motocar-red text-[8px] font-bold rounded-sm h-3.5 w-3.5 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:block leading-tight">
                  <span className="text-[9px] opacity-80">Carrinho</span>
                  <br />
                  <span className="text-[11px] font-bold">
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
