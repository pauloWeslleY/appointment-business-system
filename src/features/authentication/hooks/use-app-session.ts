import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMatch, useRouter } from '@tanstack/react-router'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'
import type {
  AppSessionState,
  AuthenticationSession,
} from '../types/authentication-session.type'

export function useAppSession(): AppSessionState {
  const context = useMatch({ from: '/_app', shouldThrow: false })?.context
  const queryClient = useQueryClient()
  const router = useRouter()
  const query = useQuery({
    ...authenticationSessionQueryOptions(),
    enabled: !context,
  })

  const refetch = async (): Promise<AuthenticationSession | null> => {
    const data = await queryClient.query({
      ...authenticationSessionQueryOptions(),
      staleTime: 0,
    })
    await router.invalidate()
    return data
  }

  return {
    data: context?.session ?? query.data,
    isPending: !context && query.isPending,
    error: query.error,
    refetch,
  }
}
