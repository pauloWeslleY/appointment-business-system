import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { addressMutationOptions } from '../queries/address.mutation-options'
import { AddressFormDataSchema } from '../schemas/form-address.schema'
import type { AddressFormData } from '../types/address-form.type'
import type { GetAddressByIdApiResponse } from '../types/address-response.api.type'
import { toAddressFormValues } from '../utils/address-form-values'

export function useFormUpdateAddress(address: GetAddressByIdApiResponse) {
  const formUpdateAddress = useForm<AddressFormData>({
    resolver: zodResolver(AddressFormDataSchema),
    defaultValues: toAddressFormValues(address),
  })
  const {
    mutate: updateAddress,
    isPending: isPendingUpdateAddress,
    error: updateAddressError,
  } = useMutation(addressMutationOptions.update())
  const { isDirty, dirtyFields } = formUpdateAddress.formState

  const handleUpdateAddress = () => {
    const hasAddressChanges = isDirty && Object.keys(dirtyFields).length > 0
    if (!hasAddressChanges) {
      toaster.warning({ title: 'Você não alterou o formulário' })
      return
    }

    const changes = formUpdateAddress.getValues(undefined, {
      dirtyFields: true,
    })

    updateAddress(
      {
        addressId: address.id,
        establishmentId: address.establishmentId,
        address: changes,
      },
      {
        onSuccess: (result) => {
          formUpdateAddress.reset(toAddressFormValues(result.address))
          toaster.success({ title: 'Endereço atualizado com sucesso' })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! ocorreu um erro',
            description: error.message || 'Não foi possível atualizar endereço',
          })
        },
      },
    )
  }

  return {
    formUpdateAddress,
    updateAddressError,
    isPendingUpdateAddress,
    handleUpdateAddress,
  }
}
