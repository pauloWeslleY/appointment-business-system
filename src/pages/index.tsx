import { Theme } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from '@/features/landing/pages/landing.page'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Sistema de agendamento online para empresas | Agendros',
      },
      {
        name: 'description',
        content:
          'Seus clientes escolhem um horário pelo seu link, e você acompanha a agenda da equipe. Teste a Agendros por 7 dias, sem cartão.',
      },
    ],
  }),
})

function RouteComponent() {
  return (
    <Theme appearance="dark">
      <LandingPage />
    </Theme>
  )
}
