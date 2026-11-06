import { For, SimpleGrid, Stat } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useGetAppointmentByEstablishment } from '../hooks/use-get-appointment-by-establishment'
import {
  AppointmentStatus,
  type AppointmentStatusType,
} from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const StatInfoAppointments = () => {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const search = useSearch({
    from: '/_app/_authenticated/dashboard/$slug/appointment/',
  })
  const { data: getAppointments } = useGetAppointmentByEstablishment({
    establishmentId: establishment.id,
    from: search.from ?? '',
    to: search.to ?? '',
  })

  const getStatAppointments = useMemo(() => {
    const filteredAppointmentByEstablishment = (
      status: AppointmentStatusType,
    ) => {
      return getAppointments?.filter((service) => service.status === status)
    }

    const getTotalAppointments: Record<
      AppointmentStatusType,
      GetAppointmentByEstablishmentModel[] | undefined
    > = {
      [AppointmentStatus.PENDING]: filteredAppointmentByEstablishment(
        AppointmentStatus.PENDING,
      ),
      [AppointmentStatus.CONCLUDED]: filteredAppointmentByEstablishment(
        AppointmentStatus.CONCLUDED,
      ),
      [AppointmentStatus.CONFIRMED]: filteredAppointmentByEstablishment(
        AppointmentStatus.CONFIRMED,
      ),
      [AppointmentStatus.CANCELLED]: filteredAppointmentByEstablishment(
        AppointmentStatus.CANCELLED,
      ),
    }

    return [
      {
        title: 'Total de agendamentos',
        value: String(getAppointments?.length ?? 0),
        color: 'pink',
      },
      {
        title: 'Total de agendamentos concluídos',
        value: String(
          getTotalAppointments[AppointmentStatus.CONCLUDED]?.length ?? 0,
        ),
        color: 'green',
      },
      {
        title: 'Total de agendamentos confirmados',
        value: String(
          getTotalAppointments[AppointmentStatus.CONFIRMED]?.length ?? 0,
        ),
        color: 'blue',
      },
      {
        title: 'Total de agendamentos cancelados',
        value: String(
          getTotalAppointments[AppointmentStatus.CANCELLED]?.length ?? 0,
        ),
        color: 'red',
      },
    ]
  }, [getAppointments])

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
