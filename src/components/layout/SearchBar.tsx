'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <form onSubmit={handleSubmit} className="flex w-full">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Buscar produtos, marcas, códigos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-r-none border-gray-300 h-10 text-sm"
            />
          </div>
          <Button type="submit" size="sm" className="rounded-l-none h-10 px-5">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <button
        className="md:hidden p-2 text-gray-600 hover:text-red-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buscar"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-3 shadow-lg z-50">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-r-none h-10 text-sm"
              autoFocus
            />
            <Button type="submit" size="sm" className="rounded-l-none h-10 px-4">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
