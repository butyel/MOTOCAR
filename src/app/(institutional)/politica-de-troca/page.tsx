import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Política de Troca e Devolução',
  description: 'Política de troca e devolução da Motocar. Saiba como solicitar trocas e reembolsos.',
}

export default function ExchangePolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Política de Troca e Devolução' }]} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Política de Troca e Devolução</h1>
        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <p>
            A Motocar busca garantir a satisfação dos seus clientes. Esta política estabelece as condições
            para troca e devolução de produtos.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">1. Direito de Arrependimento</h2>
          <p>
            Conforme o Código de Defesa do Consumidor, você pode desistir da compra em até 7 dias corridos
            após o recebimento do produto, sem necessidade de justificativa.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">2. Condições para Troca</h2>
          <p>Para solicitar troca, o produto deve estar:</p>
          <ul>
            <li>Sem indícios de uso</li>
            <li>Na embalagem original</li>
            <li>Com todos os acessórios e manuais</li>
            <li>Com a nota fiscal</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900">3. Produtos com Defeito</h2>
          <p>
            Caso o produto apresente defeito, entre em contato em até 30 dias para produtos não duráveis
            ou 90 dias para produtos duráveis, contados da data do recebimento.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">4. Como Solicitar</h2>
          <p>
            Para solicitar troca ou devolução, entre em contato pelo WhatsApp (18) 3281-7353 ou e-mail
            contato@motocar.com.br informando o número do pedido e o motivo da solicitação.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">5. Reembolso</h2>
          <p>
            O reembolso será processado após o recebimento e análise do produto devolvido. O prazo para
            o reembolso varia conforme a forma de pagamento:
          </p>
          <ul>
            <li>Cartão de crédito: até 2 faturas</li>
            <li>Pix e boleto: até 10 dias úteis</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900">6. Produtos Sob Encomenda</h2>
          <p>
            Produtos sob encomenda não podem ser cancelados após a confirmação do pedido, exceto em caso
            de defeito de fabricação.
          </p>

          <p className="text-sm text-gray-400 mt-8">Última atualização: Junho de 2024</p>
        </div>
      </div>
    </>
  )
}
