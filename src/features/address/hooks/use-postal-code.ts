import type { UseFormReturn } from 'react-hook-form'

import { onBlurZipCode } from '@/shared/services/via-cep/onblur-zip-code'

import type { AddressFormData } from '../types/address-form.type'

export function usePostalCode(form: UseFormReturn<AddressFormData>) {
  const onBlurPostalCode = async (postalCode: string) => {
    try {
      const response = await onBlurZipCode(postalCode)

      if (!response) {
        return
      }

      const inputAddressValues = Object.entries({
        state: response.uf,
        city: response.localidade,
        neighborhood: response.bairro,
        street: response.logradouro,
        complement: response.complemento,
      })

      for (const [key, value] of inputAddressValues) {
        form.setValue(key as keyof AddressFormData, value)
      }
    } catch (error: unknown) {
      const _error = error as Error
      form.setError('postalCode', {
        type: 'manual',
        message: _error.message || 'Ops! Ocorreu um erro',
      })
    }
  }

  return {
    onBlurPostalCode,
  }
}
