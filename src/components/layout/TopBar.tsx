'use client'

import { Clock, MapPin, Phone, ShoppingBag } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function TopBar() {
  return (
    <div className="bg-motocar-dark text-motocar-white text-[11px] leading-none">
      <div className="container-motocar">
        <div className="flex items-center justify-between h-7">
          <div className="flex items-center gap-3 md:gap-5">
            <span className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 text-motocar-red" />
              <span className="text-motocar-gray">Presidente Epitácio - SP</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5 text-motocar-red" />
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-motocar-gray hover:text-motocar-white transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 text-motocar-green" />
              <span className="text-motocar-gray">{SITE_CONFIG.businessHours.weekday}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingBag className="h-2.5 w-2.5 text-motocar-green" />
            <span className="text-motocar-gray">Retire na loja</span>
          </div>
        </div>
      </div>
    </div>
  )
}
