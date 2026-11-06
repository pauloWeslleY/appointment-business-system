import type { QueryClient } from '@tanstack/react-query'

import { authenticationQueryKey } from '@/features/authentication/queries/authentication.query-key'
import { authenticationSessionQueryOptions } from '@/features/authentication/queries/authentication.query-options'
import { BadRequestError } from '@/shared/errors'

import type { GetMeContextResponse } from '../types/member-response.type'
import { memberQueryKey } from './member.query-key'

export function cacheSelectedMemberContext(
  queryClient: QueryClient,
  selectedContext: GetMeContextResponse,
): void {
  const sessionKey = authenticationSessionQueryOptions().queryKey
  const cachedSession = queryClient.getQueryData(sessionKey)
  const matchesAuthenticatedUser =
    cachedSession?.user.id === selectedContext.user.id

  if (!matchesAuthenticatedUser) {
    throw new BadRequestError(
      'O contexto não corresponde ao usuário autenticado.',
    )
  }

  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] !== authenticationQueryKey.all[0],
  })
  queryClient.setQueryData(
    memberQueryKey.meContextByOrganization(
      selectedContext.organization.id,
      selectedContext.user.id,
    ),
    selectedContext,
  )
  queryClient.setQueryData(sessionKey, (previous) =>
    previous
      ? {
          ...previous,
          session: {
            ...previous.session,
            activeOrganizationId: selectedContext.organization.id,
          },
        }
      : previous,
  )
}
