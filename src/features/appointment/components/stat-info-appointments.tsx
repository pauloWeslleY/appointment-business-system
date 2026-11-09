import { For, SimpleGrid, Stat } from '@chakra-ui/react'

import type { AppointmentPageApiResponse } from '../types/appointment-page-api.type'
import { AppointmentStatus } from '../types/appointment-status.type'

const StatInfoAppointments = ({
  summary,
}: {
  summary: AppointmentPageApiResponse['summary']
}) => {
  const getStatAppointments = [
    {
      title: 'Total de agendamentos',
      value: String(summary.total),
      color: 'pink',
    },
    {
      title: 'Total de agendamentos concluídos',
      value: String(summary.byStatus[AppointmentStatus.CONCLUDED]),
      color: 'green',
    },
    {
      title: 'Total de agendamentos confirmados',
      value: String(summary.byStatus[AppointmentStatus.CONFIRMED]),
      color: 'blue',
    },
    {
      title: 'Total de agendamentos cancelados',
      value: String(summary.byStatus[AppointmentStatus.CANCELLED]),
      color: 'red',
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
      <For each={getStatAppointments}>
        {(statService) => (
          <Stat.Root
            key={statService.title}
            p="4"
            shadow="xs"
            rounded="xl"
            bg={{ base: 'white', _dark: 'gray.950/40' }}
            outlineWidth="1px"
            outlineStyle="solid"
            outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            borderLeftWidth="5px"
            borderLeftColor={`${statService.color}.500`}
          >
            <Stat.Label>{statService.title}</Stat.Label>
            <Stat.ValueText>{statService.value}</Stat.ValueText>
          </Stat.Root>
        )}
      </For>
    </SimpleGrid>
  )
}

export default StatInfoAppointments
