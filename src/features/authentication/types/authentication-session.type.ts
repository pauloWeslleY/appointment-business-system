import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import type { authClient } from '@/lib/auth'

export type AuthenticationSession = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>['data']
>

export interface AuthenticatedContext {
  session: AuthenticationSession
  memberContext: GetMeContextResponse
}

export interface AppSessionState {
  data: AuthenticationSession | null | undefined
  isPending: boolean
  error: Error | null
  refetch: () => Promise<AuthenticationSession | null>
}
