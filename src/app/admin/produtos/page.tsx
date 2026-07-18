'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'

const products = [
  { id: 'MC-0001', name: 'Pastilha de Freio Dianteira Cobreq', sku: 'MC-0001', price: 59.90, stock: 15, status: 'Ativo' as const },
  { id: 'MC-0002', name: 'Relação Completa Pro Tork CG 150', sku: 'MC-0002', price: 159.90, stock: 8, status: 'Ativo' as const },
  { id: 'MC-0003', name: 'Óleo Semissintético 10W30 1L', sku: 'MC-0003', price: 45.90, stock: 50, status: 'Ativo' as const },
  { id: 'MC-0004', name: 'Filtro de Óleo Original Honda CG 160', sku: 'MC-0004', price: 32.90, stock: 30, status: 'Ativo' as const },
  { id: 'MC-0005', name: 'Vela de Ignição NGK CR7HSA', sku: 'MC-0005', price: 14.90, stock: 100, status: 'Ativo' as const },
  { id: 'MC-0006', name: 'Pastilha de Freio Yamaha Fazer 250', sku: 'MC-0006', price: 89.90, stock: 0, status: 'Inativo' as const },
  { id: 'MC-0007', name: 'Bateria Moura M30BX para Motos', sku: 'MC-0007', price: 219.90, stock: 6, status: 'Ativo' as const },
  { id: 'MC-0008', name: 'Corrente de Transmissão Pro Tork 428', sku: 'MC-0008', price: 89.90, stock: 20, status: 'Ativo' as const },
  { id: 'MC-0009', name: 'Filtro de Ar K&N Esportivo', sku: 'MC-0009', price: 129.90, stock: 12, status: 'Ativo' as const },
  { id: 'MC-0010', name: 'Capacete Pro Tork Evolution Fechado', sku: 'MC-0010', price: 169.90, stock: 5, status: 'Ativo' as const },
]

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie o catálogo de produtos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Produto</th>
                  <th className="text-left font-medium text-gray-500 pb-3">SKU</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Preço</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Estoque</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-gray-900 font-medium">{product.name}</td>
                    <td className="py-3 text-gray-500">{product.sku}</td>
                    <td className="py-3 text-gray-900">{formatPrice(product.price)}</td>
                    <td className="py-3">
                      <span className={product.stock === 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                        {product.stock > 0 ? product.stock : 'Fora de estoque'}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={product.status === 'Ativo' ? 'success' : 'danger'}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
