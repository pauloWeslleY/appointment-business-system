import type { GetAddressByIdApiRequest } from '../types/get-address.api.type'

export interface AddressQueryScope {
  userId: string
  organizationId: string
}

export const addressQueryKeys = {
  all: ['address'] as const,

  scope: (scope: AddressQueryScope) =>
    [...addressQueryKeys.all, scope.userId, scope.organizationId] as const,

  establishment: (scope: AddressQueryScope, establishmentId?: string) =>
    [
      ...addressQueryKeys.scope(scope),
      'establishment',
      establishmentId ?? null,
    ] as const,

  detail: (scope: AddressQueryScope, params?: GetAddressByIdApiRequest) =>
    [
      ...addressQueryKeys.establishment(scope, params?.establishmentId),
      'detail',
      params?.addressId ?? null,
    ] as const,
} as const
