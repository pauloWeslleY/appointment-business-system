import { type HttpStatusCodeType } from '.'

export interface HttpResponse<T = any> {
  statusCode?: HttpStatusCodeType
  body: T
}
