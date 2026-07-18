import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DadosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dados Pessoais</h1>
      <p className="text-sm text-gray-500 mb-8">Gerencie suas informações de cadastro.</p>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Formulário de dados</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-sm">
            Em breve você poderá editar seus dados pessoais, alterar e-mail e telefone diretamente aqui.
          </p>
          <Button disabled>Salvar alterações</Button>
        </div>
      </div>
    </div>
  )
}
