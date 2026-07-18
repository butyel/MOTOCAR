import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e condições de uso do site da Motocar.',
}

export default function TermsOfUsePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Termos de Uso' }]} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Termos de Uso</h1>
        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <p>
            Ao acessar e utilizar o site da Motocar, você concorda com os termos e condições descritos
            abaixo. Se não concordar com algum destes termos, pedimos que não utilize nosso site.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">1. Informações Gerais</h2>
          <p>
            A Motocar comercializa peças, acessórios e serviços para motocicletas. As informações contidas
            neste site são de caráter informativo e podem ser alteradas sem aviso prévio.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">2. Produtos e Preços</h2>
          <p>
            Os preços e condições de pagamento exibidos no site estão sujeitos a alteração sem aviso prévio.
            As imagens dos produtos são meramente ilustrativas. Consulte nossa equipe para confirmar
            disponibilidade e preços atualizados.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">3. Orçamentos e Pedidos</h2>
          <p>
            Os orçamentos solicitados através do site serão respondidos pela nossa equipe. O pedido será
            confirmado somente após a aprovação do orçamento pelo cliente.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">4. Responsabilidades</h2>
          <p>
            A Motocar não se responsabiliza por danos decorrentes de uso inadequado dos produtos
            adquiridos ou por instalação incorreta. É responsabilidade do cliente verificar a
            compatibilidade das peças com sua motocicleta.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do site, incluindo textos, imagens, logotipos e marcas, é de propriedade da
            Motocar ou de seus parceiros, sendo proibida a reprodução sem autorização.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">6. Alterações nos Termos</h2>
          <p>
            A Motocar pode alterar estes termos a qualquer momento. As alterações serão publicadas nesta
            página e entrarão em vigor imediatamente após a publicação.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">7. Legislação Aplicável</h2>
          <p>
            Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de
            Presidente Epitácio, SP, para dirimir quaisquer controvérsias.
          </p>

          <p className="text-sm text-gray-400 mt-8">Última atualização: Junho de 2024</p>
        </div>
      </div>
    </>
  )
}
