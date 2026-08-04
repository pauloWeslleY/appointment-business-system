import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { CreateCustomerRequest } from '../types/create-customer-request.type'
import type { CustomerModel } from '../types/customer.model'
import type { UpdateCustomerRequest } from '../types/update-customer-request.type'

export const createCustomerService = async (
  customer: CreateCustomerRequest,
) => {
  const { api, validate } = httpDependencies<CustomerModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/customer',
    body: customer,
  })
  return validate.errors(response)
}

export const updateCustomerService = async (
  customer: UpdateCustomerRequest,
) => {
  const { api, validate } = httpDependencies<CustomerModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/customer',
    body: customer,
  })
  return validate.errors(response)
}

export const statusCustomerService = async (customer: {
  id: string
  active: boolean
}) => {
  const { api, validate } = httpDependencies<CustomerModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/customer/status',
    body: {
      id: customer.id,
      active: customer.active,
    },
  })
  return validate.errors(response)
}

export const getCustomerByIdService = async (customerId: string) => {
  const { api, validate } = httpDependencies<CustomerModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/customer/${customerId}`,
  })
  return validate.errors(response)
}

export const getCustomersService = async (establishmentId?: string) => {
  const { api, validate } = httpDependencies<CustomerModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/customers/establishment/${establishmentId}`,
  })
  return validate.errors(response)
}
