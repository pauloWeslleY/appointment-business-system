import { type AxiosError } from 'axios'

import { api } from '../config/api'
import {
  type HttpRequest,
  type HttpRequestParams,
  type HttpResponse,
} from '../http'

export class AxiosHttpClient<T> implements HttpRequest<T> {
  async request(data: HttpRequestParams): Promise<HttpResponse> {
    try {
      const response = await api.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params,
        responseType: data.responseType || 'json',
        withCredentials: true,
      })
      return {
        statusCode: response.status as HttpResponse['statusCode'],
        body: response?.data,
      }
    } catch (error: unknown) {
      const _error = error as AxiosError<{ message: string }>
      return {
        statusCode: _error.response?.status as HttpResponse['statusCode'],
        body: _error.response?.data,
      }
    }
  }
}
