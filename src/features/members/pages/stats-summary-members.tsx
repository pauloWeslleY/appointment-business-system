import { For, SimpleGrid } from '@chakra-ui/react'

import CardStatMember from '../components/card-stat-member'
import { useStatsSummaryMembers } from '../hooks/use-stats-summary-members'

const StatsSummaryMembers = () => {
  const { getMembers } = useStatsSummaryMembers()

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4}>
      <For each={getMembers}>
        {(stat) => <CardStatMember key={stat.title} stat={stat} />}
      </For>
    </SimpleGrid>
  )
}

export default StatsSummaryMembers
