import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { professionalFormDefaultValues } from '../constants/professional-form-default-values'
import { professionalsMutationOptions } from '../queries/professionals.mutation-options'
import { ProfessionalFormSchema } from '../schemas/professional-form.schema'
import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'

export function useFormCreateProfessional(
  establishmentId: string,
  onSaved: () => void,
) {
  const form = useForm<ProfessionalFormInput, unknown, ProfessionalFormData>({
    resolver: zodResolver(ProfessionalFormSchema),
    defaultValues: professionalFormDefaultValues,
  })

  const { mutate: createProfessional, isPending: isCreatingProfessional } =
    useMutation(professionalsMutationOptions.create())

  const handleCreateProfessional = form.handleSubmit(
    (professionalFormValues) => {
      createProfessional(
        { values: professionalFormValues, establishmentId },
        {
          onSuccess: () => {
            form.reset()
            toaster.success({ title: 'Profissional cadastrado com sucesso' })
            onSaved()
          },
          onError: (professionalCreationError) => {
            toaster.error({
              title: 'Erro ao cadastrar profissional',
              description:
                professionalCreationError.message || 'Tente novamente',
            })
          },
        },
      )
    },
  )

  return {
    form,
    handleCreateProfessional,
    isCreatingProfessional,
  }
}
