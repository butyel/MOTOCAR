'use client'

import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="h-12 w-12 text-red-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Algo deu errado
      </h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Ocorreu um erro inesperado ao carregar esta página. Tente novamente ou entre em contato
        conosco se o problema persistir.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="h-4 w-4" />
            Página inicial
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5518999999999'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Fale conosco
          </a>
        </Button>
      </div>
    </div>
  )
}
