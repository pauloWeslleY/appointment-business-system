import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

import PageLoader from '@/components/page-loader'
import { useRefreshSessionContext } from '@/features/authentication/hooks/use-refresh-session-context'
import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'
import { subscriptionAccessQueryOptions } from '@/features/subscriptions/queries/subscription.query-options'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context, location }) => {
    const session = await validateEnsureAuthRoute(
      context.queryClient,
      location.pathname,
    )
    const subscription = await context.queryClient.query(
      subscriptionAccessQueryOptions(
        session.user.id,
        session.session.activeOrganizationId ?? '',
      ),
    )
    return {
      session,
      subscription,
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const hasSessionChanged = useRefreshSessionContext()
  return hasSessionChanged ? <PageLoader /> : <Outlet />
}
