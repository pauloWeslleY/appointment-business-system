import {
  Alert,
  Box,
  Card,
  HStack,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Star } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterReviewsNotes from '@/features/reviews/components/filter-reviews-notes'
import StatsReviews from '@/features/reviews/components/stats-reviews'
import { useReviewPage } from '@/features/reviews/hooks/use-review-page'
import ReviewsListPage from '@/features/reviews/pages/reviews-list.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export default function ReviewsPage() {
  const {
    data: getReviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useReviewPage()

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

      <HStack flexWrap="wrap">
        <SearchPage resetPagination />
        <FilterReviewsNotes />
      </HStack>

      {!isLoadingReviews && !errorReviews && (
        <Box spaceY="4">
          {getReviews && <StatsReviews summary={getReviews.summary} />}

          <Card.Root variant="outline" css={cardSectionCss}>
            <ReviewsListPage
              reviews={getReviews?.reviews ?? []}
              total={getReviews?.total ?? 0}
            />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
