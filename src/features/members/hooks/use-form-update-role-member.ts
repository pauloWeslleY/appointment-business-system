import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { memberMutationOptions } from '../queries/member.mutation-options'
import { UpdateRoleMemberFormSchema } from '../schemas/update-role-member.api.schema'
import { mapLabelMemberRole, MEMBER_ROLES } from '../types/member-role.type'
import type { UpdateRoleMemberFormType } from '../types/update-role-member.type'

export function useFormUpadteRoleMember(memberId?: string) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRoleMemberFormType>({
    resolver: zodResolver(UpdateRoleMemberFormSchema),
    defaultValues: {
      role: [],
    },
  })
  const { isPending: isPendingUpdateRoleMember, mutate: updateRoleMember } =
    useMutation(memberMutationOptions.updateRole())

  const loadSelectRoleUpdateMember = createListCollection({
    items: MEMBER_ROLES.map((role) => ({
      label: mapLabelMemberRole(role).label,
      value: role,
    })),
  })

  const handleFormSubmitUpdateRoleMember = (data: UpdateRoleMemberFormType) => {
    if (!memberId) {
      toaster.error({
        title: 'Ops! Erro ao atualizar função do membro',
        description: 'ID do membro não fornecido',
      })
      return
    }
    updateRoleMember(
      { ...data, memberId },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Função do membro atualizada com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! Erro ao atualizar função do membro',
            description:
              error.message ?? 'não foi possível atualizar a função do membro',
          })
        },
      },
    )
  }

  return {
    loadSelectRoleUpdateMember,
    isPendingUpdateRoleMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateRoleMember,
  }
}
