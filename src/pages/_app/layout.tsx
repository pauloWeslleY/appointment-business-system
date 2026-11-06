import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/features/authentication/layout/app-layout'
import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context, location }) => {
    const session = await validateEnsureAuthRoute(
      context.queryClient,
      location.pathname,
    )
    return { session }
  },
  component: AppLayout,
})
