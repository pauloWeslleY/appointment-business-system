import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import type { SuccessContext } from 'better-auth/react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'

import { RegisterFormSchema } from '../schemas/register-form.schema'
import type { AuthModel } from '../types/authentication.model'
import type { RegisterFormData } from '../types/register-form-data.type'

export function useRegisterPage() {
  const navigate = useNavigate()
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmitRegister = async (registerData: RegisterFormData) => {
    await authClient.signUp.email(
      {
        email: registerData.email,
        password: registerData.password,
        name: registerData.username,
      },
      {
        onSuccess: async ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name} cadastrado com sucesso`,
            description: 'Verifique seu e-mail para ativar sua conta.',
          })

          reset(registerData)
          await navigate({
            to: '/login',
            state: {
              registrationSuccess: true,
              email: registerData.email,
            },
          })
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] ?? error.message
          toaster.error({
            title: 'Ops! não foi possível realizar o cadastro',
            description: _error || 'Erro ao realizar cadastro',
          })
          setError('root', {
            type: 'custom',
            message: _error || 'Erro ao realizar cadastro',
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
    onSubmitRegister,
  }
}
