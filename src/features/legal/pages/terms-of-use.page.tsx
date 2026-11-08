import { Link } from '@chakra-ui/react'

import LegalDocumentPage from '../components/legal-document-page'
import { termsOfUseSections } from '../constants/terms-of-use'

export default function TermsOfUsePage() {
  return (
    <LegalDocumentPage
      title="Termos de Uso"
      description="Conheça as condições para usar o Agendros, encontrar estabelecimentos e organizar seus agendamentos."
      sections={termsOfUseSections}
      introduction={
        <>
          Estes Termos regulam o uso da área de clientes do Agendros, acessível
          em{' '}
          <Link
            display="inline"
            href="https://cliente.agendros.com.br"
            color={{ _light: 'sea.700', _dark: 'sea.300' }}
          >
            cliente.agendros.com.br
          </Link>
          , e das páginas de agendamento dos estabelecimentos disponibilizadas
          nessa área.
        </>
      }
    />
  )
}
