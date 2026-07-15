import { AxiosHttpClient } from '../axios-client'
import { ValidationErrors } from '../errors'
import type { ApiDependencies } from '../types/api.dependencies'

export const httpDependencies = <T>(): ApiDependencies<T> => ({
  api: new AxiosHttpClient<T>(),
  validate: new ValidationErrors<T>(),
})
