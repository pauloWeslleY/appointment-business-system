import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { AccessDeniedError } from '../errors'
import {
  hasPermission,
  type RequiredPermission,
} from '../helpers/has-permission'

export function validateRoutePermission(
  memberContext: Pick<GetMeContextResponse, 'permissions'>,
  required: RequiredPermission,
): void {
  const isAllowed = hasPermission(memberContext.permissions, required)

  if (!isAllowed) {
    throw new AccessDeniedError(
      'Você não tem permissão para acessar esta página.',
    )
  }
}
