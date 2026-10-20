import type { IValidationErrors } from '@/shared/errors'
import type { HttpRequest } from '@/shared/protocols'

export interface ApiDependencies<T> {
  api: HttpRequest<T>
  validate: IValidationErrors<T>
}
