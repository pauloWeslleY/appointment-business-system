import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers.mutation-options'
import type { CustomerApiResponse } from '../types/customer-response.api.type'

export function useStatusCustomer(
  customer: CustomerApiResponse,
  onClose: () => void,
) {
  const { mutate: updateStatus, isPending: isPendingStatusCustomer } =
    useMutation({
      ...customersMutationOptions.status(),
      onSuccess: () => {
        toaster.success({ title: 'Status do cliente atualizado com sucesso' })
        onClose()
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao atualizar status do cliente',
          description: error.message || 'Tente novamente',
        })
      },
    })

  const handleStatusCustomer = () => {
    updateStatus({ id: customer.id, status: !customer.status })
  }

  return {
    handleStatusCustomer,
    isPendingStatusCustomer,
  }
}
