import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import FormStepsRegister from '@/features/authentication/components/form-steps-register'

export const Route = createFileRoute('/_auth/register/')({
  validateSearch: z.object({
    step: z.number().optional(),
  }),
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div>
      <FormStepsRegister />
    </div>
  )
}
