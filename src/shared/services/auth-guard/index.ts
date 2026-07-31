import { authClient } from '@/lib/auth'

interface AuthContext {
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
