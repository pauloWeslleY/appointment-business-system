import { createFileRoute } from '@tanstack/react-router'

import FormRegister from '@/features/authentication/pages/form-register.page'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  return <FormRegister />
}
