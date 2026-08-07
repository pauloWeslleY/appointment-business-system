import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment-mutation-options'
import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'
import { StatusServiceEstablishmentSchema } from '../schemas/status-service-establishment.schema'
import type { UpdateStatusServiceEstablishmentFormData } from '../types/form-service-establishment.type'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model copy'
import type { ServiceEstablishmentModel } from '../types/service-establishment.model'

export function useFormUpdateStatusServiceEstablishment(
  serviceEstablishment: ListServicesEstablishmentModel,
  onOpen: (open: boolean) => void,
) {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/',
  })
  const queryClient = useQueryClient()

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

  const {
    mutate: updateStatusServiceEstablishment,
    isPending: isPendingUpdateStatusServiceEstablishment,
  } = useMutation({
    ...serviceEstablishmentMutationOptions.status(),
    onSuccess: (serviceEstablishmentUpdated) => {
      queryClient.setQueryData(
        serviceEstablishmentQueryKeys.getById(serviceEstablishment.id),
        () => serviceEstablishmentUpdated,
      )

      queryClient.setQueryData<ServiceEstablishmentModel[]>(
        serviceEstablishmentQueryKeys.detail(establishmentId),
        (oldData) =>
          oldData
            ? oldData.map((item) =>
                item.id === serviceEstablishmentUpdated.id
                  ? serviceEstablishmentUpdated
                  : item,
              )
            : [],
      )

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
