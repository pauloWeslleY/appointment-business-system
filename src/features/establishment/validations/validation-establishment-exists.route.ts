import { redirect } from '@tanstack/react-router'

import { validateEnsureOrganizationExists } from '@/features/authentication/validations/validate-organization-exists'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod, HttpStatusCode } from '@/shared/protocols'

import type { EstablishmentModel } from '../types/establishment.model'

export const validationEstablishmentExistsRouteHome = async () => {
  const { organization } = await validateEnsureOrganizationExists()
  const { api } = httpDependencies<EstablishmentModel[]>()

  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/owner/${organization.id}`,
  })

  if (response.statusCode === HttpStatusCode.unauthorized) {
    throw redirect({ to: '/login', replace: true })
  }

  if (response.statusCode === HttpStatusCode.notFound) {
    throw redirect({ to: '/establishment/new', replace: true })
  }

  if (!response.body || response.body.length === 0) {
    throw redirect({
      to: '/error',
      search: { search: response.statusCode?.toString() },
      replace: true,
    })
  }
}
