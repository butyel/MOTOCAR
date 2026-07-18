import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Política de Entrega',
  description: 'Política de entrega da Motocar. Prazos, fretes e áreas de entrega.',
}

export default function DeliveryPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Política de Entrega' }]} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Política de Entrega</h1>
        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <p>
            A Motocar oferece opções de entrega para atender nossos clientes em Presidente Epitácio e região.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">1. Retirada na Loja</h2>
          <p>
            Você pode retirar seu pedido diretamente em nossa loja em Presidente Epitácio, sem custo adicional.
            Após a confirmação do pedido, seu produto estará disponível para retirada em até 24 horas úteis.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">2. Entrega Local</h2>
          <p>
            Realizamos entregas em Presidente Epitácio e região. O prazo e valor do frete serão informados
            no momento do orçamento.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">3. Entrega para outras Localidades</h2>
          <p>
            Para outras cidades e estados, o frete é calculado individualmente. Consulte nossa equipe para
            saber o valor e prazo de entrega para sua região.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">4. Prazos de Entrega</h2>
          <p>
            Os prazos de entrega começam a contar a partir da confirmação do pedido. O prazo estimado será
            informado durante o processo de orçamento.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">5. Atrasos na Entrega</h2>
          <p>
            Em caso de atraso, entraremos em contato para informar o novo prazo. Você pode cancelar o pedido
            se o atraso for superior ao informado inicialmente.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">6. Produtos com Frete Grátis</h2>
          <p>
            Oferecemos frete grátis em pedidos acima de um determinado valor. Consulte as condições
            vigentes no momento da compra.
          </p>

          <p className="text-sm text-gray-400 mt-8">Última atualização: Junho de 2024</p>
        </div>
      </div>
    </>
  )
}
