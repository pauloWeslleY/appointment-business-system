import { createFileRoute } from '@tanstack/react-router'

import ProfessionalsPage from '@/features/professionals/pages/professionals.page'

export const Route = createFileRoute('/dashboard/$slug/professionals/')({
  component: ProfessionalsPage,
})
