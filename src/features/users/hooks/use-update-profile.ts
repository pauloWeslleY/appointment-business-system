import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { memberQueryKey } from '@/features/members/queries/member.query-key'
import { authClient } from '@/lib/auth'

import { UpdateProfileFormSchema } from '../schemas/update-profile-form.schema'
import type { UpdateProfileFormType } from '../types/update-profile-form.type'

export function useUpdateProfile() {
  const { data: session, refetch: refreshSession } = useAppSession()
  const queryClient = useQueryClient()
  const {
    reset,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormType>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
    },
  })

  function handleClearErrorUpdateProfile() {
    clearErrors()
  }

  const onSubmitUpdateProfile = async (data: UpdateProfileFormType) => {
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração detectada.' })
      return
    }

    if (!session?.user?.id) {
      toaster.error({
        title: 'Usuário não autenticado.',
        description: 'Por favor, faça login novamente.',
      })
      return
    }

    try {
      await authClient.updateUser({ name: data.name })
      await refreshSession()
      await queryClient.invalidateQueries({
        queryKey: memberQueryKey.context(),
      })

      reset(data)
    } catch (error: unknown) {
      toaster.error({
        title: 'Erro ao atualizar perfil.',
        description: (error as Error).message,
      })
      setError('name', {
        type: 'manual',
        message: (error as Error).message || 'Erro ao atualizar perfil.',
      })
    }
  }

  return {
    errors,
    register,
    isSubmitting,
    onSubmitUpdateProfile,
    handleSubmit,
    handleClearErrorUpdateProfile,
  }
}
