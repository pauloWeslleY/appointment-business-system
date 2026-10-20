import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import VerifyEmail from '@/features/authentication/pages/verifiy-email.page'

export const Route = createFileRoute('/_auth/verify-email/')({
  validateSearch: z.object({
    token: z.string(),
  }),
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const { search } = Route.useMatch()

  return <VerifyEmail search={search} />
}
