import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { MemberAccessScope } from '@/features/members/types/member-access-scope.type'
import { loadSelectMemberAccessScope } from '@/features/members/types/member-access-scope.type'
import { MemberRoles } from '@/features/members/types/member-role.type'
import {
  mapLabelMemberRole,
  MEMBER_ROLES,
} from '@/features/members/types/member-role.type'
import { authClient } from '@/lib/auth'

import { invitationsMutationOptions } from '../queries/invitations.mutation-options'
import {
  invitationEstablishmentsQueryOptions,
  invitationOrganizationProfileQueryOptions,
} from '../queries/invitations.query-options'
import { SendInvitationsSchema } from '../schemas/send-invitation.schema'
import { sendInvitationService } from '../services/invitations.service'
import type { SendInvitationApiRequest } from '../types/send-invitation.api.type'

export function useFormSendInvite() {
  const { data: session } = authClient.useSession()

  const userId = session?.user.id
  const organizationId = session?.session.activeOrganizationId ?? undefined
  const [isOpenDialogSendInvite, setIsOpenDialogSendInvite] = useQueryState(
    'is_open',
    parseAsBoolean.withDefault(false),
  )
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SendInvitationApiRequest>({
    resolver: zodResolver(SendInvitationsSchema),
    defaultValues: {
      email: '',
      resend: false,
      role: MemberRoles.MEMBER,
      accessScope: MemberAccessScope.ALL_ESTABLISHMENTS,
      establishmentIds: [],
    },
  })
  const { isPending: isPendingSendInvite, mutate: sendInvite } = useMutation({
    ...invitationsMutationOptions.send(),
    mutationFn: async (data: SendInvitationApiRequest) => {
      const { data: currentSession, error } = await authClient.getSession({
        query: { disableCookieCache: true },
      })
      if (
        error ||
        currentSession?.user.id !== userId ||
        currentSession?.session.activeOrganizationId !== organizationId
      ) {
        throw new Error(
          'A organização ativa mudou. Atualize a página antes de enviar o convite.',
        )
      }
      return sendInvitationService(data)
    },
  })
  const {
    data: organizationProfile,
    error: errorOrganizationProfile,
    isLoading: isLoadingOrganizationProfile,
  } = useQuery(
    invitationOrganizationProfileQueryOptions(userId, organizationId),
  )

  const {
    data: establishmentsByOrganizationProfile,
    isLoading: isLoadingEstablishmentsByOrganizationProfile,
    error: establishmentsError,
  } = useQuery(
    invitationEstablishmentsQueryOptions(
      userId,
      organizationId,
      organizationProfile?.id,
    ),
  )

  const establishmentItems =
    establishmentsByOrganizationProfile?.map((establishment) => ({
      label: establishment.name,
      value: establishment.id,
    })) ?? []

  const selectedAccessScope = useWatch({ control, name: 'accessScope' })
  const isRestrictedScope = selectedAccessScope === MemberAccessScope.RESTRICTED
  const establishmentErrors = errors.establishmentIds
  const establishmentErrorMessage =
    establishmentErrors?.message ??
    establishmentErrors?.root?.message ??
    errors.establishmentIds?.[0]?.message

  const loadSelectEstablishmentsFormSendInvite = createListCollection({
    items: [
      ...establishmentItems,
      {
        label: 'Selecionar todos',
        value: 'all',
      },
    ],
  })

  const loadSelectRoleFormSendInvite = createListCollection({
    items: MEMBER_ROLES.map((role) => ({
      label: mapLabelMemberRole(role).label,
      value: role,
    })),
  })

  const loadSelectAccessScopeFormSendInvite = createListCollection({
    items: loadSelectMemberAccessScope,
  })

  const handleDialogSendInvite = (isOpen: boolean) => {
    setIsOpenDialogSendInvite(isOpen)
  }

  const handleSendInvite = handleSubmit((data) => {
    if (isPendingSendInvite || !organizationId) {
      return
    }
    sendInvite(
      {
        ...data,
        establishmentIds:
          data.accessScope === MemberAccessScope.ALL_ESTABLISHMENTS
            ? []
            : data.establishmentIds,
      },
      {
        onSuccess: async () => {
          const { data: currentSession } = await authClient.getSession()
          if (currentSession?.session.activeOrganizationId !== organizationId) {
            return
          }
          reset()
          handleDialogSendInvite(false)
          toaster.success({
            title: 'Convite enviado com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao enviar convite',
            description: error.message || 'não foi possível enviar o convite',
          })
        },
      },
    )
  })

  const organizationProfileError =
    errorOrganizationProfile ?? establishmentsError

  const changeEstablishments = (values: string[]) => {
    return values.includes('all')
      ? establishmentItems.map((item) => item.value)
      : values
  }

  return {
    organizationProfileError,
    isLoadingOrganizationProfile,
    isRestrictedScope,
    changeEstablishments,
    handleDialogSendInvite,
    handleSendInvite,
    register,
    errors,
    establishmentErrorMessage,
    control,
    loadSelectRoleFormSendInvite,
    loadSelectAccessScopeFormSendInvite,
    loadSelectEstablishmentsFormSendInvite,
    isPendingSendInvite,
    isOpenDialogSendInvite,
    isLoadingEstablishmentsByOrganizationProfile,
  }
}
