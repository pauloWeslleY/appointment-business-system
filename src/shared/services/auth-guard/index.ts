import { authClient } from '@/lib/auth'

export interface AuthContext {
  auth: {
    isAuthenticated: boolean
  }
}

export const authGuard = async (): Promise<AuthContext> => {
  const { data } = await authClient.getSession()

  return {
    auth: {
      isAuthenticated: !!data?.session.token,
    },
  }
}
