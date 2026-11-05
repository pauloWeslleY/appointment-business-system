import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'
import { OpeningHoursFormDataSchema } from '../schemas/form-opening-hours.schema'
import type { OpeningHoursFormData } from '../types/opening-hours-form.type'
import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'

const toOpeningHoursFormValues = (
  openingHours: EstablishmentOpeningHoursItemApiResponse,
): OpeningHoursFormData => ({
  day: openingHours.day,
  open: openingHours.intervals[0]?.open ?? '',
  close: openingHours.intervals[0]?.close ?? '',
})

export function useFormUpdateOpeningHours(
  openingHours: EstablishmentOpeningHoursItemApiResponse,
  establishmentId: string,
  onSaved?: () => void,
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
      { ...data, id: openingHours.id, establishmentId },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Horário de funcionamento atualizado com sucesso',
          })

          if (onSaved) {
            onSaved()
          }
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
