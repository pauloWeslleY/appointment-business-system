import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
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
  const router = useRouter()
  const { data: userAuth } = useAppSession()
  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: organizationQueryKeys.select(),
    queryFn: async () => await authClient.organization.list(),
  })

  const {
    isPending: isPendingUpdateActiveOrganization,
    mutate: activeOrganization,
  } = useMutation(memberMutationOptions.create())
  const queryClient = useQueryClient()

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

  const handleUpdateOrganizationProfile = async ({
    organizationId,
  }: FormActiveOrganizationType) => {
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    activeOrganization(
      { organizationId: organizationId[0] },
      {
        onSuccess: async ({ organization }) => {
          await router.invalidate()
          reset({
            organizationId: [organization.id],
          })

          toaster.success({
            title: 'Perfil da organização ativado com sucesso',
            description: `O perfil da organização ${organization.name} foi ativado com sucesso.`,
          })

          await queryClient.invalidateQueries({
            queryKey: organizationProfileQueryKeys.summary(),
          })
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
  }

  return {
    errors,
    control,
    loadSelectOrganizations,
    isLoadingOrganizations,
    isPendingUpdateActiveOrganization,
    handleSubmit,
    handleUpdateOrganizationProfile,
  }
}
