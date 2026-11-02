import axios, { isAxiosError } from 'axios'

import type {
  HttpRequest,
  HttpRequestParams,
  HttpResponse,
  HttpStatusCodeType,
} from '@/shared/protocols'

export function httpClientAdapter<T = unknown>(): HttpRequest<T> {
  async function request(data: HttpRequestParams): Promise<HttpResponse<T>> {
    try {
      const response = await axios.request<T>({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params,
        responseType: data.responseType || 'json',
        signal: data.signal,
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

  return {
    request,
  }
}
