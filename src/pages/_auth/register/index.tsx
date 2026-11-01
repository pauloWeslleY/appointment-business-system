import { createFileRoute } from '@tanstack/react-router'

import FormRegister from '@/features/authentication/pages/form-register.page'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage,
  head: () => ({
    meta: [{ title: 'Cadastro' }],
  }),
})

function RegisterPage() {
  return <FormRegister />
}
