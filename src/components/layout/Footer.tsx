'use client'

import Link from 'next/link'
import { Store, Phone, MapPin, Clock, Globe } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-red-500 mb-4">
              <Store className="h-6 w-6" />
              Motocar
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Peças, acessórios e serviços para sua moto em Presidente Epitácio.
            </p>
            <div className="flex items-center gap-3">
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Instagram">
                <Globe className="h-5 w-5" />
              </a>
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Facebook">
                <Globe className="h-5 w-5" />
              </a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="text-sm hover:text-red-400 transition-colors">Sobre a Motocar</Link></li>
              <li><Link href="/servicos" className="text-sm hover:text-red-400 transition-colors">Nossa oficina</Link></li>
              <li><Link href="/contato" className="text-sm hover:text-red-400 transition-colors">Contato</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-red-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-red-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm hover:text-red-400 transition-colors">{SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-red-400 shrink-0" />
                <span className="text-sm">{SITE_CONFIG.address.full}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-green-400 shrink-0" />
                <div className="text-sm">
                  <p>{SITE_CONFIG.businessHours.weekday}</p>
                  <p>{SITE_CONFIG.businessHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li><Link href="/politica-de-privacidade" className="text-sm hover:text-red-400 transition-colors">Política de privacidade</Link></li>
              <li><Link href="/politica-de-troca" className="text-sm hover:text-red-400 transition-colors">Política de troca</Link></li>
              <li><Link href="/politica-de-entrega" className="text-sm hover:text-red-400 transition-colors">Política de entrega</Link></li>
              <li><Link href="/formas-de-pagamento" className="text-sm hover:text-red-400 transition-colors">Formas de pagamento</Link></li>
              <li><Link href="/termos-de-uso" className="text-sm hover:text-red-400 transition-colors">Termos de uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            CNPJ: {SITE_CONFIG.cnpj} &copy; {new Date().getFullYear()} Motocar. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/mapa-do-site" className="hover:text-red-400 transition-colors">Mapa do site</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
