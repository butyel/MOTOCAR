'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
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
      <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar produtos, marcas, códigos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-8 border border-motocar-light-gray bg-motocar-off-white text-sm text-motocar-graphite px-3 focus:outline-none focus:border-motocar-red transition-colors placeholder:text-motocar-gray"
          />
          <button
            type="submit"
            className="h-8 px-3 bg-motocar-red text-white hover:bg-motocar-red-dark transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
      <button
        className="md:hidden p-1.5 text-motocar-graphite hover:text-motocar-red transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buscar"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-motocar-light-gray p-3 shadow-sm z-50">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-9 border border-motocar-light-gray text-sm px-3 focus:outline-none focus:border-motocar-red"
              autoFocus
            />
            <button
              type="submit"
              className="h-9 px-3 bg-motocar-red text-white hover:bg-motocar-red-dark transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
