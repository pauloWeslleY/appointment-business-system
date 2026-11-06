import { redirect } from '@tanstack/react-router'

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { hasPermission } from '@/shared/helpers/has-permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const validateEstablishmentExistsRoute = (
  memberContext: GetMeContextResponse,
) => {
  validateRoutePermission(memberContext, {
    resource: RESOURCES.ESTABLISHMENT,
    action: PERMISSION_ACTIONS.READ,
  })

  const canCreate = hasPermission(memberContext.permissions, {
    resource: RESOURCES.ESTABLISHMENT,
    action: PERMISSION_ACTIONS.CREATE,
  })

  const hasNoAvailableEstablishments = memberContext.establishments.length === 0

  if (hasNoAvailableEstablishments && canCreate) {
    throw redirect({ to: '/establishment/new', replace: true })
  }
}
