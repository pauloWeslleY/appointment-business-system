import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { ActiveOrganizationSchema } from '../schemas/active-organization.schema'
import type { FormActiveOrganizationType } from '../types/active-organization.type'

export function useFormAtiveOrganization() {
  const { data: userAuth } = authClient.useSession()
  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ['select-organizations'],
    queryFn: async () => await authClient.organization.list(),
  })
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
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

    const { data, error } = await authClient.organization.setActive({
      organizationId: organizationId[0],
    })

    if (error) {
      toaster.error({
        title: 'Erro ao ativar perfil da organização',
        description: error.message ?? 'Erro ao ativar perfil da organização',
      })
      setError('organizationId', {
        type: 'manual',
        message: error.message ?? 'Erro ao ativar perfil da organização',
      })
      return
    }

    toaster.success({
      title: 'Perfil da organização ativado com sucesso',
      description: `O perfil da organização ${data?.name} foi ativado com sucesso.`,
    })
  }

  return {
    errors,
    control,
    isSubmitting,
    loadSelectOrganizations,
    isLoadingOrganizations,
    handleSubmit,
    handleUpdateOrganizationProfile,
  }
}
