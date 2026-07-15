import axios, { type AxiosError } from 'axios'

import { HttpMethod, type HttpResponse } from '@/shared/http'

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const getViaCep = async (cep: string) => {
  try {
    const response = await axios.request<ViaCepResponse>({
      method: HttpMethod.GET,
      url: `https://viacep.com.br/ws/${cep}/json/`,
    })
    return {
      statusCode: response.status as HttpResponse['statusCode'],
      body: response?.data,
    }
  } catch (error: unknown) {
    const _error = error as AxiosError<{ message: string }>

    return {
      statusCode: _error.response?.status as HttpResponse['statusCode'],
      body: _error.response?.data.message,
    }
  }
}
