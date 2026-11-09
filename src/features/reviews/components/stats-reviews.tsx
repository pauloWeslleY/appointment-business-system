import { Flex, Icon, Stat } from '@chakra-ui/react'
import { Star } from 'lucide-react'

import type { ReviewPageApiResponse } from '../types/review-page-api.type'

const StatsReviews = ({
  summary,
}: {
  summary: ReviewPageApiResponse['summary']
}) => {
  const getAverageRating = {
    average: summary.average.toFixed(1),
    reviewsCount: summary.total,
  }

  return (
    <Flex align="stretch" gap="4" flexDir={{ base: 'column', sm: 'row' }}>
      <Stat.Root
        p="4"
        shadow="xs"
        rounded="xl"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        outlineWidth="1px"
        outlineStyle="solid"
        outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Stat.Label>Média de Avaliações</Stat.Label>

        <Flex align="center" gap="2">
          <Icon as={Star} color="yellow.400" boxSize="5" />
          <Stat.ValueText>{getAverageRating.average}</Stat.ValueText>
        </Flex>
      </Stat.Root>

      <Stat.Root
        p="4"
        shadow="xs"
        rounded="xl"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        outlineWidth="1px"
        outlineStyle="solid"
        outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Stat.Label>Total de Avaliações</Stat.Label>
        <Stat.ValueText>{getAverageRating.reviewsCount}</Stat.ValueText>
      </Stat.Root>
    </Flex>
  )
}

export default StatsReviews
