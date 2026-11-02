import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { memberMutationOptions } from '../queries/member.mutation-options'
import { UpdateStatusMemberFormSchema } from '../schemas/update-status-member.api.schema'
import type { UpdateStatusMemberFormType } from '../types/update-status-member.type'

export function useFormUpadteStatusMember(memberId?: string) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStatusMemberFormType>({
    resolver: zodResolver(UpdateStatusMemberFormSchema),
    defaultValues: {
      status: [],
    },
  })

  const { isPending: isPendingUpdateStatusMember, mutate: updateStatusMember } =
    useMutation(memberMutationOptions.updateStatus())

  const handleFormSubmitUpdateStatusMember = (
    data: UpdateStatusMemberFormType,
  ) => {
    if (!memberId) {
      toaster.error({
        title: 'Ops! Erro ao atualizar escopo do membro',
        description: 'ID do membro não fornecido',
      })
      return
    }

    updateStatusMember(
      { ...data, memberId },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Status do membro atualizado com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! Erro ao atualizar status do membro',
            description: error.message,
          })
        },
      },
    )
  }

  return {
    isPendingUpdateStatusMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateStatusMember,
  }
}
