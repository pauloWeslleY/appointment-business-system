import {
  Alert,
  Box,
  For,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams, useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import CardReview from '../components/card-review'
import PaginationTableReviews from '../components/pagination-table-reviews'
import { useGetAllReviewsByEstablishment } from '../hooks/use-get-all-reviews-by-establishment'
import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

const ReviewsListPage = () => {
  const [isPendingPagination, startTransition] = useTransition()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/reviews/',
  })
  const search = useSearch({
    from: '/dashboard/$establishmentId/reviews/',
  })

  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetAllReviewsByEstablishment(establishmentId)

  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    },
    {
      shallow: true,
    },
  )

  const visibleReviews = useMemo<ReviewEstablishmentModel[]>(() => {
    const querySearch = search.q?.trim().toLowerCase()

    const searchReviewsTable = (params: string) => {
      return querySearch ? params.toLowerCase().includes(querySearch) : true
    }

    const filteredReviews = reviews.filter((review) => {
      const commentQueryParams = searchReviewsTable(review.comment)
      const nameQueryParams = searchReviewsTable(review.user.name)
      const notesQueryParams = search.notes
        ? parseInt(review.rating.toString(), 10) === search.notes
        : true
      const textSearch = commentQueryParams || nameQueryParams
      return textSearch && notesQueryParams
    })

    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size

    return filteredReviews.slice(start, end)
  }, [pagination.page, pagination.page_size, reviews, search.q, search.notes])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (isLoadingReviews) {
    return (
      <Stack gap="2" w="full" p="2">
        <Skeleton height="40px" rounded="xl" />
        <Skeleton height="40px" rounded="xl" />
        <Skeleton height="40px" rounded="xl" />
      </Stack>
    )
  }

  if (errorReviews) {
    return (
      <Alert.Root status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Title>{errorReviews.message}</Alert.Title>
      </Alert.Root>
    )
  }

  if (reviews.length === 0) {
    return (
      <Alert.Root status="info" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Não há avaliações disponíveis</Alert.Title>
          <Alert.Description>
            Nenhuma avaliação foi encontrada para este estabelecimento.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Stack gap="4" w="full">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <Box>
          {visibleReviews.length === 0 && (
            <Alert.Root status="info" rounded="xl" my="4">
              <Alert.Indicator />
              <Alert.Title>Não há avaliações visíveis</Alert.Title>
            </Alert.Root>
          )}

          {visibleReviews.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
              <For each={visibleReviews}>
                {(review) => <CardReview key={review.id} review={review} />}
              </For>
            </SimpleGrid>
          )}
        </Box>
      )}

      {reviews.length > pagination.page_size && (
        <PaginationTableReviews
          reviewsLength={reviews.length}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </Stack>
  )
}

export default ReviewsListPage
