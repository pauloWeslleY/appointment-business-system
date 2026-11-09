import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import type { AuthenticationSessionType } from '@/shared/types/auth-client.type'

export interface AuthenticatedContext {
  session: AuthenticationSessionType
  memberContext: GetMeContextResponse
}

export interface AppSessionState {
  data: AuthenticationSessionType | null | undefined
  isPending: boolean
  error: Error | null
  refetch: () => Promise<AuthenticationSessionType | null>
}
