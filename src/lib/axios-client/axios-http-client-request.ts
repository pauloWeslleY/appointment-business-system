import { isAxiosError } from 'axios'

import { api } from '@/shared/config/api'
import type {
  HttpRequest,
  HttpRequestParams,
  HttpResponse,
  HttpStatusCodeType,
} from '@/shared/protocols'

export class AxiosHttpClient<T = unknown> implements HttpRequest<T> {
  async request(data: HttpRequestParams): Promise<HttpResponse<T>> {
    try {
      const response = await api.request<T>({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params,
        responseType: data.responseType || 'json',
        withCredentials: true,
      })

      return {
        kind: 'success',
        statusCode: response.status as HttpStatusCodeType,
        body: response.data,
      }
    } catch (error: unknown) {
      if (!isAxiosError<{ message: string }>(error)) {
        throw error
      }

      if (!error.response) {
        return {
          kind: 'no-response',
        }
      }

      return {
        kind: 'http-error',
        statusCode: error.response.status as HttpStatusCodeType,
        body: error.response.data,
      }
    }
  }
}
