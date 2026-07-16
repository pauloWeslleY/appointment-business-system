import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/appointments/',
)({
  component: AppointmentPage,
})

function AppointmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />

        <div>
          <Header.Title>Agendamentos</Header.Title>
          <Header.SubTitle>
            Acompanhe os horários marcados pelos clientes
          </Header.SubTitle>
        </div>
      </Header.Root>
    </Box>
  )
}
