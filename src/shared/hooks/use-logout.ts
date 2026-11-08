import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { mapErrorsLabel } from '../constants/map-errors-label'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await queryClient.cancelQueries()
          queryClient.clear()
          navigate({ to: '/login' })
        },
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
