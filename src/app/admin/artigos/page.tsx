'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Plus, Search, Eye } from 'lucide-react'

const articles = [
  { id: 'post-1', title: 'Quando trocar o óleo da moto? Guia completo', category: 'Manutenção', author: 'Equipe Motocar', date: '20/05/2024', views: 1230, status: 'Publicado' as const },
  { id: 'post-2', title: 'Como saber se a relação da moto está desgastada?', category: 'Manutenção', author: 'Equipe Motocar', date: '01/06/2024', views: 890, status: 'Publicado' as const },
  { id: 'post-3', title: 'Filtro de ar sujo pode fazer a moto perder força?', category: 'Peças', author: 'Equipe Motocar', date: '10/06/2024', views: 675, status: 'Publicado' as const },
  { id: 'post-4', title: 'Quais sinais indicam problemas no freio da moto?', category: 'Oficina', author: 'Equipe Motocar', date: '15/06/2024', views: 540, status: 'Publicado' as const },
  { id: 'post-5', title: 'Como aumentar a vida útil da sua motocicleta', category: 'Dicas', author: 'Equipe Motocar', date: '20/06/2024', views: 320, status: 'Publicado' as const },
  { id: 'post-6', title: 'Guia de manutenção preventiva para motos', category: 'Manutenção', author: 'Equipe Motocar', date: '25/06/2024', views: 0, status: 'Rascunho' as const },
  { id: 'post-7', title: 'Melhores capacetes para 2024', category: 'Acessórios', author: 'Equipe Motocar', date: '28/06/2024', views: 0, status: 'Rascunho' as const },
]

export default function AdminArticles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artigos</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie o blog da Motocar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Artigo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Título</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Categoria</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Autor</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Data</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Visualizações</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Status</th>
                  <th className="text-right font-medium text-gray-500 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900 max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="py-3 text-gray-500">{article.category}</td>
                    <td className="py-3 text-gray-500">{article.author}</td>
                    <td className="py-3 text-gray-500">{article.date}</td>
                    <td className="py-3 text-gray-700">{article.views}</td>
                    <td className="py-3">
                      <Badge variant={article.status === 'Publicado' ? 'success' : 'warning'}>
                        {article.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Editar">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-red-600" title="Excluir">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
