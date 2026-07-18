'use client'

import { Clock, MapPin, Phone, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export function TopBar() {
  return (
    <div className="bg-gray-900 text-white text-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-8">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-red-400" />
              Presidente Epitácio - SP
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-red-400" />
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-red-400 transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </span>
            <span className="flex items-center gap-1">
              <ShoppingBag className="h-3 w-3 text-green-400" />
              Retirada na loja
            </span>
          </div>
          <div className="flex md:hidden items-center gap-1">
            <MapPin className="h-3 w-3 text-red-400" />
            <span>Presidente Epitácio</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="h-3 w-3 text-green-400" />
              {SITE_CONFIG.businessHours.weekday}
            </span>
            <Link href="/sobre" className="hover:text-red-400 transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-red-400 transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
