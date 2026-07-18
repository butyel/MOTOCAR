'use client'

import { MessageCircle } from 'lucide-react'
import { cn, buildWhatsAppUrl } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

interface WhatsAppButtonProps {
  message?: string
  productName?: string
  motorcycleInfo?: string
}

export function WhatsAppButton({ message, productName, motorcycleInfo }: WhatsAppButtonProps) {
  function getMessage(): string {
    if (message) return message
    if (productName) {
      const bikeInfo = motorcycleInfo ? `. Minha moto: ${motorcycleInfo}` : ''
      return `Olá, gostaria de saber mais sobre o produto: ${productName}${bikeInfo}`
    }
    return 'Olá, encontrei a Motocar pelo site e gostaria de atendimento.'
  }

  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsapp, getMessage())

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-motocar-green text-white',
        'hover:bg-motocar-green-light transition-colors shadow-sm',
        'px-3 py-2 text-sm font-semibold'
      )}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">Falar com a Motocar</span>
    </a>
  )
}
