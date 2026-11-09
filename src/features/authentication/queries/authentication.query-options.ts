import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { AUTHENTICATION_CACHE_POLICY } from '../constants/authentication-cache'
import { getAuthenticatedContextService } from '../services/authenticated-context.service'
import {
  authenticatedContextQueryKey,
  authenticationQueryKey,
} from './authentication.query-key'

export const authenticationSessionQueryOptions = () => {
  return queryOptions({
    queryKey: authenticationQueryKey.session(),
    queryFn: async ({ signal }) => {
      const { data, error } = await authClient.getSession({
        fetchOptions: { signal },
      })

      if (error) {
        throw new Error(error.message || 'Não foi possível consultar a sessão.')
      }

      return data
    },
    ...AUTHENTICATION_CACHE_POLICY,
    retry: false,
  })
}

export const authenticatedContextQueryOptions = (
  userId: string,
  organizationId?: string | null,
) => {
  return queryOptions({
    queryKey: authenticatedContextQueryKey(userId, organizationId),

    queryFn: ({ signal }) =>
      getAuthenticatedContextService(
        {
          userId,
          organizationId: organizationId ?? null,
        },
        signal,
      ),

    staleTime: Infinity,
    gcTime: 30 * 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  })
}
