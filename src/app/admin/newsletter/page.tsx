'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Download, Trash2, Mail } from 'lucide-react'

const subscribers = [
  { id: 'SUB-001', name: 'Carlos Silva', email: 'carlos.silva@email.com', subscribedAt: '10/01/2024', status: 'Ativo' as const },
  { id: 'SUB-002', name: 'Ana Oliveira', email: 'ana.oliveira@email.com', subscribedAt: '15/03/2024', status: 'Ativo' as const },
  { id: 'SUB-003', name: 'João Santos', email: 'joao.santos@email.com', subscribedAt: '20/02/2024', status: 'Ativo' as const },
  { id: 'SUB-004', name: 'Maria Souza', email: 'maria.souza@email.com', subscribedAt: '05/06/2024', status: 'Inativo' as const },
  { id: 'SUB-005', name: 'Pedro Alves', email: 'pedro.alves@email.com', subscribedAt: '12/04/2024', status: 'Ativo' as const },
  { id: 'SUB-006', name: 'Lucas Mendes', email: 'lucas.mendes@email.com', subscribedAt: '08/01/2024', status: 'Ativo' as const },
  { id: 'SUB-007', name: 'Rafael Costa', email: 'rafael.costa@email.com', subscribedAt: '22/05/2024', status: 'Inativo' as const },
  { id: 'SUB-008', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', subscribedAt: '01/07/2024', status: 'Ativo' as const },
  { id: 'SUB-009', name: 'Gabriela Santos', email: 'gabriela.santos@email.com', subscribedAt: '18/06/2024', status: 'Ativo' as const },
  { id: 'SUB-010', name: 'Thiago Oliveira', email: 'thiago.oliveira@email.com', subscribedAt: '25/03/2024', status: 'Ativo' as const },
]

export default function AdminNewsletter() {
  const activeSubscribers = subscribers.filter((s) => s.status === 'Ativo').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeSubscribers} assinantes ativos
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total de Inscritos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{activeSubscribers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{subscribers.length - activeSubscribers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar assinantes..."
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Nome</th>
                  <th className="text-left font-medium text-gray-500 pb-3">E-mail</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Inscrito em</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{sub.name}</td>
                    <td className="py-3 text-gray-500">{sub.email}</td>
                    <td className="py-3 text-gray-500">{sub.subscribedAt}</td>
                    <td className="py-3">
                      <Badge variant={sub.status === 'Ativo' ? 'success' : 'danger'}>
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Enviar e-mail">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-red-600" title="Remover">
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
