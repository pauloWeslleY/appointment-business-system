import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { panelAccessQueryOptions } from '../queries/panel-access.query-options'
import type { AuthenticationSession } from '../types/authentication-session.type'

export async function validatePanelAccess(
  queryClient: QueryClient,
  session: AuthenticationSession,
) {
  const access = await queryClient.query(
    panelAccessQueryOptions(
      session.user.id,
      session.session.activeOrganizationId,
    ),
  )

  if (!access.canAccessAdmin && !access.canStartBusinessOnboarding) {
    throw redirect({ to: '/business-access-required', replace: true })
  }

  return access
}
