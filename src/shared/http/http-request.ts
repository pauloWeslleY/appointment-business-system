import { type HttpMethodType, type HttpResponse } from './index'

export type HttpRequestParams = {
  url: string
  method: HttpMethodType
  body?: any
  headers?: any
  params?: any
  responseType?: any
}

export interface HttpRequest<R = any> {
  request(data: HttpRequestParams): Promise<HttpResponse<R>>
}
