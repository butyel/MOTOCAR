'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Clock, Globe } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-motocar-dark text-motocar-gray">
      <div className="container-motocar py-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-4">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/imagens/logotipo.png"
                alt="Motocar"
                width={140}
                height={38}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-motocar-gray mb-3 max-w-xs">
              Peças, acessórios e oficina para sua moto em Presidente Epitácio.
            </p>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-motocar-gray hover:text-motocar-red transition-colors"
            >
              <Globe className="h-4 w-4" />
              @motocar.epitacio
            </a>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-xs font-bold text-motocar-white uppercase tracking-wider mb-3">Links</p>
            <ul className="space-y-1.5">
              <li><Link href="/produtos" className="text-sm hover:text-motocar-red transition-colors">Produtos</Link></li>
              <li><Link href="/servicos" className="text-sm hover:text-motocar-red transition-colors">Oficina</Link></li>
              <li><Link href="/ofertas" className="text-sm hover:text-motocar-red transition-colors">Ofertas</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-motocar-red transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs font-bold text-motocar-white uppercase tracking-wider mb-3">Atendimento</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 mt-0.5 text-motocar-red shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm hover:text-motocar-red transition-colors">{SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-motocar-red shrink-0" />
                <span className="text-sm">{SITE_CONFIG.address.full}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-3.5 w-3.5 mt-0.5 text-motocar-green shrink-0" />
                <div className="text-sm">
                  <p>{SITE_CONFIG.businessHours.weekday}</p>
                  <p>{SITE_CONFIG.businessHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="text-xs font-bold text-motocar-white uppercase tracking-wider mb-3">Políticas</p>
            <ul className="space-y-1.5">
              <li><Link href="/politica-de-privacidade" className="text-sm hover:text-motocar-red transition-colors">Privacidade</Link></li>
              <li><Link href="/politica-de-troca" className="text-sm hover:text-motocar-red transition-colors">Troca e devolução</Link></li>
              <li><Link href="/politica-de-entrega" className="text-sm hover:text-motocar-red transition-colors">Entrega</Link></li>
              <li><Link href="/termos-de-uso" className="text-sm hover:text-motocar-red transition-colors">Termos de uso</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-motocar-graphite">
        <div className="container-motocar py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-motocar-gray">
            CNPJ: {SITE_CONFIG.cnpj} &copy; {new Date().getFullYear()} Motocar
          </p>
          <p className="text-[11px] text-motocar-gray">
            {SITE_CONFIG.address.full}
          </p>
        </div>
      </div>
    </footer>
  )
}
