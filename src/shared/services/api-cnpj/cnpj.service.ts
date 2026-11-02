import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { type CompanyLookupResponse } from '@/shared/types/cpnj-api.response.type'

export const getCnpjInformation = async (
  cnpj: string,
): Promise<CompanyLookupResponse> => {
  const { validate, api } = httpDependencies<CompanyLookupResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/tax-information/${cnpj}`,
  })

  return validate.errors(response)
}
