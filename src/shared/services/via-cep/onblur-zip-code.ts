import { toaster } from '@/components/ui/toaster'

import { getViaCep } from './via-cep'

export const onBlurZipCode = async (zipCode: string) => {
  if (zipCode.length === 0) {
    toaster.error({ title: 'CEP inválido' })
    return
  }

  try {
    const response = await getViaCep(zipCode)

    if (response.statusCode !== 200 || !response.body) {
      toaster.error({ title: 'CEP não encontrado' })
      return
    }

    if (typeof response.body === 'string') {
      toaster.error({ title: response.body })
      return
    }

    return response.body
  } catch (error) {
    toaster.error({
      title: 'Erro ao buscar endereço pelo CEP',
      description: (error as Error).message || 'Erro desconhecido',
    })
  }
}
