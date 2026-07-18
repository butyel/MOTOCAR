'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Package, ShoppingCart, Users, CalendarCheck, TrendingUp, TrendingDown } from 'lucide-react'

const stats = [
  {
    title: 'Total de Produtos',
    value: '2.450',
    change: '+12%',
    positive: true,
    icon: Package,
  },
  {
    title: 'Total de Pedidos',
    value: '893',
    change: '+8%',
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: 'Total de Clientes',
    value: '1.247',
    change: '+23%',
    positive: true,
    icon: Users,
  },
  {
    title: 'Agendamentos Pendentes',
    value: '14',
    change: '-5%',
    positive: false,
    icon: CalendarCheck,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral da Motocar</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className={cn(
                'flex items-center gap-1 text-xs mt-1',
                stat.positive ? 'text-green-600' : 'text-red-600'
              )}>
                {stat.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: '#MC-2024-001', name: 'Carlos Silva', total: 'R$ 189,90', status: 'Aguardando' },
                { id: '#MC-2024-002', name: 'Ana Oliveira', total: 'R$ 79,90', status: 'Aprovado' },
                { id: '#MC-2024-003', name: 'João Santos', total: 'R$ 459,70', status: 'Entregue' },
                { id: '#MC-2024-004', name: 'Maria Souza', total: 'R$ 32,90', status: 'Cancelado' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.name}</p>
                    <p className="text-xs text-gray-500">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.total}</p>
                    <p className="text-xs text-gray-500">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Próximos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Pedro Alves', service: 'Revisão Completa', date: 'Hoje 14:00' },
                { name: 'Lucas Mendes', service: 'Troca de Óleo', date: 'Hoje 16:30' },
                { name: 'Rafael Costa', service: 'Manutenção Freios', date: 'Amanhã 09:00' },
                { name: 'Fernando Lima', service: 'Troca de Relação', date: 'Amanhã 11:00' },
              ].map((apt) => (
                <div key={apt.name} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{apt.name}</p>
                    <p className="text-xs text-gray-500">{apt.service}</p>
                  </div>
                  <p className="text-sm text-gray-700">{apt.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

