'use client'

import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { cn, buildWhatsAppUrl } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

interface WhatsAppButtonProps {
  message?: string
  productName?: string
  motorcycleInfo?: string
}

export function WhatsAppButton({ message, productName, motorcycleInfo }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)

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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm max-w-[200px] animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-700">Fale com a Motocar pelo WhatsApp!</p>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-xs text-gray-400 hover:text-gray-600 mt-1"
          >
            Fechar
          </button>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTooltip(false)}
        className={cn(
          'flex items-center gap-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all',
          'md:px-5 md:py-3 px-4 py-3'
        )}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden md:inline text-sm font-medium">Fale com a Motocar</span>
      </a>
    </div>
  )
}
