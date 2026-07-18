import { Wrench } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-red-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wrench className="h-6 w-6 text-red-600 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 animate-pulse">Carregando...</p>
    </div>
  )
}
