import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
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

  const validateBirthDate = useCallback(
    (value: string) => {
      const regexBirthDate =
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

      if (regexBirthDate.test(value)) {
        const [day, month, year] = value.split('/')
        return `${year}-${month}-${day}`
      }

      return dayjs(customer.birthDate).format('YYYY-MM-DD')
    },
    [customer.birthDate],
  )

  const formUpdateCustomerDefaultValues = useMemo<
    DefaultValues<CustomerFormData>
  >(
    () => ({
      name: customer.name ?? '',
      email: customer.email ?? '',
      phones: customer.phones.map((phone) => ({ phone })) ?? [],
      notes: customer.notes ?? '',
      birthDate: validateBirthDate(customer.birthDate),
      gender: [customer.gender] as CustomerFormData['gender'],
    }),
    [
      customer.birthDate,
      customer.email,
      customer.gender,
      customer.name,
      customer.notes,
      customer.phones,
      validateBirthDate,
    ],
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
