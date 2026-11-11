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
import type { UpdateEstablishmentRequest } from '../types/update-establishment-request.type'
import { getEstablishmentWebsitePath } from '../utils/establishment-website'

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
      websiteUrl: getEstablishmentWebsitePath(establishment?.websiteUrl),
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

  const {
    isDirty: isEstablishmentFormDirty,
    dirtyFields: changedEstablishmentFields,
  } = formUpdateEstablishment.formState

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

  const handleUpdateInputUrlAtSlugUpdateFormEstablishment = () => {
    if (!establishment || establishment.slug.trim() === '') {
      formUpdateEstablishment.setError('websiteUrl', {
        type: 'manual',
        message: 'Slug do estabelecimento indisponível',
      })
      return
    }
    formUpdateEstablishment.setValue('websiteUrl', establishment.slug, {
      shouldDirty: true,
    })
  }

  const handleUpdateEstablishment = (
    establishmentFormValues: UpdateEstablishmentFormData,
  ) => {
    if (!establishment) {
      toaster.error({ title: 'Estabelecimento indisponível' })
      return
    }

    const hasEstablishmentChanges =
      isEstablishmentFormDirty &&
      Object.keys(changedEstablishmentFields).length > 0

    if (!hasEstablishmentChanges) {
      toaster.warning({ title: 'Você não alterou o formulário' })
      return
    }

    const { name, email, description, timezone, status, websiteUrl, phones } =
      establishmentFormValues
    const selectedEstablishmentStatus = status[0]

    const establishmentChanges: UpdateEstablishmentRequest = {
      id: establishment.id,
      ...(changedEstablishmentFields.name ? { name } : {}),
      ...(changedEstablishmentFields.email ? { email } : {}),
      ...(changedEstablishmentFields.description ? { description } : {}),
      ...(changedEstablishmentFields.timezone ? { timezone } : {}),
      ...(changedEstablishmentFields.websiteUrl
        ? { websiteUrl: websiteUrl || null }
        : {}),
      ...(changedEstablishmentFields.status && selectedEstablishmentStatus
        ? { status: selectedEstablishmentStatus }
        : {}),
      ...(changedEstablishmentFields.phones
        ? { phones: phones.map(({ phone }) => phone) }
        : {}),
    }

    updateEstablishment(establishmentChanges)
  }

  return {
    errorEstablishment,
    isLoadingEstablishment,
    isPendingUpdateEstablishment,
    formUpdateEstablishment,
    loadSelectStatusUpdateEstablishment,
    handleUpdateEstablishment,
    handleUpdateInputUrlAtSlugUpdateFormEstablishment,
  }
}
