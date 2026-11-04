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
import { toProfessionalFormValues } from '../utils/professional-form-values'
export function useFormUpdateProfessional(
  details: ProfessionalDetailsApiResponse,
  onSaved: () => void,
) {
  const form = useForm<ProfessionalFormInput, unknown, ProfessionalFormData>({
    resolver: zodResolver(ProfessionalFormSchema),
    defaultValues: toProfessionalFormValues(details),
  })
  const { isDirty, dirtyFields } = form.formState
  const { mutateAsync: updateProfessional, isPending: isUpdatingProfessional } =
    useMutation(professionalsMutationOptions.update())
  const handleUpdateProfessional = form.handleSubmit(async (values) => {
    if (isUpdatingProfessional) {
      return
    }
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita' })
      return
    }
    const updateProfile = !!(
      dirtyFields.displayName ||
      dirtyFields.email ||
      dirtyFields.phone ||
      dirtyFields.document ||
      dirtyFields.bio ||
      dirtyFields.image
    )
    const updateEmployment = !!(
      dirtyFields.specialty ||
      dirtyFields.status ||
      dirtyFields.workSchedule
    )
    try {
      const updated = await updateProfessional({
        values,
        details,
        updateProfile,
        updateEmployment,
      })
      form.reset(toProfessionalFormValues(updated))
      toaster.success({ title: 'Profissional atualizado com sucesso' })
      onSaved()
    } catch (error) {
      toaster.error({
        title: 'Erro ao atualizar profissional',
        description: error instanceof Error ? error.message : 'Tente novamente',
      })
    }
  })
  return { form, handleUpdateProfessional, isUpdatingProfessional }
}
