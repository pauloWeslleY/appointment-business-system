import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'
import { OpeningHoursFormDataSchema } from '../schemas/form-opening-hours.schema'
import type { CustomTimesOpeningHoursResponseApi } from '../types/customer-times-opening-hours.api.type'
import type { OpeningHoursFormData } from '../types/opening-hours-form.type'

const toOpeningHoursFormValues = (
  openingHours: CustomTimesOpeningHoursResponseApi,
): OpeningHoursFormData => ({
  day: openingHours.day,
  open: openingHours.open,
  close: openingHours.close,
})

export function useFormUpdateOpeningHours(
  openingHours: CustomTimesOpeningHoursResponseApi,
) {
  const formUpdateOpeningHours = useForm<OpeningHoursFormData>({
    resolver: zodResolver(OpeningHoursFormDataSchema),
    defaultValues: toOpeningHoursFormValues(openingHours),
  })
  const {
    mutate: updateOpeningHours,
    error: updateOpeningHoursError,
    isPending: isPendingUpdateOpeningHours,
  } = useMutation(openingHoursMutationOptions.update())
  const { isDirty } = formUpdateOpeningHours.formState

  const handleUpdateOpeningHours = (data: OpeningHoursFormData) => {
    if (isPendingUpdateOpeningHours) {
      return
    }

    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no horário.' })
      return
    }

    updateOpeningHours(
      {
        ...data,
        id: openingHours.id,
        establishmentId: openingHours.establishmentId,
      },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Horário de funcionamento atualizado com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao atualizar horário de funcionamento',
            description: error.message || 'Ocorreu um erro inesperado',
          })
        },
      },
    )
  }

  return {
    formUpdateOpeningHours,
    handleUpdateOpeningHours,
    updateOpeningHoursError,
    isPendingUpdateOpeningHours,
  }
}
