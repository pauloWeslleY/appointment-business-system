import { Link } from '@chakra-ui/react'

import LegalDocumentPage from '../components/legal-document-page'
import { privacyPolicySections } from '../constants/privacy-policy'

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Política de Privacidade"
      description="Saiba quais dados são tratados no Agendros, para que são usados e como exercer seus direitos."
      sections={privacyPolicySections}
      introduction={
        <>
          Esta Política explica o tratamento de dados pessoais na área de
          clientes do Agendros, disponível em{' '}
          <Link
            display="inline"
            href="https://cliente.agendros.com.br"
            color={{ _light: 'sea.700', _dark: 'sea.300' }}
          >
            cliente.agendros.com.br
          </Link>
          , e nas páginas de agendamento dos estabelecimentos.
        </>
      }
    />
  )
}
