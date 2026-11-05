import { createFileRoute } from '@tanstack/react-router'

import OpeningHoursPage from '@/features/opening-hours/pages/opening-hours.page'

export const Route = createFileRoute('/dashboard/$slug/opening-hours/')({
  component: OpeningHoursPage,
  head: () => ({
    meta: [{ title: 'Horários de Funcionamento' }],
  }),
})
