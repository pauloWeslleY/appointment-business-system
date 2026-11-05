import { For, SimpleGrid, Stat } from '@chakra-ui/react'

import type { ProfessionalListItemApiResponse } from '../types/professional-api.type'

interface StatInfoProfessionalsProps {
  professionals: ProfessionalListItemApiResponse[]
}

export default function StatInfoProfessionals({
  professionals,
}: StatInfoProfessionalsProps) {
  const specialtyCount = new Set(
    professionals.map((professional) => professional.specialty.trim()),
  ).size

  const stats = [
    {
      title: 'Profissionais cadastrados',
      value: professionals.length,
      color: 'blue',
    },
    {
      title: 'Especialidades',
      value: specialtyCount,
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
