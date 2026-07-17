import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { CreateOwnerRequest } from '../types/create-owner-request.type'
import type { OwnerModel } from '../types/owner.model'
import type { UpdateOwnerRequest } from '../types/update-owner-request.type'

export const getOwnerByUserIdService = async (userId?: string) => {
  const { api, validate } = httpDependencies<OwnerModel>()
  const data = await api.request({
    method: HttpMethod.GET,
    url: `/owner/establishment/user/${userId}`,
  })

  return validate.errors(data)
}

export const getOwnerEstablishmentsByIdService = async (ownerId: string) => {
  const { api, validate } = httpDependencies<OwnerModel>()
  const data = await api.request({
    method: HttpMethod.GET,
    url: `/owner/establishment/${ownerId}`,
  })

  return validate.errors(data)
}

export const createOwnerService = async (data: CreateOwnerRequest) => {
  const { api, validate } = httpDependencies<OwnerModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: `/owner/establishment`,
    body: data,
  })

  return validate.errors(response)
}

export const updateOwnerService = async (data: UpdateOwnerRequest) => {
  const { api, validate } = httpDependencies<OwnerModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: `/owner/establishment`,
    body: data,
  })

  return validate.errors(response)
}
