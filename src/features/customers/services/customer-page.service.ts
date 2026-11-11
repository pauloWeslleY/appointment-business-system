import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  CustomerPageApiRequestSchema,
  CustomerPageApiResponseSchema,
} from '../schemas/customer-page-api.schema'
import type {
  CustomerPageApiRequest,
  CustomerPageApiResponse,
} from '../types/customer-page-api.type'

export async function getCustomerPageService(
  input: CustomerPageApiRequest,
  signal?: AbortSignal,
): Promise<CustomerPageApiResponse> {
  const { establishmentId, ...params } =
    CustomerPageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<CustomerPageApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/customers/establishment/${establishmentId}`,
    params,
    signal,
  })

  return CustomerPageApiResponseSchema.parse(validate.errors(response))
}
