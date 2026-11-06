import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment.mutation-options'
import { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'
import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'
import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'
import { createServiceEstablishmentSlug } from '../utils/slug-service-establishment'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useFormUpdateServiceEstablishment(
  serviceEstablishment: ServiceEstablishmentDetailsModel,
) {
  const router = useRouter()
  const { establishment, organizationProfile } =
    dashboardSlugRoute.useLoaderData()
  const { data: session } = useAppSession()
  const mutationOptions = serviceEstablishmentMutationOptions.update()
  const {
    mutate: updateServiceEstablishment,
    isPending: isUpdatingServiceEstablishment,
  } = useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)
      await router.invalidate()
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
      servicePriceInCents:
        (serviceEstablishment.servicePriceInCents ?? 0) / 100,
      durationInMinutes: serviceEstablishment.durationInMinutes ?? undefined,
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
  } = useForm<
    ServiceEstablishmentFormInput,
    unknown,
    ServiceEstablishmentFormData
  >({
    resolver: zodResolver(ServiceEstablishmentFormSchema),
    defaultValues: formDefaultValues,
  })

  useEffect(() => reset(formDefaultValues), [formDefaultValues, reset])

  const onSubmitUpdateServiceEstablishment = (
    data: ServiceEstablishmentFormData,
  ) => {
    if (isUpdatingServiceEstablishment) {
      return
    }

    if (
      session?.session.activeOrganizationId !==
      organizationProfile.organizationId
    ) {
      toaster.error({
        title: 'A organização foi alterada. Reabra o formulário.',
      })

      return
    }
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    updateServiceEstablishment(
      {
        ...data,
        establishmentId: establishment.id,
        serviceEstablishmentId: serviceEstablishment.id,
        imageUrl: serviceEstablishment.imageUrl,
        slug:
          serviceEstablishment.slug ??
          createServiceEstablishmentSlug(data.name),
        servicePriceInCents: Math.round(data.servicePriceInCents * 100),
      },
      {
        onSuccess: () => reset({ ...data, image: null }),
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
