import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMatch, useRouter } from '@tanstack/react-router'

import type { AuthenticationSessionType } from '@/shared/types/auth-client.type'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'
import type { AppSessionState } from '../types/authentication-session.type'

export function useAppSession(): AppSessionState {
  const context = useMatch({ from: '/_app', shouldThrow: false })?.context
  const queryClient = useQueryClient()
  const router = useRouter()
  const query = useQuery({
    ...authenticationSessionQueryOptions(),
    enabled: !context,
  })

  const refetch = async (): Promise<AuthenticationSessionType | null> => {
    const data = await queryClient.query({
      ...authenticationSessionQueryOptions(),
      staleTime: 0,
    })
    await router.invalidate()
    return data
  }

  const isPending = !context && query.isPending
  const data = context?.session ?? query.data
  const error = query.error

  return {
    data,
    isPending,
    error,
    refetch,
  }
}
