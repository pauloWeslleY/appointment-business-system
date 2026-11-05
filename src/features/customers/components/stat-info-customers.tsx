import { type ColorPalette, For, SimpleGrid, Stat } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useGetAllCustomersByEstablishment } from '../hooks/use-get-all-customers-by-establishment'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const StatInfoCustomers = () => {
  const { establishment } = dashboardSlugRoute.useLoaderData()

  const { data: getCustomersList } = useGetAllCustomersByEstablishment(
    establishment.id,
  )

  const getStatCustomers = useMemo<
    { title: string; value: string; color: ColorPalette }[]
  >(() => {
    const filteredCustomersActive = getCustomersList?.filter(
      (service) => service.status,
    )

    const filteredCustomersInactive = getCustomersList?.filter(
      (service) => !service.status,
    )

    const customerTotals: Record<string, number> = {
      ativo: filteredCustomersActive?.length ?? 0,
      inativo: filteredCustomersInactive?.length ?? 0,
    }

    return [
      {
        title: 'Total de clientes',
        value: String(getCustomersList?.length ?? 0),
        color: 'cyan',
      },
      {
        title: 'Total de clientes ativos',
        value: String(customerTotals.ativo ?? 0),
        color: 'green',
      },
      {
        title: 'Total de clientes inativos',
        value: String(customerTotals.inativo ?? 0),
        color: 'red',
      },
    ]
  }, [getCustomersList])

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4" w="full">
      <For each={getStatCustomers}>
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

export default StatInfoCustomers
