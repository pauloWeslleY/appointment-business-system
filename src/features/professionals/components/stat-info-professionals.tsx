import { For, SimpleGrid, Stat } from '@chakra-ui/react'

import type { ProfessionalPageApiResponse } from '../types/professional-page-api.type'

interface StatInfoProfessionalsProps {
  summary: ProfessionalPageApiResponse['summary']
}

export default function StatInfoProfessionals({
  summary,
}: StatInfoProfessionalsProps) {
  const stats = [
    {
      title: 'Profissionais cadastrados',
      value: summary.total,
      color: 'blue',
    },
    {
      title: 'Especialidades',
      value: summary.specialties,
      color: 'purple',
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
      <For each={stats}>
        {(stat) => (
          <Stat.Root
            key={stat.title}
            p="4"
            shadow="xs"
            rounded="xl"
            bg={{ base: 'white', _dark: 'gray.950/40' }}
            outlineWidth="1px"
            outlineStyle="solid"
            outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            borderLeftWidth="5px"
            borderLeftColor={`${stat.color}.500`}
          >
            <Stat.Label>{stat.title}</Stat.Label>
            <Stat.ValueText>{stat.value}</Stat.ValueText>
          </Stat.Root>
        )}
      </For>
    </SimpleGrid>
  )
}
