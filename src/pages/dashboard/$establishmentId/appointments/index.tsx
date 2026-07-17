import { Box } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import dayjs from 'dayjs'
import z from 'zod'

import Header from '@/components/layout/header'
import ListAppointmentEstablishment from '@/features/appointments/pages/list-appointment-establishment'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/appointments/',
)({
  validateSearch: z.object({
    to: z.string().optional(),
    from: z.string().optional(),
    status: z.string().optional(),
    service_id: z.string().optional(),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.from || !search.to) {
      const dateCurrent = dayjs()

      throw redirect({
        to: '/dashboard/$establishmentId/appointments',
        params: {
          establishmentId: params.establishmentId,
        },
        search: {
          from: dateCurrent.format('YYYY-MM-DD'),
          to: dateCurrent.add(1, 'month').format('YYYY-MM-DD'),
        },
      })
    }
  },
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

      <ListAppointmentEstablishment />
    </Box>
  )
}
