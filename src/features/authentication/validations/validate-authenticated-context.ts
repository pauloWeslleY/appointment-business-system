import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { memberContextQueryOptions } from '@/features/members/queries/member.query-options'

import type {
  AuthenticatedContext,
  AuthenticationSession,
} from '../types/authentication-session.type'

export async function validateAuthenticatedContext(
  queryClient: QueryClient,
  session: AuthenticationSession,
): Promise<AuthenticatedContext> {
  const userId = session.user.id
  const activeOrganizationId = session.session.activeOrganizationId

  if (!activeOrganizationId) {
    throw redirect({ to: '/organization-profile' })
  }

  const memberContext = await queryClient.query(
    memberContextQueryOptions(userId, activeOrganizationId),
  )

  return {
    session,
    memberContext,
  }
}
