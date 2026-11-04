import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getAddressByEstablishmentService,
  getAddressByIdService,
} from '../services/address.service'
import type {
  GetAddressByEstablishmentApiRequest,
  GetAddressByIdApiRequest,
} from '../types/get-address.api.type'
import { addressQueryKeys, type AddressQueryScope } from './address.query-key'

export function getAddressByIdQueryOptions(
  scope: AddressQueryScope,
  params?: GetAddressByIdApiRequest,
) {
  const hasRequiredParams =
    scope.userId.trim() !== '' &&
    scope.organizationId.trim() !== '' &&
    params !== undefined &&
    params.addressId.trim() !== '' &&
    params.establishmentId.trim() !== ''

  return queryOptions({
    queryKey: addressQueryKeys.detail(scope, params),
    queryFn: hasRequiredParams
      ? () => getAddressByIdService(params)
      : skipToken,
  })
}

export function getAddressByEstablishmentQueryOptions(
  scope: AddressQueryScope,
  params?: GetAddressByEstablishmentApiRequest,
) {
  const hasRequiredParams =
    scope.userId.trim() !== '' &&
    scope.organizationId.trim() !== '' &&
    params !== undefined &&
    params.establishmentId.trim() !== ''

  return queryOptions({
    queryKey: addressQueryKeys.establishment(scope, params?.establishmentId),
    queryFn: hasRequiredParams
      ? () => getAddressByEstablishmentService(params)
      : skipToken,
  })
}
