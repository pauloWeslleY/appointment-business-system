import {
  Alert,
  Box,
  Card,
  HStack,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterReviewsNotes from '@/features/reviews/components/filter-reviews-notes'
import StatsReviews from '@/features/reviews/components/stats-reviews'
import { useGetAllReviewsByEstablishment } from '@/features/reviews/hooks/use-get-all-reviews-by-establishment'
import ReviewsListPage from '@/features/reviews/pages/reviews-list.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

export default function ReviewsPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const {
    data: getReviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetAllReviewsByEstablishment(establishment.id)

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <HStack align="center">
          <Header.Icon icon={Star} />
          <Header.Title>Avaliações</Header.Title>
        </HStack>
      </Header.Root>
      <Text fontSize="sm">
        Avaliações verificadas disponíveis publicamente.
      </Text>

      {errorReviews && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{errorReviews.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingReviews && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="40px" rounded="xl" />
          <Skeleton height="40px" rounded="xl" />
          <Skeleton height="40px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingReviews && !errorReviews && (
        <Box spaceY="4">
          <StatsReviews />

          <HStack flexWrap="wrap">
            <SearchPage />
            <FilterReviewsNotes />
          </HStack>

          <Card.Root variant="outline" css={cardSectionCss}>
            <ReviewsListPage reviews={getReviews ?? []} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
