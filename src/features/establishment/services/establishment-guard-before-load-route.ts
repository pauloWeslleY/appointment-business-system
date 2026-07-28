import { redirect } from '@tanstack/react-router'

import { toaster } from '@/components/ui/toaster'
import { getOwnerByUserIdService } from '@/features/owner/services/owner.service'
import { authClient } from '@/lib/auth'

export const establishmentGuardBeforeLoadRoute = async () => {
  const { data } = await authClient.getSession()
  if (!data) throw redirect({ to: '/login' })

  try {
    await getOwnerByUserIdService(data.user.id)
  } catch (err) {
    toaster.error({
      title: (err as Error).message || 'Erro ao buscar proprietário',
    })
    throw redirect({ to: '/owner/new' })
  }
}
