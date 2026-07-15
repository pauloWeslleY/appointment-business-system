import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import FormStepsRegister from './-components/form-steps-register'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <Box>
      <FormStepsRegister />
    </Box>
  )
}
