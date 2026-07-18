import Link from 'next/link'
import { Home, Search, ShoppingBag, Wrench, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl font-bold text-red-600">404</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Página não encontrada
      </h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        A página que você está procurando pode ter sido removida, renomeada ou está temporariamente
        indisponível.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Página inicial
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/produtos">
            <ShoppingBag className="h-4 w-4" />
            Produtos
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/servicos">
            <Wrench className="h-4 w-4" />
            Serviços
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contato">
            <ArrowLeft className="h-4 w-4" />
            Contato
          </Link>
        </Button>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
        <Search className="h-4 w-4" />
        <span>Não encontrou o que procura? Fale conosco pelo WhatsApp</span>
      </div>
    </div>
  )
}
