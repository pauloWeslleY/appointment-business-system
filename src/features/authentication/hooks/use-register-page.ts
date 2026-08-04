import { zodResolver } from '@hookform/resolvers/zod'
import type { SuccessContext } from 'better-auth/react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'

import { RegisterFormSchema } from '../schemas/register-form.schema'
import type { AuthModel } from '../types/authentication.model'
import type { RegisterFormData } from '../types/register-form-data.type'
import { useStepRegister } from './use-step-register'

export function useRegisterPage() {
  const { stepRegister, setStepRegisterWithValidation } = useStepRegister()

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

  const onSubmitRegister = async (data: RegisterFormData) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.username,
      },
      {
        onSuccess: ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name} cadastrado com sucesso`,
          })

          reset()
          setStepRegisterWithValidation(stepRegister + 1)
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] ?? error.message
          toaster.error({ title: _error || 'Erro ao realizar cadastro' })
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
