import { type QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { authenticatedContextQueryOptions } from '../queries/authentication.query-options'
import type { AuthenticationSession } from '../types/authentication-session.type'

export async function validatePanelAccess(
  queryClient: QueryClient,
  session: AuthenticationSession,
) {
  const context = await queryClient.query(
    authenticatedContextQueryOptions(
      session.user.id,
      session.session.activeOrganizationId,
    ),
  )

  if (!context.canAccessAdmin && !context.canStartBusinessOnboarding) {
    throw redirect({
      to: '/business-access-required',
      replace: true,
    })
  }

  return context
}
