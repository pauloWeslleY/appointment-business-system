import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import type { SuccessContext } from 'better-auth/react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'

import { LoginFormSchema } from '../schemas/login-form.schema'
import type { AuthModel } from '../types/authentication.model'
import type { LoginFormData } from '../types/login-form-data.type'

export function useLoginPage() {
  const navigate = useNavigate()

  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmitLogin = async (data: LoginFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name} logado com sucesso`,
          })

          reset()
          navigate({ to: '/establishment' })
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] ?? error.message
          toaster.error({ title: _error || 'Erro ao realizar login' })
          setError('root', {
            type: 'custom',
            message: _error || 'Erro ao realizar login',
          })
        },
      },
    )
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmitLogin,
  }
}
