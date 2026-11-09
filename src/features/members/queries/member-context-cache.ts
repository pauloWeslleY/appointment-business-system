import type { QueryClient } from '@tanstack/react-query'

import { authenticationQueryKey } from '@/features/authentication/queries/authentication.query-key'
import {
  authenticatedContextQueryOptions,
  authenticationSessionQueryOptions,
} from '@/features/authentication/queries/authentication.query-options'
import type { AuthenticatedContextApiResponse } from '@/features/authentication/types/authenticated-context.type'
import { hasOperationalContext } from '@/features/authentication/validations/has-operational-context'
import { BadRequestError } from '@/shared/errors'

export async function cacheSelectedMemberContext(
  queryClient: QueryClient,
  selectedContext: AuthenticatedContextApiResponse,
): Promise<void> {
  const hasValidContextOperational = !hasOperationalContext(selectedContext)

  if (hasValidContextOperational) {
    throw new BadRequestError(
      'A seleção não retornou um contexto empresarial ativo e completo.',
    )
  }

  await queryClient.cancelQueries()

  const sessionKey = authenticationSessionQueryOptions().queryKey
  const cachedSession = queryClient.getQueryData(sessionKey)
  const matchesAuthenticatedUser =
    cachedSession?.user.id === selectedContext.user.id

  if (!cachedSession || !matchesAuthenticatedUser) {
    throw new BadRequestError(
      'O contexto não corresponde ao usuário autenticado.',
    )
  }

  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] !== authenticationQueryKey.all[0],
  })

  const contextOptions = authenticatedContextQueryOptions(
    selectedContext.user.id,
    selectedContext.organization.id,
  )

  queryClient.setQueryData<AuthenticatedContextApiResponse>(
    contextOptions.queryKey,
    selectedContext,
  )

  queryClient.setQueryData(sessionKey, () => ({
    ...cachedSession,
    session: {
      ...cachedSession.session,
      activeOrganizationId: selectedContext.organization.id,
    },
  }))
}
