import { MapPin, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'

export default function EnderecosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Endereços</h1>
          <p className="text-sm text-gray-500">Gerencie seus endereços de entrega.</p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4" />
          Novo endereço
        </Button>
      </div>
      <EmptyState
        icon={<MapPin className="h-16 w-16" />}
        title="Nenhum endereço cadastrado"
        description="Adicione um endereço de entrega para facilitar suas compras."
        action={{ label: 'Adicionar endereço', href: '#' }}
      />
    </div>
  )
}
