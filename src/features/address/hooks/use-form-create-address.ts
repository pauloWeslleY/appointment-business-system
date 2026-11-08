import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { addressMutationOptions } from '../queries/address.mutation-options'
import { AddressFormDataSchema } from '../schemas/form-address.schema'
import type { AddressFormData } from '../types/address-form.type'

export function useFormCreateAddress(
  establishmentId?: string,
  onSaved?: () => void,
) {
  const [, setAddressCreate] = useQueryState(
    'address_create',
    parseAsBoolean.withDefault(false),
  )
  const formCreateAddress = useForm<AddressFormData>({
    resolver: zodResolver(AddressFormDataSchema),
    defaultValues: {
      countryCode: 'BR',
      postalCode: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      latitude: null,
      longitude: null,
    },
  })

  const {
    mutate: createAddress,
    error: createAddressError,
    isPending: isPendingCreateAddress,
  } = useMutation(addressMutationOptions.create())

  const handleCreateAddress = (data: AddressFormData) => {
    if (!establishmentId) {
      toaster.error({
        title: 'Erro ao criar endereço',
        description: 'ID do estabelecimento não fornecido',
      })

      return
    }

    createAddress(
      { ...data, establishmentId },
      {
        onSuccess: () => {
          setAddressCreate(true)
          formCreateAddress.reset()
          toaster.success({ title: 'Endereço criado com sucesso' })
          if (onSaved) {
            onSaved()
          }
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao criar endereço',
            description: error.message || 'Ocorreu um erro inesperado',
          })
        },
      },
    )
  }

  return {
    formCreateAddress,
    handleCreateAddress,
    createAddressError,
    isPendingCreateAddress,
  }
}
