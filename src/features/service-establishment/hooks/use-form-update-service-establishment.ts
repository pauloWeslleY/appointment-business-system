import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'

export function useFormUpdateServiceEstablishment(
  serviceEstablishment: ServiceEstablishmentDetailsModel,
) {
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
    formState: { errors, isDirty },
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
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    updateServiceEstablishment(
      {
        ...data,
        establishmentId: serviceEstablishment.establishmentId,
        serviceEstablishmentId: serviceEstablishment.id,
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
    isUpdatingServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  }
}
