import { redirect } from '@tanstack/react-router'

import type { UserInfoModel } from '@/features/users/types/user-info.model'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod, HttpStatusCode } from '@/shared/http'

import { validateEnsureAuthRoute } from './validate-auth-route'

const redirectToOwnerRegister = () =>
  redirect({ to: '/register', search: { step: 1 }, replace: true })

export const validateEnsureOwnerExists = async () => {
  const session = await validateEnsureAuthRoute()
  const { api } = httpDependencies<UserInfoModel>()

  const response = await api.request({
    method: HttpMethod.GET,
    url: `/user/owner/${session.user.id}`,
  })

  if (response.statusCode === HttpStatusCode.unauthorized) {
    throw redirect({ to: '/login', replace: true })
  }

  if (
    response.statusCode === HttpStatusCode.notFound ||
    !response.body?.ownerId
  ) {
    throw redirectToOwnerRegister()
  }

  return response.body
}
