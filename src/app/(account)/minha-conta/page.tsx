'use client'

import Link from 'next/link'
import { Package, MapPin, User, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const menuItems = [
  { href: '/minha-conta/pedidos', icon: Package, label: 'Meus Pedidos', description: 'Acompanhe seus pedidos' },
  { href: '/minha-conta/dados', icon: User, label: 'Dados Pessoais', description: 'Altere suas informações' },
  { href: '/minha-conta/enderecos', icon: MapPin, label: 'Endereços', description: 'Gerencie seus endereços' },
]

export default function MinhaContaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Minha Conta</h1>
      <p className="text-gray-500 mb-8">Bem-vindo à sua central de atendimento.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full hover:border-red-200 hover:shadow-sm transition-all group cursor-pointer">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-red-600 transition-colors shrink-0 mt-1" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Nome do Cliente</p>
            <p className="text-sm text-gray-500">email@exemplo.com</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <p>Telefone: (18) 99999-9999</p>
          <p>Membro desde: Janeiro de 2024</p>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/minha-conta/dados">
            <User className="h-4 w-4" />
            Editar dados
          </Link>
        </Button>
      </div>
    </div>
  )
}
