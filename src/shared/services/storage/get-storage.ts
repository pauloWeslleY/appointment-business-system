import { httpDependencies } from '@/shared/factory/http-dependencies'

export const getStorage = async (paramsUrl: string) => {
  const { api, validate } = httpDependencies<Blob>()
  const response = await api.request({
    method: 'GET',
    url: `/storage/${paramsUrl}`,
    responseType: 'blob',
  })

  const file = validate.errors(response)
  return URL.createObjectURL(file)
}
