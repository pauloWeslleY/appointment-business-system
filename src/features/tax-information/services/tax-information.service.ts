import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  CreateTaxInformationApiRequestSchema,
  CreateTaxInformationApiResponseSchema,
} from '../schemas/create-tax-information-api.schema'
import { QueryParamsListTaxInformationApiSchema } from '../schemas/query-params-list-tax-information.api.schema'
import {
  LegalEntityListApiResponseSchema,
  LegalEntityListItemApiResponseSchema,
} from '../schemas/tax-information-api.schema'
import { TaxInformationDocumentApiResponseSchema } from '../schemas/tax-information-details.api.schema'
import {
  UpdateTaxInformationApiRequestSchema,
  UpdateTaxInformationApiResponseSchema,
} from '../schemas/update-tax-information-api.schema'
import type {
  CreateTaxInformationApiRequestType,
  CreateTaxInformationApiResponseType,
} from '../types/create-tax-information-api.type'
import type {
  LegalEntityListApiResponseType,
  LegalEntityListItemApiResponseType,
  QueryParamsListTaxInformationApiType,
  TaxInformationDocumentApiResponseType,
} from '../types/tax-information-api-response.type'
import type {
  UpdateTaxInformationApiRequestType,
  UpdateTaxInformationApiResponseType,
} from '../types/update-tax-information-api.type'

export const createTaxInformationService = async (
  data: CreateTaxInformationApiRequestType,
): Promise<CreateTaxInformationApiResponseType> => {
  const { api, validate } =
    httpDependencies<CreateTaxInformationApiResponseType>()
  const response = await api.request({
    url: '/admin/legal-entities',
    method: HttpMethod.POST,
    body: CreateTaxInformationApiRequestSchema.parse(data),
  })

  const validatedResponse = CreateTaxInformationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const updateTaxInformationService = async (
  data: UpdateTaxInformationApiRequestType,
): Promise<UpdateTaxInformationApiResponseType> => {
  const { api, validate } =
    httpDependencies<UpdateTaxInformationApiResponseType>()
  const response = await api.request({
    url: `/admin/legal-entities/${data.legalEntityId}`,
    method: HttpMethod.PATCH,
    body: UpdateTaxInformationApiRequestSchema.omit({
      legalEntityId: true,
    }).parse({
      tradeName: data.tradeName,
      legalName: data.legalName,
      status: data.status,
    }),
  })

  const validatedResponse = UpdateTaxInformationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getLegalEntityListService = async (
  queryString: QueryParamsListTaxInformationApiType,
): Promise<LegalEntityListApiResponseType> => {
  const { api, validate } = httpDependencies<LegalEntityListApiResponseType>()
  const response = await api.request({
    url: '/admin/legal-entities',
    method: HttpMethod.GET,
    params: QueryParamsListTaxInformationApiSchema.parse(queryString),
  })

  const validatedResponse = LegalEntityListApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getLegalEntityItemService = async (
  id: string,
): Promise<{
  legalEntity: LegalEntityListItemApiResponseType
}> => {
  const legalEntityId = z.string().trim().min(1, 'ID obrigatório').parse(id)
  const { api, validate } = httpDependencies<{
    legalEntity: LegalEntityListItemApiResponseType
  }>()
  const response = await api.request({
    url: `/admin/legal-entities/${legalEntityId}`,
    method: HttpMethod.GET,
  })

  const validatedResponse = z
    .object({ legalEntity: LegalEntityListItemApiResponseSchema })
    .safeParse(validate.errors(response))

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getLegalEntityDocumentService = async (
  id: string,
): Promise<TaxInformationDocumentApiResponseType> => {
  const legalEntityId = z.string().trim().min(1, 'ID obrigatório').parse(id)
  const { api, validate } =
    httpDependencies<TaxInformationDocumentApiResponseType>()
  const response = await api.request({
    url: `/admin/legal-entities/${legalEntityId}/document`,
    method: HttpMethod.GET,
  })

  const validatedResponse = TaxInformationDocumentApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}
