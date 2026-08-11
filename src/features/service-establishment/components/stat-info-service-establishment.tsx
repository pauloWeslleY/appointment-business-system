import { For, SimpleGrid, Stat } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model copy'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const StatInfoServiceEstablishment = () => {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()

  const serviceEstablishment = queryClient.getQueryData<
    ListServicesEstablishmentModel[]
  >(serviceEstablishmentQueryKeys.detail(establishment.id))

  const getStatServiceEstablishment = useMemo(() => {
    const getTotalServicesActive = serviceEstablishment?.filter(
      (service) => service.status,
    )

    const getTotalServicesInactive = serviceEstablishment?.filter(
      (service) => !service.status,
    )

    const getTotalValueServices = serviceEstablishment?.reduce(
      (total, service) => total + service.servicePriceInCents,
      0,
    )

    const getTotalBookingsServices = serviceEstablishment?.reduce(
      (total, service) => total + service.totalBookings,
      0,
    )

    const getStatServices = [
      {
        title: 'Total de serviços cadastrados',
        value: (serviceEstablishment?.length ?? 0).toString(),
        color: 'blue',
      },
      {
        title: 'Valor total dos serviços',
        value: formatCurrencyInCents(getTotalValueServices ?? 0),
        color: 'purple',
      },
      {
        title: 'Total de serviços agendados',
        value: (getTotalBookingsServices ?? 0).toString(),
        color: 'orange',
      },
      {
        title: 'Serviços ativos',
        value: (getTotalServicesActive?.length ?? 0).toString(),
        color: 'green',
      },
      {
        title: 'Serviços inativos',
        value: (getTotalServicesInactive?.length ?? 0).toString(),
        color: 'red',
      },
    ]

    return getStatServices
  }, [serviceEstablishment])

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap="4" w="full">
      <For each={getStatServiceEstablishment}>
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

export default StatInfoServiceEstablishment
