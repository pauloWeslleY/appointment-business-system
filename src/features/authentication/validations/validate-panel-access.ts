import { type QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import type { AuthenticationSessionType } from '@/shared/types/auth-client.type'

import { authenticatedContextQueryOptions } from '../queries/authentication.query-options'

export async function validatePanelAccess(
  queryClient: QueryClient,
  session: AuthenticationSessionType,
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
