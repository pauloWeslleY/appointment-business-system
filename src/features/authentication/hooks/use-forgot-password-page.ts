import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { authClient } from '@/lib/auth'

import { ForgotPasswordSchema } from '../schemas/forgot-password.schema'
import type { ForgotPasswordData } from '../types/forgot-password.type'

export function useForgotPasswordPage() {
  const navigate = useNavigate()
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmitForgotPassword = async ({ email }: ForgotPasswordData) => {
    const { error, data } = await authClient.requestPasswordReset({ email })

    if (error) {
      setError('root', { message: error.message })
      return
    }

    reset({ email: '' })
    await navigate({
      to: '/login',
      replace: true,
      state: {
        passwordResetRequestSuccess: data.status,
      },
    })
  }

  return {
    errors,
    isSubmitting,
    register,
    handleSubmit,
    onSubmitForgotPassword,
  }
}
