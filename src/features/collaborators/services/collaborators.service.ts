import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { CollaboratorModel } from '../types/collaborator.model'
import type { CreateCollaboratorRequest } from '../types/create-collaborator.request'
import type { UpdateCollaboratorRequest } from '../types/update-collaborator.request'

export const createCollaboratorService = async (
  data: CreateCollaboratorRequest,
) => {
  const { api, validate } = httpDependencies<CollaboratorModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/collaborator',
    body: data,
  })

  return validate.errors(response)
}

export const updateCollaboratorService = async (
  data: UpdateCollaboratorRequest,
) => {
  const { api, validate } = httpDependencies<CollaboratorModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/collaborator',
    body: data,
  })

  return validate.errors(response)
}

export const inviteCollaboratorService = async (data: { token: string }) => {
  const { api, validate } = httpDependencies<CollaboratorModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/collaborator/invite/accept',
    body: {
      token: data.token,
    },
  })

  return validate.errors(response)
}

export const deleteCollaboratorService = async (collaboratorId?: string) => {
  const { api, validate } = httpDependencies<CollaboratorModel>()
  const response = await api.request({
    method: HttpMethod.DELETE,
    url: `/collaborator/${collaboratorId}`,
  })

  return validate.errors(response)
}

export const getCollaboratorByIdService = async (collaboratorId?: string) => {
  const { api, validate } = httpDependencies<CollaboratorModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/collaborator/${collaboratorId}`,
  })

  return validate.errors(response)
}

export const getCollaboratorsInactiveService = async () => {
  const { api, validate } = httpDependencies<CollaboratorModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/collaborator/inactive',
  })

  return validate.errors(response)
}

export const getCollaboratorByEstablishmentService = async (
  collaboratorId?: string,
) => {
  const { api, validate } = httpDependencies<CollaboratorModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/collaborator/establishment/${collaboratorId}`,
  })

  return validate.errors(response)
}
