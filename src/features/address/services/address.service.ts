import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  GetAddressByEstablishmentApiResponseSchema,
  GetAddressByIdApiResponseSchema,
} from '../schemas/address-response.api.schema'
import {
  CreateAddressApiRequestSchema,
  CreateAddressApiResponseSchema,
} from '../schemas/create-address.api.schema'
import { DeleteAddressApiRequestSchema } from '../schemas/delete-address.api.schema'
import {
  GetAddressByEstablishmentApiRequestSchema,
  GetAddressByIdApiRequestSchema,
} from '../schemas/get-address.api.schema'
import {
  UpdateAddressApiRequestSchema,
  UpdateAddressApiResponseSchema,
} from '../schemas/update-address.api.schema'
import type {
  GetAddressByEstablishmentApiResponse,
  GetAddressByIdApiResponse,
} from '../types/address-response.api.type'
import type {
  CreateAddressApiRequest,
  CreateAddressApiResponse,
} from '../types/create-address.api.type'
import type { DeleteAddressApiRequest } from '../types/delete-address.api.type'
import type {
  GetAddressByEstablishmentApiRequest,
  GetAddressByIdApiRequest,
} from '../types/get-address.api.type'
import type {
  UpdateAddressApiRequest,
  UpdateAddressApiResponse,
} from '../types/update-address.api.type'

export const getAddressByIdService = async (
  data: GetAddressByIdApiRequest,
): Promise<GetAddressByIdApiResponse> => {
  const params = GetAddressByIdApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<GetAddressByIdApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/addresses/${params.addressId}`,
    params: { establishmentId: params.establishmentId },
  })
  const validatedResponse = GetAddressByIdApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getAddressByEstablishmentService = async (
  data: GetAddressByEstablishmentApiRequest,
): Promise<GetAddressByEstablishmentApiResponse> => {
  const params = GetAddressByEstablishmentApiRequestSchema.parse(data)
  const { api, validate } =
    httpDependencies<GetAddressByEstablishmentApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/addresses/establishment/${params.establishmentId}`,
  })
  const validatedResponse =
    GetAddressByEstablishmentApiResponseSchema.safeParse(
      validate.errors(response),
    )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const createAddressService = async (
  data: CreateAddressApiRequest,
): Promise<CreateAddressApiResponse> => {
  const { api, validate } = httpDependencies<CreateAddressApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/addresses',
    body: CreateAddressApiRequestSchema.parse(data),
  })
  const validatedResponse = CreateAddressApiResponseSchema.safeParse(
    validate.errors(response),
  )
  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }
  return validatedResponse.data
}

export const updateAddressService = async (
  data: UpdateAddressApiRequest,
): Promise<UpdateAddressApiResponse> => {
  const params = UpdateAddressApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<UpdateAddressApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/addresses/${params.addressId}`,
    params: { establishmentId: params.establishmentId },
    body: params.address,
  })
  const validatedResponse = UpdateAddressApiResponseSchema.safeParse(
    validate.errors(response),
  )
  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }
  return validatedResponse.data
}

export const deleteAddressService = async (
  data: DeleteAddressApiRequest,
): Promise<void> => {
  const { api, validate } = httpDependencies<void>()
  const params = DeleteAddressApiRequestSchema.parse(data)
  const response = await api.request({
    method: HttpMethod.DELETE,
    url: `/admin/addresses/${params.addressId}`,
    params: {
      establishmentId: params.establishmentId,
    },
  })
  return validate.errors(response)
}
