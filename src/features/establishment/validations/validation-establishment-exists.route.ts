import { redirect } from '@tanstack/react-router'

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

export const validateEstablishmentExistsRoute = (
  memberContext: GetMeContextResponse,
) => {
  const canRead = memberContext.permissions.some(
    (permission) =>
      permission.resource === 'establishment' && permission.action === 'read',
  )

  if (!canRead) {
    throw new Response(
      'Você não tem permissão para consultar estabelecimentos',
      {
        status: 403,
      },
    )
  }

  const canCreate = memberContext.permissions.some(
    (permission) =>
      permission.resource === 'establishment' && permission.action === 'create',
  )

  const hasNoAvailableEstablishments = memberContext.establishments.length === 0

  if (hasNoAvailableEstablishments && canCreate) {
    throw redirect({ to: '/establishment/new', replace: true })
  }
}
