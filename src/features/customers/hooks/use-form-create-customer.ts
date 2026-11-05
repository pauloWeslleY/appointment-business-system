import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers.mutation-options'
import { CustomerFormSchema } from '../schemas/customer-form.schema'
import type { CustomerFormData } from '../types/customer-form-data.type'
import { toCustomerRequestValues } from '../utils/customer-form-values'

const dashboardRoute = getRouteApi('/dashboard/$slug')

export function useFormCreateCustomer() {
  const { establishment } = dashboardRoute.useLoaderData()
  const formCreateCustomer = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phones: [{ phone: '' }],
      notes: '',
      birthDate: '',
      gender: [],
    },
  })

  const { mutateAsync: createCustomer, isPending: isPendingCreateCustomer } =
    useMutation(customersMutationOptions.create())
  const onSubmitCreateCustomer = formCreateCustomer.handleSubmit(
    async (data) => {
      if (isPendingCreateCustomer) {
        return
      }

      try {
        await createCustomer({
          ...toCustomerRequestValues(data),
          establishmentId: establishment.id,
          userId: null,
        })

        formCreateCustomer.reset()
        toaster.success({ title: 'Cliente cadastrado com sucesso' })
      } catch (error) {
        toaster.error({
          title: 'Erro ao cadastrar cliente',
          description:
            error instanceof Error ? error.message : 'Tente novamente',
        })
      }
    },
  )

  return { formCreateCustomer, onSubmitCreateCustomer, isPendingCreateCustomer }
}
