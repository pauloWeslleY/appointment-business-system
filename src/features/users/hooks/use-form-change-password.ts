import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { authClient } from '@/lib/auth'
import { getBetterAuthErrorMessage } from '@/shared/helpers/better-auth-error'
import {
  getPasswordStrength,
  hasMetAllPasswordRequirements,
} from '@/shared/helpers/verify-password'

import {
  CHANGE_PASSWORD_FALLBACK_ERROR_MESSAGE,
  changePasswordErrorMessages,
  EXPIRED_SESSION_ERROR_MESSAGE,
  INVALID_CHANGE_PASSWORD_RESPONSE_ERROR_MESSAGE,
  REFRESH_SESSION_ERROR_MESSAGE,
} from '../constants/change-password-error-messages'
import { ChangePasswordApiResponseSchema } from '../schemas/change-password-api.schema'
import { ChangePasswordFormSchema } from '../schemas/change-password-form.schema'
import type { ChangePasswordForm } from '../types/change-password.type'

const changePasswordDefaultValues = (): ChangePasswordForm => ({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  revokeOtherSessions: true,
})

export function useFormChangePassword() {
  const { data: session, refetch: refreshSession } = useAppSession()
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset: resetChangePasswordForm,
    formState: {
      errors: changePasswordFormErrors,
      isSubmitting: isSubmittingChangePassword,
      isValid: isChangePasswordFormValid,
    },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: changePasswordDefaultValues(),
    mode: 'onChange',
  })

  const newPassword = useWatch({ control, name: 'newPassword' })
  const newPasswordStrength = getPasswordStrength(newPassword)
  const hasMetAllNewPasswordRequirements =
    hasMetAllPasswordRequirements(newPassword)

  const shouldShowNewPasswordError =
    hasMetAllNewPasswordRequirements && !!changePasswordFormErrors.newPassword
  const isSubmitDisabled =
    !isChangePasswordFormValid || isSubmittingChangePassword

  const cancelChangePassword = (): void => {
    resetChangePasswordForm(changePasswordDefaultValues())
  }

  const showChangePasswordError = (
    changePasswordErrorMessage: string,
  ): void => {
    setError('root', { message: changePasswordErrorMessage })
    toaster.error({
      title: 'Erro ao alterar senha',
      description: changePasswordErrorMessage,
    })
  }

  const refreshSessionAfterChangePassword = async (): Promise<void> => {
    try {
      await refreshSession()
    } catch {
      showChangePasswordError(REFRESH_SESSION_ERROR_MESSAGE)
    }
  }

  const submitChangePassword = async ({
    currentPassword,
    newPassword,
    revokeOtherSessions,
  }: ChangePasswordForm): Promise<void> => {
    const hasAuthenticatedUser = Boolean(session?.user.id)

    if (!hasAuthenticatedUser) {
      showChangePasswordError(EXPIRED_SESSION_ERROR_MESSAGE)
      return
    }

    clearErrors('root')

    try {
      const { data: changePasswordResponse, error: changePasswordError } =
        await authClient.changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions,
        })

      if (changePasswordError) {
        const changePasswordErrorMessage = getBetterAuthErrorMessage(
          changePasswordError,
          {
            customErrorMessages: changePasswordErrorMessages,
            fallbackErrorMessage: CHANGE_PASSWORD_FALLBACK_ERROR_MESSAGE,
          },
        )
        showChangePasswordError(changePasswordErrorMessage)
        return
      }

      const changePasswordResponseValidation =
        ChangePasswordApiResponseSchema.safeParse(changePasswordResponse)

      if (!changePasswordResponseValidation.success) {
        showChangePasswordError(INVALID_CHANGE_PASSWORD_RESPONSE_ERROR_MESSAGE)
        return
      }

      resetChangePasswordForm(changePasswordDefaultValues())
      toaster.success({ title: 'Senha alterada com sucesso.' })
    } catch {
      showChangePasswordError(CHANGE_PASSWORD_FALLBACK_ERROR_MESSAGE)
      return
    }

    await refreshSessionAfterChangePassword()
  }

  return {
    control,
    changePasswordFormErrors,
    isSubmittingChangePassword,
    isChangePasswordFormValid,
    newPassword,
    newPasswordStrength,
    shouldShowNewPasswordError,
    isSubmitDisabled,
    register,
    handleSubmit,
    submitChangePassword,
    cancelChangePassword,
  }
}
