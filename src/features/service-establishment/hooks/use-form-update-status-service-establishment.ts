import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment.mutation-options'
import { StatusServiceEstablishmentSchema } from '../schemas/status-service-establishment.schema'
import type { UpdateStatusServiceEstablishmentFormData } from '../types/form-service-establishment.type'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useFormUpdateStatusServiceEstablishment(
  serviceEstablishment: ListServicesEstablishmentModel,
  onOpen: (open: boolean) => void,
) {
  const { organizationProfile } = dashboardSlugRoute.useLoaderData()
  const { data: session } = useAppSession()
  const formDefaultValues = useMemo<
    DefaultValues<UpdateStatusServiceEstablishmentFormData>
  >(
    () => ({
      id: serviceEstablishment.id,
      status: serviceEstablishment.status,
    }),
    [serviceEstablishment],
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateStatusServiceEstablishmentFormData>({
    resolver: zodResolver(StatusServiceEstablishmentSchema),
    defaultValues: formDefaultValues,
  })

  const mutationOptions = serviceEstablishmentMutationOptions.status()
  const {
    mutate: updateStatusServiceEstablishment,
    isPending: isPendingUpdateStatusServiceEstablishment,
  } = useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)
      toaster.success({ title: 'Status do serviço atualizado com sucesso' })
      onOpen(false)
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao atualizar o status do serviço',
        description: error.message,
      })
    },
  })

  useEffect(() => reset(formDefaultValues), [formDefaultValues, reset])

  const onSubmitUpdateServiceEstablishment = (
    data: UpdateStatusServiceEstablishmentFormData,
  ) => {
    if (isPendingUpdateStatusServiceEstablishment) {
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
      toaster.error({
        title: 'Nenhum dado foi alterado',
        description: 'Altere algum dado para atualizar o status do serviço',
      })

      return
    }

    updateStatusServiceEstablishment(data, {
      onSuccess: () => reset(data),
    })
  }

  return {
    errors,
    control,
    handleSubmit,
    isPendingUpdateStatusServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  }
}
