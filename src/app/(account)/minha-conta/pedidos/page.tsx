import { Package } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'

export default function PedidosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Meus Pedidos</h1>
      <p className="text-sm text-gray-500 mb-8">Histórico de pedidos realizados.</p>
      <EmptyState
        icon={<Package className="h-16 w-16" />}
        title="Nenhum pedido encontrado"
        description="Você ainda não realizou nenhum pedido. Visite nossa loja e escolha as peças para sua moto."
        action={{ label: 'Ver produtos', href: '/produtos' }}
      />
    </div>
  )
}
