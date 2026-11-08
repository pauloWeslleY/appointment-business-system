import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from '@/features/landing/pages/landing.page'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Início | Agendros' }],
  }),
  component: LandingPage,
})
