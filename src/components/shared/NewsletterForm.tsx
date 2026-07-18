'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function NewsletterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !consent) {
      setError('Preencha todos os campos e aceite a política de privacidade.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabase = supabaseUrl ? (await import('@/lib/supabase/client')).createClient() : null
      if (supabase) {
        await supabase.from('newsletter_subscribers').insert({ name: name.trim(), email: email.trim() })
      } else {
        console.log('Newsletter: saved locally', { name, email })
      }
      setSuccess(true)
      setName('')
      setEmail('')
      setConsent(false)
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-3 text-green-600 bg-green-50 rounded-lg p-4">
        <CheckCircle className="h-6 w-6 shrink-0" />
        <div>
          <p className="font-medium">Cadastro realizado!</p>
          <p className="text-sm">Agora você receberá novidades e promoções da Motocar.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 text-white mb-2">
        <Mail className="h-5 w-5 text-red-400" />
        <p className="font-medium">Receba novidades e ofertas</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <Label htmlFor="newsletter-name" className="sr-only">Nome</Label>
          <Input
            id="newsletter-name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="newsletter-email" className="sr-only">E-mail</Label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <Button type="submit" disabled={loading} className="h-10">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Cadastrar'
          )}
        </Button>
      </div>
      <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Aceito receber comunicações e concordo com a{' '}
          <a href="/politica-de-privacidade" className="text-red-400 hover:underline">
            política de privacidade
          </a>.
        </span>
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  )
}
