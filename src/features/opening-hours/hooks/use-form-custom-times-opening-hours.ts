import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'
import { createCustomTimesOpeningHoursSchema } from '../schemas/custom-times-opening-hours.schema'
import type {
  CustomTimesOpeningHoursFormData,
  CustomTimesOpeningHoursResponseApi,
} from '../types/customer-times-opening-hours.api.type'

const toCustomTimesOpeningHoursFormValues = (
  openingHours: Pick<CustomTimesOpeningHoursResponseApi, 'customTimes'>,
): CustomTimesOpeningHoursFormData => ({
  customTimes:
    openingHours.customTimes.length > 0
      ? openingHours.customTimes.map((time) => ({ time }))
      : [
          {
            time: '',
          },
        ],
})

export function useFormCustomTimesOpeningHours(
  openingHours: CustomTimesOpeningHoursResponseApi,
) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<CustomTimesOpeningHoursFormData>({
    resolver: zodResolver(
      createCustomTimesOpeningHoursSchema(
        openingHours.open,
        openingHours.close,
      ),
    ),
    defaultValues: toCustomTimesOpeningHoursFormValues(openingHours),
  })
  const {
    mutate: customTimesOpeningHours,
    error: customTimesOpeningHoursError,
    isPending: isPendingCustomTimesOpeningHours,
  } = useMutation(openingHoursMutationOptions.customTimes())

  const handleCustomTimesOpeningHours = (
    data: CustomTimesOpeningHoursFormData,
  ) => {
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita no horário.' })
      return
    }

    customTimesOpeningHours(
      {
        openingHoursId: openingHours.id,
        establishmentId: openingHours.establishmentId,
        customTimes: data.customTimes.map(({ time }) => time),
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
    errors,
    control,
    handleSubmit,
    handleCustomTimesOpeningHours,
    customTimesOpeningHoursError,
    isPendingCustomTimesOpeningHours,
  }
}
