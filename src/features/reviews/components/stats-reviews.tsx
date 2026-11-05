import { Flex, Icon, Stat } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { useMemo } from 'react'

import { useGetAllReviewsByEstablishment } from '../hooks/use-get-all-reviews-by-establishment'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const StatsReviews = () => {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const { data: getReviewsList } = useGetAllReviewsByEstablishment(
    establishment.id,
  )

  const getAverageRating = useMemo(() => {
    const totalReviews = getReviewsList?.length || 0
    const totalRating =
      getReviewsList?.reduce((acc, review) => acc + review.rating, 0) || 0
    return {
      average:
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0',
      reviewsCount: totalReviews,
    }
  }, [getReviewsList])

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
