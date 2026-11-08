import { createFileRoute } from '@tanstack/react-router'

import TermsOfUsePage from '@/features/legal/pages/terms-of-use.page'

export const Route = createFileRoute('/terms-of-use')({
  head: () => ({
    meta: [
      { title: 'Termos de Uso para Clientes | Agendros' },
      {
        name: 'description',
        content:
          'Condições de uso do Agendros para clientes: cadastro, agendamentos, pagamentos, privacidade e suporte.',
      },
    ],
  }),
  component: TermsOfUsePage,
})
