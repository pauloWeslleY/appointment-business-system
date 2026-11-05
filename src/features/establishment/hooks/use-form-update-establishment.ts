import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { establishmentMutationOptions } from '../queries/establishment.mutation-options'
import { establishmentAdminSlugQueryOptions } from '../queries/establishment.query-options'
import { UpdateEstablishmentFormDataSchema } from '../schemas/establishment-form.schema'
import type { UpdateEstablishmentFormData } from '../types/establishment-form-data.type'
import {
  EstablishmentStatus,
  mapStatusEstablishment,
} from '../types/establishment-status.type'

const loadSelectStatusUpdateEstablishment = createListCollection({
  items: Object.values(EstablishmentStatus).map((status) => ({
    label: mapStatusEstablishment(status).label,
    value: status,
  })),
})

export function useFormUpdateEstablishment(establishmentSlug: string) {
  const {
    data: establishment,
    error: errorEstablishment,
    isLoading: isLoadingEstablishment,
  } = useQuery(establishmentAdminSlugQueryOptions(establishmentSlug))

  const formDefaultValues = useMemo<DefaultValues<UpdateEstablishmentFormData>>(
    () => ({
      websiteUrl: establishment?.websiteUrl ?? '',
      name: establishment?.name ?? '',
      email: establishment?.email ?? '',
      description: establishment?.description ?? '',
      timezone: establishment?.timezone ?? '',
      status: establishment?.status ? [establishment?.status] : [],
      phones:
        establishment?.phones?.map((phone) => ({
          phone: phone,
          type: phone.length === 10 ? 'telephone' : 'cellphone',
        })) ?? [],
    }),
    [establishment],
  )

  const formUpdateEstablishment = useForm<UpdateEstablishmentFormData>({
    resolver: zodResolver(UpdateEstablishmentFormDataSchema),
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    formUpdateEstablishment.reset(formDefaultValues)
  }, [
    formDefaultValues,
    formUpdateEstablishment,
    formUpdateEstablishment.reset,
  ])

  const { isDirty, dirtyFields } = formUpdateEstablishment.formState

  const {
    mutate: updateEstablishment,
    isPending: isPendingUpdateEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.update(),
    onSuccess: async (...args) => {
      await establishmentMutationOptions.update().onSuccess?.(...args)
      toaster.success({ title: 'Estabelecimento atualizado com sucesso' })
    },
    onError: (error) =>
      toaster.error({
        title: error.message || 'Erro ao atualizar estabelecimento',
      }),
  })

  const handleUpdateEstablishment = () => {
    if (!establishment) {
      toaster.error({ title: 'Estabelecimento indisponível' })
      return
    }

    const hasAddressChanges = isDirty && Object.keys(dirtyFields).length > 0
    if (!hasAddressChanges) {
      toaster.warning({ title: 'Você não alterou o formulário' })
      return
    }

    const changesUpdateEstablishment = formUpdateEstablishment.getValues(
      undefined,
      {
        dirtyFields: true,
      },
    )

    const { phones, status, websiteUrl, ...otherChanges } =
      changesUpdateEstablishment
    const statusValue = status?.[0] ?? null

    updateEstablishment({
      id: establishment.id,
      ...otherChanges,
      ...(websiteUrl === undefined ? {} : { websiteUrl: websiteUrl || null }),
      ...(statusValue ? { status: statusValue } : {}),
      ...(phones?.length ? { phones: phones.map((item) => item.phone) } : {}),
    })
  }

  return {
    errorEstablishment,
    isLoadingEstablishment,
    isPendingUpdateEstablishment,
    formUpdateEstablishment,
    handleUpdateEstablishment,
    loadSelectStatusUpdateEstablishment,
  }
}
