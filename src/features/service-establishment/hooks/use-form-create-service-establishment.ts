import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment.mutation-options'
import { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'
import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'
import { createServiceEstablishmentSlug } from '../utils/slug-service-establishment'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

export function useFormCreateServiceEstablishment() {
  const { establishment, organizationProfile } =
    dashboardSlugRoute.useLoaderData()
  const { data: session } = authClient.useSession()

  const mutationOptions = serviceEstablishmentMutationOptions.create()
  const {
    mutate: createServiceEstablishment,
    isPending: isCreatingServiceEstablishment,
  } = useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)
      toaster.success({ title: 'Serviço cadastrado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao cadastrar serviço',
        description: error.message,
      })
    },
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    ServiceEstablishmentFormInput,
    unknown,
    ServiceEstablishmentFormData
  >({
    resolver: zodResolver(ServiceEstablishmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      image: null,
      servicePriceInCents: 0,
      durationInMinutes: undefined,
    },
  })

  const onSubmitCreateServiceEstablishment = (
    data: ServiceEstablishmentFormData,
  ) => {
    if (isCreatingServiceEstablishment) {
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
    createServiceEstablishment(
      {
        ...data,
        establishmentId: establishment.id,
        servicePriceInCents: Math.round(data.servicePriceInCents * 100),
        slug: createServiceEstablishmentSlug(data.name),
      },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    control,
    errors,
    isCreatingServiceEstablishment,
    register,
    handleSubmit,
    onSubmitCreateServiceEstablishment,
  }
}
