import { createFileRoute } from '@tanstack/react-router'

import { AuthenticatedContextLayout } from '@/features/authentication/layout/authenticated-context-layout'
import { validateAuthenticatedContext } from '@/features/authentication/validations/validate-authenticated-context'

export const Route = createFileRoute('/_app/_authenticated')({
  beforeLoad: ({ context }) =>
    validateAuthenticatedContext(context.queryClient, context.session),
  component: AuthenticatedContextLayout,
})
