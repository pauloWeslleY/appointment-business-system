import { zodResolver } from '@hookform/resolvers/zod'
import { type LinkProps, useNavigate } from '@tanstack/react-router'
import { useLocation } from '@tanstack/react-router'
import { type SuccessContext } from 'better-auth/react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { takeSubscriptionLoginReturn } from '@/features/subscriptions/services/subscription-login-return'
import { authClient } from '@/lib/auth'
import { cookie } from '@/shared/cache/cookie'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'

import { LoginFormSchema } from '../schemas/login-form.schema'
import type { AuthModel } from '../types/authentication.model'
import type { LoginFormData } from '../types/login-form-data.type'

const DEFAULT_CALLBACK_URL: LinkProps['to'] = '/'

export function useLoginPage() {
  const [isPendingLoginWithGoogle, startTransition] = useTransition()
  const { state } = useLocation()
  const navigate = useNavigate()
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: state?.email ?? '',
      password: '',
    },
  })
  const redirectToLogin = cookie.get('redirectTo')
  const hasRedirectToLogin = Boolean(redirectToLogin)

  const handleSignInWithGoogle = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${import.meta.env.VITE_WEB_URL}${DEFAULT_CALLBACK_URL}`,
      })
    })
  }

  const onSubmitLogin = async (data: LoginFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name}`,
            description: 'Entrou no sistema',
          })

          reset()

          if (redirectToLogin) {
            navigate({ to: redirectToLogin, replace: true })
            return
          }

          const returnTo = takeSubscriptionLoginReturn(sessionStorage)
          navigate({ to: returnTo ?? DEFAULT_CALLBACK_URL })
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] || error.message
          toaster.error({
            title: _error || 'Erro ao realizar login',
            description: 'Tente novamente mais tarde',
          })
          setError('root', {
            type: 'custom',
            message: _error || 'Erro ao realizar login',
          })
        },
      },
    )
  }

  return {
    errors,
    register,
    isSubmitting,
    isPendingLoginWithGoogle,
    onSubmitLogin,
    hasRedirectToLogin,
    handleSubmit,
    handleSignInWithGoogle,
  }
}
