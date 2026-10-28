import type { QueryClient } from '@tanstack/react-query'

import { memberContextQueryOptions } from '@/features/members/queries/member.query-options'

import { validateEnsureAuthRoute } from './validate-auth-route'

export async function validateAuthenticatedContext(queryClient: QueryClient) {
  const session = await validateEnsureAuthRoute()
  const userId = session.user.id
  const activeOrganization = session.session.activeOrganizationId

  if (!activeOrganization) {
    throw new Error('Selecione uma organização ativa')
  }

  const memberContext = await queryClient.query(
    memberContextQueryOptions(userId, activeOrganization),
  )

  const matchedMemberContext =
    memberContext.user.id === userId &&
    memberContext.organization.id === activeOrganization

  if (!matchedMemberContext) {
    throw new Error('Contexto de membro não corresponde à sessão!')
  }

  return {
    session,
    memberContext,
  }
}
