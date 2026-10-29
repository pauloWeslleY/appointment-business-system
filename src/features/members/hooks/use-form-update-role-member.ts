import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { memberMutationOptions } from '../queries/member.mutation-options'
import { memberQueryKey } from '../queries/member.query-key'
import { getActiveMemberQueryOptions } from '../queries/member.query-options'
import { UpdateRoleMemberFormSchema } from '../schemas/update-role-member.api.schema'
import { mapLabelMemberRole, MEMBER_ROLES } from '../types/member-role.type'
import type { UpdateRoleMemberFormType } from '../types/update-role-member.type'

const authenticatedLayoutRoute = getRouteApi('/_authenticated')

export function useFormUpadteRoleMember(memberId?: string) {
  const { memberContext } = authenticatedLayoutRoute.useRouteContext()
  const { data: activeMember, isLoading: isLoadingActiveMember } = useQuery(
    getActiveMemberQueryOptions(memberContext?.organization.id, memberId),
  )
  const formDefaultValuesRoleMember = useMemo(
    () => ({ role: activeMember ? [activeMember.role] : [] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeMember, memberId],
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
    useMutation({
      ...memberMutationOptions.updateRole(),
      onSuccess: async (_data, _variables, _result, context) => {
        const { data } = await authClient.organization.getActiveMember({
          query: {
            organizationId: memberContext?.organization.id,
            memberId,
          },
        })

        await context.client.invalidateQueries({
          queryKey: memberQueryKey.members(data?.organizationId),
        })
      },
    })

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
    isLoadingActiveMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateRoleMember,
  }
}
