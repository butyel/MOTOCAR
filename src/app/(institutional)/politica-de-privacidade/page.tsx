import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade da Motocar. Saiba como tratamos seus dados pessoais.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Política de Privacidade' }]} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>
        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <p>
            A Motocar valoriza a privacidade dos seus clientes e visitantes. Esta Política de Privacidade
            descreve como coletamos, usamos e protegemos as informações pessoais fornecidas em nosso site.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">1. Informações que Coletamos</h2>
          <p>
            Podemos coletar as seguintes informações pessoais quando você utiliza nosso site:
          </p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone/WhatsApp</li>
            <li>Dados da motocicleta (marca, modelo, ano)</li>
            <li>Informações de navegação (cookies)</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900">2. Como Usamos suas Informações</h2>
          <p>Utilizamos as informações coletadas para:</p>
          <ul>
            <li>Processar pedidos e orçamentos</li>
            <li>Agendar serviços na oficina</li>
            <li>Responder dúvidas e solicitações</li>
            <li>Enviar comunicações relacionadas aos serviços</li>
            <li>Melhorar nossa experiência no site</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900">3. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para
            processar seu pedido (como transportadoras) ou quando exigido por lei.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">4. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar sua experiência de navegação. Você pode configurar seu
            navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">5. Segurança</h2>
          <p>
            Adotamos medidas de segurança para proteger suas informações pessoais contra acesso não
            autorizado, alteração ou destruição.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">6. Seus Direitos</h2>
          <p>
            Você tem direito a solicitar a correção, atualização ou exclusão dos seus dados pessoais.
            Para exercer esses direitos, entre em contato conosco.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">7. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta política, entre em contato pelo e-mail contato@motocar.com.br
            ou pelo WhatsApp (18) 3281-7353.
          </p>

          <p className="text-sm text-gray-400 mt-8">Última atualização: Junho de 2024</p>
        </div>
      </div>
    </>
  )
}
