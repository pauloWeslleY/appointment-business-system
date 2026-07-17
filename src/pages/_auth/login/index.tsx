import { createFileRoute } from '@tanstack/react-router'

import FormLoginPage from '@/features/authentication/pages/form-login.page'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
})

function LoginPage() {
  return <FormLoginPage />
}
