import { For, SimpleGrid, Stat } from '@chakra-ui/react'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import type { ServicePageApiResponse } from '../types/service-page-api.type'

const StatInfoServiceEstablishment = ({
  summary,
}: {
  summary: ServicePageApiResponse['summary']
}) => {
  const getStatServiceEstablishment = [
    {
      title: 'Total de serviços cadastrados',
      value: summary.totalServices.toString(),
      color: 'blue',
    },
    {
      title: 'Valor total dos serviços',
      value: formatCurrencyInCents(summary.totalValueInCents),
      color: 'purple',
    },
    {
      title: 'Total de serviços agendados',
      value: summary.totalAppointments.toString(),
      color: 'orange',
    },
    {
      title: 'Serviços ativos',
      value: summary.activeServices.toString(),
      color: 'green',
    },
    {
      title: 'Serviços inativos',
      value: summary.inactiveServices.toString(),
      color: 'red',
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3, '2xl': 5 }} gap="4" w="full">
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
