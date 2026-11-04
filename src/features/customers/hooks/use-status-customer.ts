import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers.mutation-options'
import type { CustomerApiResponse } from '../types/customer-response.api.type'
export function useStatusCustomer(
  customer: CustomerApiResponse,
  onClose: () => void,
) {
  const { mutateAsync: updateStatus, isPending: isPendingStatusCustomer } =
    useMutation(customersMutationOptions.status())
  const handleStatusCustomer = async () => {
    if (isPendingStatusCustomer) {
      return
    }
    try {
      await updateStatus({ id: customer.id, status: !customer.status })
      toaster.success({ title: 'Status do cliente atualizado com sucesso' })
      onClose()
    } catch (error) {
      toaster.error({
        title: 'Erro ao atualizar status do cliente',
        description: error instanceof Error ? error.message : 'Tente novamente',
      })
    }
  }
  return { handleStatusCustomer, isPendingStatusCustomer }
}
