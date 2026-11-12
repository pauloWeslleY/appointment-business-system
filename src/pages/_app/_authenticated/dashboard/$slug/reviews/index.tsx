import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterReviewsNotes from '@/features/reviews/components/filter-reviews-notes'
import StatsReviews from '@/features/reviews/components/stats-reviews'
import { useReviewPage } from '@/features/reviews/hooks/use-review-page'
import ReviewsListPage from '@/features/reviews/pages/reviews-list.page'
import { ReviewsRouteSearchSchema } from '@/features/reviews/schemas/reviews-route-search.schema'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/reviews/',
)({
  validateSearch: ReviewsRouteSearchSchema,
  component: ReviewsPage,
  head: () => ({
    meta: [
      {
        title: 'Avaliações | Agendros',
      },
    ],
  }),
})

function ReviewsPage() {
  const {
    reviews,
    totalReviews,
    reviewsSummary,
    reviewsError,
    isLoadingReviews,
    reviewsScopeKey,
    retryReviews,
  } = useReviewPage()

  return (
    <Box key={reviewsScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center" minW="0">
          <Header.Icon icon={Star} />
          <VStack align="start" gap="0" minW="0">
            <Header.Title>Avaliações</Header.Title>
            <Header.SubTitle>
              Avaliações verificadas disponíveis publicamente.
            </Header.SubTitle>
          </VStack>
        </HStack>
      </Header.Root>

      <Box spaceY="4">
        <Flex align="center" gap="2" flexWrap="wrap">
          <SearchPage resetPagination />
          <FilterReviewsNotes />
        </Flex>

        {reviewsError && (
          <Alert.Root status="error" rounded="lg">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{reviewsError.message}</Alert.Title>
              <Alert.Title>
                Não foi possível carregar as avaliações.
              </Alert.Title>
            </Alert.Content>
            <Button rounded="lg" onClick={retryReviews} size="sm">
              Tentar novamente
            </Button>
          </Alert.Root>
        )}

        {isLoadingReviews && (
          <Stack gap="2" w="full">
            <For each={[1, 2, 3]}>
              {(item) => (
                <Skeleton
                  key={item}
                  height="60px"
                  rounded="lg"
                  bg={{ base: 'gray.200', _dark: 'gray.700/70' }}
                />
              )}
            </For>
          </Stack>
        )}

        {!isLoadingReviews && !reviewsError && (
          <Box spaceY="4">
            {reviewsSummary && <StatsReviews summary={reviewsSummary} />}

            <Card.Root variant="outline" css={cardSectionCss}>
              <ReviewsListPage reviews={reviews} total={totalReviews} />
            </Card.Root>
          </Box>
        )}
      </Box>
    </Box>
  )
}
