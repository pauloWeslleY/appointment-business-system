import { createFileRoute } from '@tanstack/react-router'
import { Outlet, useMatches } from '@tanstack/react-router'

import Loader from '@/components/loader'
import LoaderFull from '@/components/loader-full'
import { useRefreshSessionContext } from '@/features/authentication/hooks/use-refresh-session-context'
import {
  validateEnsureAuthRoute,
  validateEnsureSessionRoute,
} from '@/features/authentication/validations/validate-auth-route'
import { subscriptionAccessQueryOptions } from '@/features/subscriptions/queries/subscription.query-options'

export const Route = createFileRoute('/_app')({
  pendingComponent: AppPendingLoader,
  beforeLoad: async ({ context, location }) => {
    const session = await validateEnsureSessionRoute(
      context.queryClient,
      location.pathname,
    )
    const authorization = validateEnsureAuthRoute(
      context.queryClient,
      location.pathname,
    )

    const activeOrganizationId = session.session.activeOrganizationId

    // Sem organização ativa a query de acesso usa skipToken; executá-la
    // imperativamente rejeita com "Missing queryFn" e derruba a rota.
    if (!activeOrganizationId) {
      await authorization

      return {
        session,
        subscription: undefined,
      }
    }

    const [, subscription] = await Promise.all([
      authorization,
      context.queryClient.query(
        subscriptionAccessQueryOptions(session.user.id, activeOrganizationId),
      ),
    ])

    return {
      session,
      subscription,
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const hasSessionChanged = useRefreshSessionContext()

  return hasSessionChanged ? <AppPendingLoader /> : <Outlet />
}

function AppPendingLoader() {
  const hasAuthenticatedLayout = useMatches({
    select: (matches) =>
      matches.some((match) => match.routeId === '/_app/_authenticated'),
  })

  if (hasAuthenticatedLayout) {
    return <LoaderFull />
  }

  return <Loader />
}
