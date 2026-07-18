'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Wrench, Zap, CircleSlash, GitCompare, Circle, Filter, Droplet, Shield, Sun, BatteryCharging, Radius, Backpack, Shirt, Tag, Sparkles, ChevronsUpDown, Minus, HelpCircle } from 'lucide-react'
import { Category } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  'circle-slash': <CircleSlash className="h-4 w-4" />,
  'git-compare': <GitCompare className="h-4 w-4" />,
  circle: <Circle className="h-4 w-4" />,
  filter: <Filter className="h-4 w-4" />,
  droplet: <Droplet className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
  sun: <Sun className="h-4 w-4" />,
  'battery-charging': <BatteryCharging className="h-4 w-4" />,
  radius: <Radius className="h-4 w-4" />,
  backpack: <Backpack className="h-4 w-4" />,
  shirt: <Shirt className="h-4 w-4" />,
  tool: <Wrench className="h-4 w-4" />,
  tag: <Tag className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
  'chevrons-up-down': <ChevronsUpDown className="h-4 w-4" />,
  minus: <Minus className="h-4 w-4" />,
  helmet: <HelpCircle className="h-4 w-4" />,
}

function getIcon(iconName: string | null | undefined): React.ReactNode {
  if (!iconName) return <HelpCircle className="h-4 w-4" />
  return iconMap[iconName] || <HelpCircle className="h-4 w-4" />
}

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

  return (
    <nav className="hidden lg:block bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center" onMouseLeave={() => setActiveMenu(null)}>
          {tree.map((category) => (
            <li
              key={category.id}
              className="relative"
              onMouseEnter={() => setActiveMenu(category.id)}
            >
              <Link
                href={`/categorias/${category.slug}`}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors hover:text-red-600 ${
                  activeMenu === category.id ? 'text-red-600' : 'text-gray-700'
                }`}
              >
                {getIcon(category.icon)}
                {category.name}
                {category.children && category.children.length > 0 && (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Link>
              {activeMenu === category.id && category.children && category.children.length > 0 && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-b-lg z-50 min-w-[200px] py-2">
                  {category.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/categorias/${child.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50"
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
