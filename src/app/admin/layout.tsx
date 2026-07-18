'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ListTree,
  Tags,
  ShoppingCart,
  CalendarCheck,
  Wrench,
  FileText,
  Image,
  TicketPercent,
  Mail,
  Users,
  Settings,
  Search,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/categorias', label: 'Categorias', icon: ListTree },
  { href: '/admin/marcas', label: 'Marcas', icon: Tags },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/agendamentos', label: 'Agendamentos', icon: CalendarCheck },
  { href: '/admin/servicos', label: 'Serviços', icon: Wrench },
  { href: '/admin/artigos', label: 'Blog', icon: FileText },
  { href: '/admin/banners', label: 'Banners', icon: Image },
  { href: '/admin/cupons', label: 'Cupons', icon: TicketPercent },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden -ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </button>

        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-red-600">Admin</span>
          <span className="text-gray-700">Motocar</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Ver site
          </Link>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 mt-16 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
            {sidebarItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto shrink-0" />}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div
          className={cn(
            'fixed inset-0 z-20 bg-black/50 lg:hidden',
            sidebarOpen ? 'block' : 'hidden'
          )}
          onClick={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
