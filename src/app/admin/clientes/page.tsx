'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Mail, Phone, Eye } from 'lucide-react'
import { formatPhone } from '@/lib/utils'

const customers = [
  { id: 'CLI-001', name: 'Carlos Silva', email: 'carlos.silva@email.com', phone: '18999998888', orders: 12, since: 'Jan 2024', status: 'Ativo' as const },
  { id: 'CLI-002', name: 'Ana Oliveira', email: 'ana.oliveira@email.com', phone: '18977776666', orders: 5, since: 'Mar 2024', status: 'Ativo' as const },
  { id: 'CLI-003', name: 'João Santos', email: 'joao.santos@email.com', phone: '18955554444', orders: 8, since: 'Fev 2024', status: 'Ativo' as const },
  { id: 'CLI-004', name: 'Maria Souza', email: 'maria.souza@email.com', phone: '18933332222', orders: 1, since: 'Jun 2024', status: 'Inativo' as const },
  { id: 'CLI-005', name: 'Pedro Alves', email: 'pedro.alves@email.com', phone: '18911110000', orders: 3, since: 'Abr 2024', status: 'Ativo' as const },
  { id: 'CLI-006', name: 'Lucas Mendes', email: 'lucas.mendes@email.com', phone: '18999997777', orders: 7, since: 'Jan 2024', status: 'Ativo' as const },
  { id: 'CLI-007', name: 'Rafael Costa', email: 'rafael.costa@email.com', phone: '1888886666', orders: 2, since: 'Mai 2024', status: 'Ativo' as const },
  { id: 'CLI-008', name: 'Fernando Lima', email: 'fernando.lima@email.com', phone: '1877775555', orders: 0, since: 'Jul 2024', status: 'Inativo' as const },
]

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie os clientes cadastrados</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Cliente</th>
                  <th className="text-left font-medium text-gray-500 pb-3">E-mail</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Telefone</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Pedidos</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Cliente desde</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{customer.name}</td>
                    <td className="py-3 text-gray-500">{customer.email}</td>
                    <td className="py-3 text-gray-700">{formatPhone(customer.phone)}</td>
                    <td className="py-3 text-gray-700">{customer.orders}</td>
                    <td className="py-3 text-gray-500">{customer.since}</td>
                    <td className="py-3">
                      <Badge variant={customer.status === 'Ativo' ? 'success' : 'danger'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Enviar e-mail">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-green-600" title="Ligar">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Visualizar">
                          <Eye className="h-4 w-4" />
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
