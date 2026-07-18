'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react'
import { Category } from '@/types'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'

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
        className={`flex items-center justify-between py-2.5 px-4 text-sm hover:bg-motocar-light-gray hover:text-motocar-red transition-colors ${
          depth > 0 ? 'pl-8 text-motocar-gray' : 'text-motocar-graphite font-semibold'
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
        <div className="bg-motocar-off-white">
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
        className="p-1.5 text-motocar-graphite hover:text-motocar-red transition-colors"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-motocar-light-gray p-4 flex items-center justify-between">
              <span className="font-heading text-xl font-bold text-motocar-graphite">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-motocar-gray hover:text-motocar-graphite transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-2">
              <Link
                href="/"
                className="block py-2.5 px-4 text-sm font-semibold text-motocar-graphite hover:bg-motocar-light-gray hover:text-motocar-red transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              {NAV_LINKS.filter(l => l.name !== 'Contato').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2.5 px-4 text-sm font-semibold text-motocar-graphite hover:bg-motocar-light-gray hover:text-motocar-red transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-motocar-light-gray mt-2 pt-2">
                <p className="px-4 text-xs font-semibold text-motocar-gray uppercase tracking-wider mb-1">Categorias</p>
                {tree.map((category) => (
                  <MenuItem key={category.id} category={category} />
                ))}
              </div>
              <div className="border-t border-motocar-light-gray mt-2 pt-2 px-4">
                <p className="text-xs text-motocar-gray mb-2">Atendimento</p>
                <a href={`tel:${SITE_CONFIG.phone}`} className="block text-sm text-motocar-graphite hover:text-motocar-red transition-colors">
                  {SITE_CONFIG.phone}
                </a>
                <p className="text-xs text-motocar-gray mt-1">{SITE_CONFIG.address.full}</p>
              </div>
              <div className="border-t border-motocar-light-gray mt-2 pt-2 px-4 pb-4">
                <Link
                  href="/contato"
                  className="block text-sm text-motocar-red font-semibold hover:text-motocar-red-dark transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
