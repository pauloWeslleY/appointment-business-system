import { AxiosHttpClient } from '@/lib/axios-client'

import { ValidationErrors } from '../errors'
import type { ApiDependencies } from '../types/api.dependencies'

/**
 * Informe explicitamente o contrato de resposta da API no genérico T.
 * É proibido usar unknown ou any, inclusive para respostas validadas com Zod.
 * A tipagem não substitui a validação do corpo recebido pelo schema da API.
 */
export const httpDependencies = <T>(): ApiDependencies<T> => ({
  api: new AxiosHttpClient<T>(),
  validate: new ValidationErrors<T>(),
})
