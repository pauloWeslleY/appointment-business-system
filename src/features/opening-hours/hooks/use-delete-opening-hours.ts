import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'

export function useDeleteOpeningHours(
  establishmentId: string,
  onDeleted: () => void,
) {
  const { mutate: deleteOpeningHours, isPending: isPendingDeleteOpeningHours } =
    useMutation(openingHoursMutationOptions.delete())

  const handleDeleteOpeningHours = (openingHoursId?: string) => {
    if (!openingHoursId || isPendingDeleteOpeningHours) {
      return
    }

    deleteOpeningHours(
      { id: openingHoursId, establishmentId },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Horário de funcionamento excluído com sucesso',
          })

          onDeleted()
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao excluir horário de funcionamento',
            description: error.message || 'Ocorreu um erro inesperado',
          })
        },
      },
    )
  }

  return {
    handleDeleteOpeningHours,
    isPendingDeleteOpeningHours,
  }
}
