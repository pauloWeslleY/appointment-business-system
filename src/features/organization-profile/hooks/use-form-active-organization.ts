import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { memberMutationOptions } from '@/features/members/queries/member.mutation-options'
import { authClient } from '@/lib/auth'

import {
  organizationProfileQueryKeys,
  organizationQueryKeys,
} from '../queries/organization-profile-query-key'
import { ActiveOrganizationSchema } from '../schemas/active-organization.schema'
import type { FormActiveOrganizationType } from '../types/active-organization.type'

export function useFormActiveOrganization() {
  const [isDialogOpenActiveOrganization, setIsDialogOpenActiveOrganization] =
    useQueryState(
      'is_open',
      parseAsBoolean.withDefault(false).withOptions({
        shallow: false,
      }),
    )

  const router = useRouter()
  const { data: userAuth } = useAppSession()
  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: organizationQueryKeys.select(),
    queryFn: async () => await authClient.organization.list(),
  })

  const {
    mutate: activeOrganization,
    isPending: isPendingUpdateActiveOrganization,
  } = useMutation(memberMutationOptions.create())

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormActiveOrganizationType>({
    resolver: zodResolver(ActiveOrganizationSchema),
    defaultValues: {
      organizationId: [userAuth?.session.activeOrganizationId ?? ''],
    },
  })

  const loadSelectOrganizations = useMemo(() => {
    return createListCollection({
      items: organizations?.data ?? [],
      itemToString: (organization) => organization.name,
      itemToValue: (organization) => organization.id,
    })
  }, [organizations])

  const handleActiveOrganizationProfile = handleSubmit(({ organizationId }) => {
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    activeOrganization(
      {
        organizationId: organizationId[0],
      },
      {
        onSuccess: async ({ organization }, _variables, _result, context) => {
          await router.invalidate()
          reset({ organizationId: [organization.id] })

          toaster.success({
            title: 'Perfil da organização ativado com sucesso',
            description: `O perfil da organização ${organization.name} foi ativado com sucesso.`,
          })

          await context.client.invalidateQueries({
            queryKey: organizationProfileQueryKeys.summary(),
          })
          setIsDialogOpenActiveOrganization(false)
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao ativar perfil da organização',
            description:
              error.message ?? 'Erro ao ativar perfil da organização',
          })

          setError('organizationId', {
            type: 'manual',
            message: error.message ?? 'Erro ao ativar perfil da organização',
          })
        },
      },
    )
  })

  return {
    errors,
    control,
    loadSelectOrganizations,
    isLoadingOrganizations,
    isPendingUpdateActiveOrganization,
    isDialogOpenActiveOrganization,
    setIsDialogOpenActiveOrganization,
    handleActiveOrganizationProfile,
  }
}
