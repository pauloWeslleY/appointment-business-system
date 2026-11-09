import { type QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import type {
  AuthenticatedContext,
  AuthenticationSession,
} from '../types/authentication-session.type'
import { hasOperationalContext } from './has-operational-context'
import { validatePanelAccess } from './validate-panel-access'

export async function validateAuthenticatedContext(
  queryClient: QueryClient,
  session: AuthenticationSession,
): Promise<AuthenticatedContext> {
  const memberContext = await validatePanelAccess(queryClient, session)
  const hasValidOperationalContext = !hasOperationalContext(memberContext)

  if (hasValidOperationalContext) {
    throw redirect({
      to: '/organization-profile',
      replace: true,
    })
  }

  return {
    session,
    memberContext,
  }
}
