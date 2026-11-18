import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

import { ForgotPasswordSchema } from '../schemas/forgot-password.schema'
import type { ForgotPasswordData } from '../types/forgot-password.type'

const formDefaultValuesForgotPassword: ForgotPasswordData = { email: '' }

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
    defaultValues: formDefaultValuesForgotPassword,
  })

  const onSubmitForgotPassword = async ({ email }: ForgotPasswordData) => {
    const { error, data } = await authClient.requestPasswordReset({ email })

    if (error) {
      setError('root', { message: error.message })
      return
    }

    reset(formDefaultValuesForgotPassword)
    toaster.success({
      title: 'Verifique seu e-mail',
      description:
        'Se este e-mail existir em nosso sistema, verifique sua caixa de entrada para encontrar o link de redefinição.',
    })
    navigate({
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
