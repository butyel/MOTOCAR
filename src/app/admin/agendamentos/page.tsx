'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye, Search } from 'lucide-react'

const appointments = [
  { id: 'APT-001', customer: 'Pedro Alves', phone: '(18) 99999-8888', service: 'Revisão Completa', motorcycle: 'Honda CG 160', date: '18/07/2026', period: '14:00', status: 'pending' as const },
  { id: 'APT-002', customer: 'Lucas Mendes', phone: '(18) 97777-6666', service: 'Troca de Óleo', motorcycle: 'Yamaha Fazer 250', date: '18/07/2026', period: '16:30', status: 'confirmed' as const },
  { id: 'APT-003', customer: 'Rafael Costa', phone: '(18) 95555-4444', service: 'Manutenção Freios', motorcycle: 'Suzuki Yes 125', date: '19/07/2026', period: '09:00', status: 'confirmed' as const },
  { id: 'APT-004', customer: 'Fernando Lima', phone: '(18) 93333-2222', service: 'Troca de Relação', motorcycle: 'Honda CB 300', date: '19/07/2026', period: '11:00', status: 'pending' as const },
  { id: 'APT-005', customer: 'Gabriel Santos', phone: '(18) 91111-0000', service: 'Diagnóstico Elétrico', motorcycle: 'Kawasaki Ninja 300', date: '20/07/2026', period: '08:00', status: 'pending' as const },
  { id: 'APT-006', customer: 'Thiago Oliveira', phone: '(18) 99999-1111', service: 'Revisão Completa', motorcycle: 'Honda XRE 190', date: '17/07/2026', period: '10:00', status: 'completed' as const },
  { id: 'APT-007', customer: 'Marcos Souza', phone: '(18) 98888-7777', service: 'Troca de Pneus', motorcycle: 'Yamaha MT-03', date: '16/07/2026', period: '15:00', status: 'cancelled' as const },
  { id: 'APT-008', customer: 'Bruno Almeida', phone: '(18) 97777-5555', service: 'Limpeza Injeção', motorcycle: 'Honda CB 500', date: '20/07/2026', period: '13:00', status: 'pending' as const },
]

const statusConfig = {
  pending: { label: 'Pendente', variant: 'warning' as const },
  confirmed: { label: 'Confirmado', variant: 'success' as const },
  completed: { label: 'Concluído', variant: 'secondary' as const },
  cancelled: { label: 'Cancelado', variant: 'danger' as const },
}

export default function AdminAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie os agendamentos de serviços</p>
        </div>
        <div className="flex gap-2">
          <Button variant="default">
            <Check className="h-4 w-4" />
            Confirmar
          </Button>
          <Button variant="destructive">
            <X className="h-4 w-4" />
            Cancelar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar agendamentos..."
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Protocolo</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Cliente</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Serviço</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Moto</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Data</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Horário</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{apt.id}</td>
                    <td className="py-3 text-gray-700">{apt.customer}</td>
                    <td className="py-3 text-gray-500">{apt.service}</td>
                    <td className="py-3 text-gray-500">{apt.motorcycle}</td>
                    <td className="py-3 text-gray-700">{apt.date}</td>
                    <td className="py-3 text-gray-700">{apt.period}</td>
                    <td className="py-3">
                      <Badge variant={statusConfig[apt.status].variant}>
                        {statusConfig[apt.status].label}
                      </Badge>
                    </td>
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
