import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { memberContextQueryOptions } from '@/features/members/queries/member.query-options'

import { validateEnsureAuthRoute } from './validate-auth-route'

export async function validateAuthenticatedContext(queryClient: QueryClient) {
  const session = await validateEnsureAuthRoute()
  const userId = session.user.id
  const activeOrganizationId = session.session.activeOrganizationId

  if (!activeOrganizationId) {
    throw redirect({ to: '/organization-profile' })
  }

  const memberContext = await queryClient.query(
    memberContextQueryOptions(userId, activeOrganizationId),
  )

  const matchedMemberContext =
    memberContext.user.id === userId &&
    memberContext.organization.id === activeOrganizationId

  if (!matchedMemberContext) {
    throw new Response('Contexto de membro não corresponde à sessão!', {
      status: 400,
    })
  }

  return {
    session,
    memberContext,
  }
}
