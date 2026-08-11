import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useParams } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment-mutation-options'
import { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'
import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'
import type { ServiceEstablishmentModel } from '../types/service-establishment.model'
import { useGetServiceEstablishmentById } from './use-get-service-establishment-by-id'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')
export function useFormUpdateServiceEstablishment() {
  const establishment = dashboardSlugRoute.useLoaderData()
  const { serviceEstablishmentId } = useParams({
    from: '/dashboard/$slug/services/_pages/$serviceEstablishmentId/edit/',
  })

  const { data: serviceEstablishment } = useGetServiceEstablishmentById(
    serviceEstablishmentId,
  )

  const {
    mutate: updateServiceEstablishment,
    isPending: isUpdatingServiceEstablishment,
  } = useMutation<
    ServiceEstablishmentModel,
    Error,
    ServiceEstablishmentFormData & {
      establishmentId: string
      serviceEstablishmentId: string
    }
  >({
    ...serviceEstablishmentMutationOptions.update(),
    onSuccess: () => {
      toaster.success({ title: 'Serviço atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao atualizar serviço',
        description: error.message,
      })
    },
  })

  const formDefaultValues = useMemo<
    DefaultValues<ServiceEstablishmentFormInput>
  >(
    () => ({
      name: serviceEstablishment?.name ?? '',
      description: serviceEstablishment?.description ?? '',
      servicePriceInCents: serviceEstablishment?.servicePriceInCents ?? 0,
      image: null,
    }),
    [serviceEstablishment],
  )

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEstablishmentFormInput, any, ServiceEstablishmentFormData>(
    {
      resolver: zodResolver(ServiceEstablishmentFormSchema),
      defaultValues: formDefaultValues,
    },
  )

  useEffect(() => reset(formDefaultValues), [formDefaultValues, reset])

  const onSubmitUpdateServiceEstablishment = (
    data: ServiceEstablishmentFormData,
  ) => {
    updateServiceEstablishment(
      {
        ...data,
        establishmentId: establishment.id,
        serviceEstablishmentId,
        servicePriceInCents: data.servicePriceInCents * 100,
      },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    errors,
    control,
    register,
    handleSubmit,
    serviceEstablishment,
    isUpdatingServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  }
}
