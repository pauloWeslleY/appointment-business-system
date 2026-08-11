import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRouteApi, useParams } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { onBlurZipCode } from '@/shared/services/via-cep/onblur-zip-code'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { establishmentSlugQueryOptions } from '../queries/establishment-query-options'
import { EstablishmentFormSchema } from '../schemas/establishment.schema'
import type { EstablishmentModel } from '../types/establishment.model'
import type { EstablishmentFormData } from '../types/establishment-form-data.type'

const authenticatedRoute = getRouteApi('/_authenticated')

export function useFormUpdateEstablishment() {
  const { establishmentSlug } = useParams({
    from: '/_authenticated/establishment/_routes/$establishmentSlug/',
  })
  const context = authenticatedRoute.useRouteContext()
  const queryClient = useQueryClient()
  const {
    data: establishment,
    isLoading: isLoadingEstablishment,
    error: errorEstablishment,
  } = useQuery(establishmentSlugQueryOptions(establishmentSlug))

  const {
    mutate: updateEstablishment,
    isPending: isPendingUpdateEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.update(),
    onSuccess: (establishment, variables) => {
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.owner(variables.ownerId),
      })

      queryClient.setQueryData<EstablishmentModel>(
        establishmentQueryKeys.detail(establishment.id),
        () => establishment,
      )

      toaster.success({ title: 'Estabelecimento atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao atualizar estabelecimento',
      })
    },
  })

  const formDefaultValues = useMemo<
    DefaultValues<EstablishmentFormData>
  >(() => {
    const openingHours = establishment?.openingHours ?? []
    const phones = establishment?.phones.map((phone) => ({ phone }))
    const weekdays = openingHours.map((item) => item.day.toString())
    const intervals = openingHours.map<{ open: string; close: string }>(
      (item) => ({
        open: item.intervals[0]?.open ?? '',
        close: item.intervals[0]?.close ?? '',
      }),
    )

    return {
      name: establishment?.name ?? '',
      description: establishment?.description ?? '',
      imageUrl: establishment?.imageUrl ?? '',
      weekdays: weekdays ?? ['0'],
      intervals: intervals ?? [{ open: '', close: '' }],
      phones: phones ?? [{ phone: '' }],
      address: {
        street: establishment?.address?.street ?? '',
        number: establishment?.address?.number ?? '',
        neighborhood: establishment?.address?.neighborhood ?? '',
        city: establishment?.address?.city ?? '',
        state: establishment?.address?.state ?? '',
        zipCode: establishment?.address?.zipCode ?? '',
        complement: establishment?.address?.complement ?? '',
      },
    }
  }, [establishment])

  const {
    control,
    reset,
    register,
    getValues,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(EstablishmentFormSchema),
    defaultValues: formDefaultValues,
  })

  useEffect(() => reset(formDefaultValues), [formDefaultValues, reset])

  const handleCloseAlertUpdatePhone = () => clearErrors('phones')
  const handleCloseAlertUpdateIntervals = () => clearErrors('intervals')

  const onBlurZipCodeUpdateEstablishment = async (zipCode: string) => {
    const response = await onBlurZipCode(zipCode)
    if (!response) return

    const addressFields = Object.entries({
      zipCode: response.cep,
      complement: response.complemento,
      street: response.logradouro,
      neighborhood: response.bairro,
      city: response.localidade,
      state: response.uf,
      number: getValues().address.number || '',
    })

    for (const [key, value] of addressFields) {
      setValue(`address.${key}` as keyof EstablishmentFormData, value)
    }
  }

  const handleUpdateEstablishment = (params: EstablishmentFormData) => {
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita' })
      return
    }

    if (!context.ownerId || !establishment) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    if (!params.intervals.some(Boolean)) {
      toaster.error({
        title: 'Todos os horários devem estar preenchidos',
        description:
          'Preencha todos os horários de abertura e fechamento para cada dia selecionado',
      })
      return
    }

    const weekDaysIntervals = (index: number) => [params.intervals[index]]

    updateEstablishment(
      {
        id: establishment.id,
        ownerId: context.ownerId,
        name: params.name,
        description: params.description,
        phones: params.phones.map((item) => item.phone),
        openingHours: params.weekdays.map((day, index) => ({
          day: parseInt(day, 10),
          intervals: weekDaysIntervals(index),
        })),
        address: params.address,
      },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    control,
    getValues,
    register,
    handleSubmit,
    errors,
    isPendingUpdateEstablishment,
    isLoadingEstablishment,
    errorEstablishment,
    handleUpdateEstablishment,
    handleCloseAlertUpdatePhone,
    handleCloseAlertUpdateIntervals,
    onBlurZipCodeUpdateEstablishment,
  }
}
