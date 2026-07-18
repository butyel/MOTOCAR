'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Eye, Search, Filter } from 'lucide-react'

const orders = [
  { id: 'MC-2024-001', customer: 'Carlos Silva', items: 3, total: 189.90, status: 'Aguardando' as const, date: '18/07/2026' },
  { id: 'MC-2024-002', customer: 'Ana Oliveira', items: 1, total: 79.90, status: 'Aprovado' as const, date: '17/07/2026' },
  { id: 'MC-2024-003', customer: 'João Santos', items: 5, total: 459.70, status: 'Entregue' as const, date: '16/07/2026' },
  { id: 'MC-2024-004', customer: 'Maria Souza', items: 2, total: 32.90, status: 'Cancelado' as const, date: '15/07/2026' },
  { id: 'MC-2024-005', customer: 'Pedro Alves', items: 1, total: 219.90, status: 'Aguardando' as const, date: '15/07/2026' },
  { id: 'MC-2024-006', customer: 'Lucas Mendes', items: 4, total: 329.60, status: 'Entregue' as const, date: '14/07/2026' },
  { id: 'MC-2024-007', customer: 'Rafael Costa', items: 2, total: 179.80, status: 'Aprovado' as const, date: '14/07/2026' },
  { id: 'MC-2024-008', customer: 'Fernando Lima', items: 1, total: 89.90, status: 'Cancelado' as const, date: '13/07/2026' },
]

function getStatusVariant(status: string) {
  switch (status) {
    case 'Aprovado': return 'success'
    case 'Entregue': return 'secondary'
    case 'Aguardando': return 'warning'
    case 'Cancelado': return 'danger'
    default: return 'outline'
  }
}

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie os pedidos da loja</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Pedido</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Cliente</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Itens</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Total</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Data</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 text-gray-700">{order.customer}</td>
                    <td className="py-3 text-gray-500">{order.items}</td>
                    <td className="py-3 text-gray-900 font-medium">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3 text-right">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
