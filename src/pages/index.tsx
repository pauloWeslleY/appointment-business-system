import { Theme } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from '@/features/landing/pages/landing.page'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Início | Agendros',
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
