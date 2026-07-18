'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react'
import { Category } from '@/types'
import { SITE_CONFIG } from '@/lib/constants'

function buildTree(categories: Category[]): Category[] {
  const map = new Map<string, Category>()
  const roots: Category[] = []
  categories.forEach(cat => map.set(cat.id, { ...cat, children: [] }))
  categories.forEach(cat => {
    if (cat.parent_id && map.has(cat.parent_id)) {
      map.get(cat.parent_id)!.children!.push(map.get(cat.id)!)
    } else if (!cat.parent_id) {
      roots.push(map.get(cat.id)!)
    }
  })
  return roots
}

function MenuItem({ category, depth = 0 }: { category: Category; depth?: number }) {
  const [open, setOpen] = useState(false)
  const hasChildren = category.children && category.children.length > 0

  return (
    <div>
      <Link
        href={`/categorias/${category.slug}`}
        className={`flex items-center justify-between py-2.5 px-4 text-sm hover:bg-gray-50 hover:text-red-600 ${
          depth > 0 ? 'pl-8 text-gray-500' : 'text-gray-700 font-medium'
        }`}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault()
            setOpen(!open)
          }
        }}
      >
        <span>{category.name}</span>
        {hasChildren && (
          open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </Link>
      {open && hasChildren && (
        <div className="bg-gray-50">
          {category.children!.map((child) => (
            <MenuItem key={child.id} category={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileMenu({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const tree = buildTree(categories)

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 hover:text-red-600"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <span className="font-bold text-lg text-gray-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-2">
              <Link
                href="/"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              {tree.map((category) => (
                <MenuItem key={category.id} category={category} />
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href="/ofertas"
                  className="block py-2.5 px-4 text-sm font-medium text-red-600 hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  Ofertas
                </Link>
                <Link
                  href="/novidades"
                  className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Novidades
                </Link>
                <Link
                  href="/servicos"
                  className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  href="/blog"
                  className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/sobre"
                  className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre
                </Link>
                <Link
                  href="/contato"
                  className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Contato
                </Link>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 px-4">
                <p className="text-xs text-gray-400 mb-2">Atendimento</p>
                <a href={`tel:${SITE_CONFIG.phone}`} className="block text-sm text-gray-600 hover:text-red-600">
                  {SITE_CONFIG.phone}
                </a>
                <p className="text-xs text-gray-400 mt-2">{SITE_CONFIG.address.full}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
