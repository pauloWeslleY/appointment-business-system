import { createListCollection, type ListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import {
  invitationEstablishmentsQueryOptions,
  invitationOrganizationProfileQueryOptions,
} from '@/features/invitations/queries/invitations.query-options'
import { authClient } from '@/lib/auth'

import { memberMutationOptions } from '../queries/member.mutation-options'
import { UpdateScopeMemberFormSchema } from '../schemas/update-scope-member.api.schema'
import {
  loadSelectMemberAccessScope,
  MemberAccessScope,
} from '../types/member-access-scope.type'
import type { UpdateScopeMemberFormType } from '../types/update-scope-member.type'

export function useFormUpadteScopeMember(memberId?: string) {
  const { data: session } = authClient.useSession()
  const userId = session?.user.id
  const organizationId = session?.session.activeOrganizationId ?? undefined
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateScopeMemberFormType>({
    resolver: zodResolver(UpdateScopeMemberFormSchema),
    defaultValues: {
      accessScope: [],
      establishmentIds: [],
    },
  })
  const selectedAccessScope = useWatch({ control, name: 'accessScope' })

  const { isPending: isPendingUpdateScopeMember, mutate: updateScopeMember } =
    useMutation(memberMutationOptions.updateScope())

  const { data: organizationProfile } = useQuery(
    invitationOrganizationProfileQueryOptions(userId, organizationId),
  )
  const {
    data: establishmentsByOrganizationProfile,
    isLoading: isLoadingEstablishmentsByOrganizationProfile,
  } = useQuery(
    invitationEstablishmentsQueryOptions(
      userId,
      organizationId,
      organizationProfile?.id,
    ),
  )

  const {
    listEstablishmentsByOrganizationProfile,
    loadSelectEstablishmentsFormSendInvite,
  } = useMemo<{
    listEstablishmentsByOrganizationProfile: { label: string; value: string }[]
    loadSelectEstablishmentsFormSendInvite: ListCollection<{
      label: string
      value: string
    }>
  }>(() => {
    const listEstablishmentsByOrganizationProfile = (
      establishmentsByOrganizationProfile ?? []
    ).map((establishment) => ({
      label: establishment.name,
      value: establishment.id,
    }))

    const loadSelectEstablishmentsFormSendInvite = createListCollection({
      items: listEstablishmentsByOrganizationProfile,
    })

    return {
      listEstablishmentsByOrganizationProfile,
      loadSelectEstablishmentsFormSendInvite,
    }
  }, [establishmentsByOrganizationProfile])

  const loadSelectAccessScopeFormSendInvite = createListCollection({
    items: loadSelectMemberAccessScope,
  })

  const isRestrictedScope =
    selectedAccessScope[0] === MemberAccessScope.RESTRICTED
  const establishmentErrors = errors.establishmentIds
  const establishmentErrorMessage =
    establishmentErrors?.message ??
    establishmentErrors?.root?.message ??
    errors.establishmentIds?.[0]?.message

  const onChangeSelectEstablishments = (values: string[]) => {
    return values.includes('all')
      ? listEstablishmentsByOrganizationProfile.map((item) => item.value)
      : values
  }

  const handleFormSubmitUpdateScopeMember = (
    data: UpdateScopeMemberFormType,
  ) => {
    if (!memberId) {
      toaster.error({
        title: 'Ops! Erro ao atualizar escopo do membro',
        description: 'ID do membro não fornecido',
      })
      return
    }

    updateScopeMember(
      { ...data, memberId },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Escopo do membro atualizado com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! Erro ao atualizar escopo do membro',
            description:
              error.message ?? 'não foi possível atualizar o escopo do membro',
          })
        },
      },
    )
  }

  return {
    loadSelectEstablishmentsFormSendInvite,
    loadSelectAccessScopeFormSendInvite,
    isLoadingEstablishmentsByOrganizationProfile,
    isRestrictedScope,
    isPendingUpdateScopeMember,
    establishmentErrorMessage,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateScopeMember,
    onChangeSelectEstablishments,
  }
}
