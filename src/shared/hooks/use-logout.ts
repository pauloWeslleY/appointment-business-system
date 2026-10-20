import { useNavigate } from '@tanstack/react-router'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { mapErrorsLabel } from '../constants/map-errors-label'

export function useLogout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => navigate({ to: '/login' }),
        onError: ({ error }) => {
          toaster.error({
            title: mapErrorsLabel[error.code] || 'Erro ao realizar logout',
          })
        },
      },
    })
  }

  return {
    handleLogout,
  }
}
