import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers-mutation-key'
import { customersQueryKeys } from '../queries/customers-query-key'
import { CustomerSchema } from '../schemas/customer.schema'
import type { CustomerModel } from '../types/customer.model'
import type { CustomerFormData } from '../types/customer-form-data.type'

export function useFormCreateCustomer() {
  const queryClient = useQueryClient()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/customers/',
  })

  const formCreateCustomer = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phones: [{ phone: '' }],
      notes: '',
      birthDate: '',
      gender: undefined,
    },
  })

  const { mutate: createCustomer, isPending: isPendingCreateCustomer } =
    useMutation({
      ...customersMutationOptions.create(),
      onSuccess: (newCustomer, variables) => {
        queryClient.setQueryData<CustomerModel[]>(
          customersQueryKeys.establishment(variables.establishmentId),
          (oldData) => {
            const newCustomerData: CustomerModel = {
              id: newCustomer.id,
              name: newCustomer.name,
              email: newCustomer.email,
              phones: newCustomer.phones,
              notes: newCustomer.notes,
              birthDate: newCustomer.birthDate,
              gender: newCustomer.gender,
              active: newCustomer.active,
              userId: newCustomer.userId,
              createdAt: newCustomer.createdAt,
              updatedAt: newCustomer.updatedAt,
            }

            return oldData ? [...oldData, newCustomerData] : [newCustomerData]
          },
        )

        toaster.success({ title: 'Cliente cadastrado com sucesso' })
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao cadastrar cliente',
          description: error.message,
        })
      },
    })

  const onSubmitCreateCustomer = formCreateCustomer.handleSubmit((data) => {
    if (!establishmentId) {
      toaster.error({
        title: 'Erro ao cadastrar cliente',
        description: 'ID do estabelecimento não encontrado',
      })
      return
    }

    createCustomer(
      {
        ...data,
        userId: null,
        notes: data.notes || null,
        gender: data.gender ? data.gender[0] : null,
        birthDate: data.birthDate || null,
        phones: data.phones.map((phone) => phone.phone),
        establishmentId,
      },
      {
        onSuccess: () => formCreateCustomer.reset(),
      },
    )
  })

  return {
    formCreateCustomer,
    onSubmitCreateCustomer,
    isPendingCreateCustomer,
  }
}
