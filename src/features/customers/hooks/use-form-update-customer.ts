import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers.mutation-options'
import { CustomerFormSchema } from '../schemas/customer-form.schema'
import type { CustomerFormData } from '../types/customer-form-data.type'
import type { CustomerApiResponse } from '../types/customer-response.api.type'
import {
  toCustomerFormValues,
  toCustomerRequestValues,
} from '../utils/customer-form-values'

export function useFormUpdateCustomer(customer: CustomerApiResponse) {
  const formUpdateCustomer = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: toCustomerFormValues(customer),
  })

  const { mutateAsync: updateCustomer, isPending: isPendingUpdateCustomer } =
    useMutation(customersMutationOptions.update())
  const onSubmitUpdateCustomer = formUpdateCustomer.handleSubmit(
    async (data) => {
      if (isPendingUpdateCustomer) {
        return
      }

      if (!formUpdateCustomer.formState.isDirty) {
        toaster.warning({ title: 'Nenhuma alteração foi feita' })
        return
      }

      try {
        const updatedCustomer = await updateCustomer({
          ...toCustomerRequestValues(data),
          gender: formUpdateCustomer.formState.dirtyFields.gender
            ? (data.gender?.[0] ?? null)
            : customer.gender,
          id: customer.id,
          userId: customer.userId,
        })

        formUpdateCustomer.reset(toCustomerFormValues(updatedCustomer))
        toaster.success({ title: 'Cliente atualizado com sucesso' })
      } catch (error) {
        toaster.error({
          title: 'Erro ao atualizar cliente',
          description:
            error instanceof Error ? error.message : 'Tente novamente',
        })
      }
    },
  )

  return { formUpdateCustomer, onSubmitUpdateCustomer, isPendingUpdateCustomer }
}
