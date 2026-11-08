import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { AUTHENTICATION_CACHE_POLICY } from '../constants/authentication-cache'
import { authenticationQueryKey } from './authentication.query-key'

export const authenticationSessionQueryOptions = () =>
  queryOptions({
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
