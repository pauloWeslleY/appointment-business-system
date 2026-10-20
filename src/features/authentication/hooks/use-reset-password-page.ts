import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { authClient } from '@/lib/auth'

import { ResetPasswordSchema } from '../schemas/reset-password.schema'
import type { ResetPasswordData } from '../types/reset-password.type'

export function useResetPasswordPage(token?: string) {
  const navigate = useNavigate()
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: '' },
  })

  const onSubmitResetPassword = async ({ newPassword }: ResetPasswordData) => {
    if (!token) {
      setError('root', { message: 'Token de redefinição de senha ausente.' })
      return
    }

    const { error, data } = await authClient.resetPassword({
      newPassword,
      token,
    })

    if (error) {
      setError('root', { message: error.message })
    }

    if (data) {
      reset({ newPassword: '' })
      await navigate({ to: '/login', replace: true })
    }
  }

  return {
    errors,
    isSubmitting,
    register,
    handleSubmit,
    onSubmitResetPassword,
  }
}
