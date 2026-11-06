import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { AccessDeniedError } from '../errors'
import {
  hasPermission,
  type RequiredPermission,
} from '../helpers/has-permission'

const ACCESS_DENIED_MESSAGE = 'Você não tem permissão para acessar esta página.'

/**
 * Executada no `beforeLoad` das rotas: interrompe a navegação antes dos loaders
 * e renderiza o AccessDenied pelo componente de erro da rota.
 * A autorização efetiva continua no backend; aqui apenas evitamos telas
 * e requisições que o membro não pode usar.
 */
export function validateRoutePermission(
  memberContext: Pick<GetMeContextResponse, 'permissions'>,
  required: RequiredPermission,
): void {
  const isAllowed = hasPermission(memberContext.permissions, required)

  if (!isAllowed) {
    throw new AccessDeniedError(ACCESS_DENIED_MESSAGE)
  }
}
