import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  CreateCustomerApiRequestSchema,
  CustomerIdApiRequestSchema,
  CustomersEstablishmentApiRequestSchema,
  UpdateCustomerApiRequestSchema,
} from '../schemas/customer-request.api.schema'
import {
  CustomerApiResponseSchema,
  CustomersApiResponseSchema,
} from '../schemas/customer-response.api.schema'
import { UpdateStatusCustomerApiRequestSchema } from '../schemas/update-status-customer.api.schema'
import type { CreateCustomerApiRequest } from '../types/create-customer.api.type'
import type {
  CustomerApiResponse,
  CustomersApiResponse,
  UpdateStatusCustomerApiRequest,
} from '../types/customer-response.api.type'
import type { UpdateCustomerApiRequest } from '../types/update-customer.api.type'

function parseCustomerResponse(value: unknown): CustomerApiResponse {
  const parsed = CustomerApiResponseSchema.safeParse(value)
  if (!parsed.success) {
    throw new BadRequestError(z.prettifyError(parsed.error))
  }

  return parsed.data
}

export async function createCustomerService(
  data: CreateCustomerApiRequest,
): Promise<CustomerApiResponse> {
  const body = CreateCustomerApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<CustomerApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/customer',
    body,
  })

  return parseCustomerResponse(validate.errors(response))
}

export async function updateCustomerService(
  data: UpdateCustomerApiRequest,
): Promise<CustomerApiResponse> {
  const body = UpdateCustomerApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<CustomerApiResponse>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/admin/customer',
    body,
  })

  return parseCustomerResponse(validate.errors(response))
}

export async function updateCustomerStatusService(
  data: UpdateStatusCustomerApiRequest,
): Promise<CustomerApiResponse> {
  const body = UpdateStatusCustomerApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<CustomerApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/admin/customer/status',
    body,
  })

  return parseCustomerResponse(validate.errors(response))
}

export async function getCustomerByIdService(
  customerId: string,
): Promise<CustomerApiResponse> {
  const id = CustomerIdApiRequestSchema.parse(customerId)
  const { api, validate } = httpDependencies<CustomerApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/customer/' + id,
  })

  return parseCustomerResponse(validate.errors(response))
}

export async function getCustomersService(
  establishmentId: string,
): Promise<CustomersApiResponse> {
  const id = CustomersEstablishmentApiRequestSchema.parse(establishmentId)
  const { api, validate } = httpDependencies<CustomersApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/customers/establishment/' + id,
  })

  const parsed = CustomersApiResponseSchema.safeParse(validate.errors(response))
  if (!parsed.success) {
    throw new BadRequestError(z.prettifyError(parsed.error))
  }

  return parsed.data
}
