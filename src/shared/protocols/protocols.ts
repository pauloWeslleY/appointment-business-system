import type { AxiosRequestConfig } from 'axios'

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

export type HttpMethodType = keyof typeof HttpMethod

export const HttpStatusCode = {
  ok: 200,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
} as const

export type HttpStatusCodeType =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode]

export type HttpResponse<T = unknown> =
  | {
      kind: 'success'
      statusCode: HttpStatusCodeType
      body: T
    }
  | {
      kind: 'http-error'
      statusCode: HttpStatusCodeType
      body: unknown
    }
  | {
      kind: 'no-response'
    }

export type HttpRequestParams = {
  url: string
  method: HttpMethodType
  body?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
  params?: AxiosRequestConfig['params']
  responseType?: AxiosRequestConfig['responseType']
}

export interface HttpRequest<R = unknown> {
  request(data: HttpRequestParams): Promise<HttpResponse<R>>
}
