'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Category } from '@/types'
import { NAV_LINKS } from '@/lib/constants'

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

export function MegaMenu({ categories }: { categories: Category[] }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const tree = buildTree(categories)
  const rootIds = new Set(tree.map(c => c.id))

  const mainLinks = NAV_LINKS.filter(l => {
    const cat = tree.find(c => c.slug === l.href.replace('/categorias/', ''))
    return !cat
  })

  return (
    <nav className="hidden lg:block bg-motocar-graphite">
      <div className="container-motocar">
        <ul className="flex items-center -mx-2" onMouseLeave={() => setActiveMenu(null)}>
          {mainLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-3 py-2.5 text-xs font-semibold text-motocar-white uppercase tracking-wider hover:bg-motocar-red transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {tree.map((category) => (
            <li
              key={category.id}
              className="relative"
              onMouseEnter={() => setActiveMenu(category.id)}
            >
              <Link
                href={`/categorias/${category.slug}`}
                className={`flex items-center gap-1 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeMenu === category.id
                    ? 'bg-motocar-red text-white'
                    : 'text-motocar-white hover:bg-motocar-red'
                }`}
              >
                {category.name}
                {category.children && category.children.length > 0 && (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Link>
              {activeMenu === category.id && category.children && category.children.length > 0 && (
                <div className="absolute top-full left-0 bg-white border border-motocar-light-gray shadow-sm z-50 min-w-[200px] py-1">
                  {category.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/categorias/${child.slug}`}
                      className="block px-4 py-2 text-sm text-motocar-graphite hover:bg-motocar-light-gray hover:text-motocar-red transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
