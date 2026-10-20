import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import FormResetPassword from '@/features/authentication/pages/reset-password.page'

export const Route = createFileRoute('/_auth/reset-password/')({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { search } = Route.useMatch()
  return <FormResetPassword token={search.token} />
}
