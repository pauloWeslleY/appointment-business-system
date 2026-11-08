import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'
import { OpeningHoursFormDataSchema } from '../schemas/form-opening-hours.schema'
import type { OpeningHoursFormData } from '../types/opening-hours-form.type'

export function useFormCreateOpeningHours(
  establishmentId?: string,
  onSaved?: () => void,
) {
  const [, setOpeningHoursCreate] = useQueryState(
    'opening_hours_create',
    parseAsBoolean.withDefault(false),
  )
  const formCreateOpeningHours = useForm<OpeningHoursFormData>({
    resolver: zodResolver(OpeningHoursFormDataSchema),
    defaultValues: { day: 0, open: '', close: '' },
  })

  const {
    mutate: createOpeningHours,
    error: createOpeningHoursError,
    isPending: isPendingCreateOpeningHours,
  } = useMutation(openingHoursMutationOptions.create())

  const handleCreateOpeningHours = (data: OpeningHoursFormData) => {
    if (!establishmentId) {
      toaster.error({
        title: 'Erro ao criar horário de funcionamento',
        description: 'ID do estabelecimento não fornecido',
      })

      return
    }

    createOpeningHours(
      { ...data, establishmentId },
      {
        onSuccess: () => {
          setOpeningHoursCreate(true)
          formCreateOpeningHours.reset()
          toaster.success({
            title: 'Horário de funcionamento criado com sucesso',
          })

          if (onSaved) {
            onSaved()
          }
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao criar horário de funcionamento',
            description: error.message || 'Ocorreu um erro inesperado',
          })
        },
      },
    )
  }

  return {
    formCreateOpeningHours,
    handleCreateOpeningHours,
    createOpeningHoursError,
    isPendingCreateOpeningHours,
  }
}
