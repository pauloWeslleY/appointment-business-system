import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { memberMutationOptions } from '../queries/member.mutation-options'
import { getActiveMemberQueryOptions } from '../queries/member.query-options'
import { UpdateRoleMemberFormSchema } from '../schemas/update-role-member.api.schema'
import { mapLabelMemberRole, MEMBER_ROLES } from '../types/member-role.type'
import type { UpdateRoleMemberFormType } from '../types/update-role-member.type'

const authenticatedLayoutRoute = getRouteApi('/_app/_authenticated')

const loadSelectRoleUpdateMember = createListCollection({
  items: MEMBER_ROLES.map((role) => ({
    label: mapLabelMemberRole(role).label,
    value: role,
  })),
})

export function useFormUpadteRoleMember(memberId?: string) {
  const query = new URLSearchParams(window.location.search)
  const { memberContext } = authenticatedLayoutRoute.useRouteContext()
  const { data: activeMember, isLoading: isLoadingActiveMember } = useQuery({
    ...getActiveMemberQueryOptions(memberContext?.organization.id, memberId),
    enabled: !!query.get('is_open'),
  })

  const formDefaultValuesRoleMember = useMemo(
    () => ({ role: activeMember ? [activeMember.role] : [] }),
    [activeMember],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRoleMemberFormType>({
    resolver: zodResolver(UpdateRoleMemberFormSchema),
    defaultValues: formDefaultValuesRoleMember,
  })

  const { isPending: isPendingUpdateRoleMember, mutate: updateRoleMember } =
    useMutation(memberMutationOptions.updateRole())

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
    isLoadingActiveMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateRoleMember,
  }
}
