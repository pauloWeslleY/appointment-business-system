import { createFileRoute } from '@tanstack/react-router'

import FormForgotPassword from '@/features/authentication/pages/forgot-password.page'

export const Route = createFileRoute('/_auth/forgot-password/')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return <FormForgotPassword />
}
