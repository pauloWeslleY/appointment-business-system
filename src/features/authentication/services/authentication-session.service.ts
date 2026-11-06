import { authClient } from '@/lib/auth'

import type { AuthenticationSession } from '../types/authentication-session.type'

export async function getAuthenticationSession(
  signal?: AbortSignal,
): Promise<AuthenticationSession | null> {
  const { data, error } = await authClient.getSession({
    fetchOptions: { signal },
  })

  if (error) {
    throw new Error(error.message || 'Não foi possível consultar a sessão.')
  }

  return data
}
