import { Alert, Box, Card, HStack, Skeleton, Stack } from '@chakra-ui/react'
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
    data: getReviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useReviewPage()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Star} />
        <div>
          <Header.Title>Avaliações</Header.Title>
          <Header.SubTitle>
            Avaliações verificadas disponíveis publicamente.
          </Header.SubTitle>
        </div>
      </Header.Root>

      <Box spaceY="4">
        <HStack flexWrap="wrap">
          <SearchPage resetPagination />
          <FilterReviewsNotes />
        </HStack>

        {errorReviews && (
          <Alert.Root status="error" rounded="xl">
            <Alert.Indicator />
            <Alert.Title>{errorReviews.message}</Alert.Title>
          </Alert.Root>
        )}

        {isLoadingReviews && (
          <Stack gap="2" w="full">
            <Skeleton h="40px" rounded="xl" />
            <Skeleton h="40px" rounded="xl" />
            <Skeleton h="40px" rounded="xl" />
          </Stack>
        )}

        {!isLoadingReviews && !errorReviews && (
          <>
            {getReviews && <StatsReviews summary={getReviews.summary} />}

            <Card.Root variant="outline" css={cardSectionCss}>
              <ReviewsListPage
                reviews={getReviews?.reviews ?? []}
                total={getReviews?.total ?? 0}
              />
            </Card.Root>
          </>
        )}
      </Box>
    </Box>
  )
}
