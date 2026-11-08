import { createFileRoute } from '@tanstack/react-router'

import PrivacyPolicyPage from '@/features/legal/pages/privacy-policy.page'

export const Route = createFileRoute('/_legal/politica-de-privacidade')({
  head: () => ({
    meta: [
      { title: 'Política de Privacidade para Clientes | Agendros' },
      {
        name: 'description',
        content:
          'Conheça o tratamento de dados pessoais no Agendros, as finalidades, os compartilhamentos e os canais para exercer seus direitos.',
      },
    ],
  }),
  component: PrivacyPolicyPage,
})
