import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { UserInfoModel } from '../types/user-info.model'

export const getUserInfoService = async (
  userId?: string,
): Promise<UserInfoModel> => {
  const { api, validate } = httpDependencies<UserInfoModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/user/owner/${userId}`,
  })

  return validate.errors(response)
}
