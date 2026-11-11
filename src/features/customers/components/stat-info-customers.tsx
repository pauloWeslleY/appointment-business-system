import { For, SimpleGrid, Stat } from '@chakra-ui/react'

import type { CustomerPageApiResponse } from '../types/customer-page-api.type'

const StatInfoCustomers = ({
  summary,
}: {
  summary: CustomerPageApiResponse['summary']
}) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4" w="full">
      <For
        each={[
          {
            title: 'Total de clientes',
            value: String(summary.total),
            color: 'cyan',
          },
          {
            title: 'Total de clientes ativos',
            value: String(summary.active),
            color: 'green',
          },
          {
            title: 'Total de clientes inativos',
            value: String(summary.inactive),
            color: 'red',
          },
        ]}
      >
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
