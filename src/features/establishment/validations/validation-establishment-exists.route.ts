import { redirect } from '@tanstack/react-router'

import { validateEnsureOwnerExists } from '@/features/authentication/validations/validate-owner-exists'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod, HttpStatusCode } from '@/shared/http'

import type { EstablishmentModel } from '../types/establishment.model'

export const validationEstablishmentExistsRouteHome = async () => {
  const owner = await validateEnsureOwnerExists()
  const { api } = httpDependencies<EstablishmentModel[]>()

  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishment/owner/establishments/${owner.ownerId}`,
  })

  if (response.statusCode === HttpStatusCode.unauthorized) {
    throw redirect({ to: '/login', replace: true })
  }

  if (
    response.statusCode === HttpStatusCode.notFound ||
    !response.body?.length
  ) {
    throw redirect({ to: '/establishment/new', replace: true })
  }
}
