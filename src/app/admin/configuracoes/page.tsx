'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG } from '@/lib/constants'
import { Save } from 'lucide-react'

const initialSettings = {
  company_name: SITE_CONFIG.fullName,
  company_phone: SITE_CONFIG.phone,
  whatsapp_number: SITE_CONFIG.whatsapp,
  company_email: SITE_CONFIG.email,
  company_address: SITE_CONFIG.address.full,
  business_hours_weekday: SITE_CONFIG.businessHours.weekday,
  business_hours_saturday: SITE_CONFIG.businessHours.saturday,
  business_hours_sunday: SITE_CONFIG.businessHours.sunday,
  company_cnpj: SITE_CONFIG.cnpj,
  instagram_url: SITE_CONFIG.social.instagram,
  facebook_url: SITE_CONFIG.social.facebook,
  youtube_url: SITE_CONFIG.social.youtube,
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(initialSettings)
  const [saved, setSaved] = useState(false)

  function handleChange(field: string, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie as configurações do site</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4" />
          {saved ? 'Salvo!' : 'Salvar'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
                <Input
                  value={settings.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CNPJ</label>
                <Input
                  value={settings.company_cnpj}
                  onChange={(e) => handleChange('company_cnpj', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Telefone</label>
                <Input
                  value={settings.company_phone}
                  onChange={(e) => handleChange('company_phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">WhatsApp (com código do país)</label>
                <Input
                  value={settings.whatsapp_number}
                  onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input
                type="email"
                value={settings.company_email}
                onChange={(e) => handleChange('company_email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Endereço</label>
              <Input
                value={settings.company_address}
                onChange={(e) => handleChange('company_address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Dias Úteis</label>
                <Input
                  value={settings.business_hours_weekday}
                  onChange={(e) => handleChange('business_hours_weekday', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sábado</label>
                <Input
                  value={settings.business_hours_saturday}
                  onChange={(e) => handleChange('business_hours_saturday', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Domingo</label>
                <Input
                  value={settings.business_hours_sunday}
                  onChange={(e) => handleChange('business_hours_sunday', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Instagram</label>
                <Input
                  value={settings.instagram_url}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Facebook</label>
                <Input
                  value={settings.facebook_url}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">YouTube</label>
                <Input
                  value={settings.youtube_url}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
