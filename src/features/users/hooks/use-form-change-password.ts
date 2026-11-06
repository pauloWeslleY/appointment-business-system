import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { userMutationOptions } from '../queries/user.mutation-options'
import { ChangePasswordFormSchema } from '../schemas/change-password-form.schema'
import { ChangePasswordError } from '../services/change-password.service'
import type { ChangePasswordForm } from '../types/change-password.type'

const defaultValues: ChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  revokeOtherSessions: true,
}

export function useFormChangePassword() {
  const { data: session, refetch: refreshSession } = useAppSession()
  const mutation = useMutation(userMutationOptions.changePassword())
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues,
  })

  const handleChangePassword = async (
    data: ChangePasswordForm,
  ): Promise<void> => {
    if (mutation.isPending) {
      return
    }

    if (!session?.user.id) {
      form.setError('root', {
        message: 'Sua sessão expirou. Faça login novamente.',
      })
      return
    }

    form.clearErrors('root')

    try {
      await mutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: data.revokeOtherSessions,
      })
    } catch (error: unknown) {
      const isCurrentPasswordError =
        error instanceof ChangePasswordError &&
        error.code === 'INVALID_PASSWORD'
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível alterar sua senha.'
      form.setError(
        isCurrentPasswordError ? 'currentPassword' : 'root',
        { message },
        { shouldFocus: true },
      )
      return
    } finally {
      mutation.reset()
    }

    form.reset(defaultValues)
    toaster.success({ title: 'Senha alterada com sucesso.' })

    try {
      await refreshSession()
    } catch {
      form.setError('root', {
        message:
          'Sua senha foi alterada, mas não foi possível atualizar a sessão. Recarregue a página.',
      })
    }
  }

  return { form, handleChangePassword }
}
