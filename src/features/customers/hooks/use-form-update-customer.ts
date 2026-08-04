import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { customersMutationOptions } from '../queries/customers-mutation-key'
import { customersQueryKeys } from '../queries/customers-query-key'
import { CustomerSchema } from '../schemas/customer.schema'
import type { CustomerModel } from '../types/customer.model'
import type { CustomerFormData } from '../types/customer-form-data.type'

export function useFormUpdateCustomer(customer: CustomerModel) {
  const queryClient = useQueryClient()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/customers/',
  })

  const formUpdateCustomerDefaultValues = useMemo<
    DefaultValues<CustomerFormData>
  >(
    () => ({
      name: customer.name ?? '',
      email: customer.email ?? '',
      phones: customer.phones.map((phone) => ({ phone })) ?? [],
      notes: customer.notes ?? '',
      birthDate: dayjs(customer.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      gender: [customer.gender] as CustomerFormData['gender'],
    }),
    [customer],
  )

  const formUpdateCustomer = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: formUpdateCustomerDefaultValues,
  })

  const { mutate: updateCustomer, isPending: isPendingUpdateCustomer } =
    useMutation({
      ...customersMutationOptions.update(),
      onSuccess: (updateCustomer) => {
        queryClient.setQueryData<CustomerModel[]>(
          customersQueryKeys.establishment(establishmentId),
          (oldData) => {
            if (!oldData) {
              return [updateCustomer]
            }

            return oldData.map((customer) =>
              customer.id === updateCustomer.id
                ? { ...updateCustomer }
                : customer,
            )
          },
        )

        toaster.success({ title: 'Cliente atualizado com sucesso' })
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao atualizar cliente',
          description: error.message,
        })
      },
    })

  const onSubmitUpdateCustomer = formUpdateCustomer.handleSubmit((data) => {
    if (!establishmentId) {
      toaster.error({
        title: 'Erro ao cadastrar cliente',
        description: 'ID do estabelecimento não encontrado',
      })
      return
    }

    updateCustomer(
      {
        ...data,
        id: customer.id,
        userId: null,
        notes: data.notes || null,
        gender: data.gender ? data.gender[0] : null,
        birthDate: data.birthDate || null,
        phones: data.phones.map((phone) => phone.phone),
      },
      {
        onSuccess: () => formUpdateCustomer.reset(data),
      },
    )
  })

  return {
    formUpdateCustomer,
    onSubmitUpdateCustomer,
    isPendingUpdateCustomer,
  }
}
