import type { QueryClient } from '@tanstack/react-query'

import { memberContextQueryOptions } from '@/features/members/queries/member.query-options'

import { validateEnsureAuthRoute } from './validate-auth-route'

export async function validateAuthenticatedContext(queryClient: QueryClient) {
  const session = await validateEnsureAuthRoute()
  const userId = session.user.id
  const activeOrganization = session.session.activeOrganizationId

  if (!activeOrganization) {
    throw new Response('Selecione uma organização ativa', {
      status: 400,
    })
  }

  const memberContext = await queryClient.query(
    memberContextQueryOptions(userId, activeOrganization),
  )

  const matchedMemberContext =
    memberContext.user.id === userId &&
    memberContext.organization.id === activeOrganization

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
