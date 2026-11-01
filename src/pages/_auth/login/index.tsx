import { createFileRoute } from '@tanstack/react-router'

import FormLoginPage from '@/features/authentication/pages/form-login.page'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
  head: () => ({
    meta: [{ title: 'Login' }],
  }),
})

function LoginPage() {
  return <FormLoginPage />
}
