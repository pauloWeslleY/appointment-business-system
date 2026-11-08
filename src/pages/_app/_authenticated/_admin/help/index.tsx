import { createFileRoute } from '@tanstack/react-router'

import FrequentlyAskedQuestionsPage from '@/features/help/pages/frequently-asked-questions.page'

export const Route = createFileRoute('/_app/_authenticated/_admin/help/')({
  head: () => ({
    meta: [{ title: 'Dúvidas frequentes | Agendros' }],
  }),
  component: FrequentlyAskedQuestionsPage,
})
