import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { professionalsMutationOptions } from '../queries/professionals.mutation-options'
import { ProfessionalFormSchema } from '../schemas/professional-form.schema'
import type { ProfessionalDetailsApiResponse } from '../types/professional-api.type'
import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'
import {
  getProfessionalFormChanges,
  toProfessionalFormValues,
} from '../utils/professional-form-values'

export function useFormUpdateProfessional(
  professionalDetails: ProfessionalDetailsApiResponse,
  onSaved: () => void,
) {
  const form = useForm<ProfessionalFormInput, unknown, ProfessionalFormData>({
    resolver: zodResolver(ProfessionalFormSchema),
    defaultValues: toProfessionalFormValues(professionalDetails),
  })
  const {
    isDirty: hasProfessionalFormChanges,
    dirtyFields: changedProfessionalFields,
  } = form.formState
  const { mutate: updateProfessional, isPending: isUpdatingProfessional } =
    useMutation(professionalsMutationOptions.update())

  const handleUpdateProfessional = form.handleSubmit(
    (professionalFormValues) => {
      if (!hasProfessionalFormChanges) {
        toaster.warning({ title: 'Nenhuma alteração foi feita' })
        return
      }

      const professionalUpdateOptions = getProfessionalFormChanges(
        changedProfessionalFields,
      )

      updateProfessional(
        {
          values: professionalFormValues,
          details: professionalDetails,
          ...professionalUpdateOptions,
        },
        {
          onSuccess: (updatedProfessionalDetails) => {
            form.reset(toProfessionalFormValues(updatedProfessionalDetails))
            toaster.success({ title: 'Profissional atualizado com sucesso' })
            onSaved()
          },
          onError: (professionalUpdateError) => {
            toaster.error({
              title: 'Erro ao atualizar profissional',
              description: professionalUpdateError.message || 'Tente novamente',
            })
          },
        },
      )
    },
  )

  return {
    form,
    handleUpdateProfessional,
    isUpdatingProfessional,
  }
}
