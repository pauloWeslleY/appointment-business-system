import {
  Alert,
  For,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import Loader from '@/components/loader'

import CardReview from '../components/card-review'
import PaginationTableReviews from '../components/pagination-table-reviews'
import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

interface ReviewsListPageProps {
  reviews: ReviewEstablishmentModel[]
  total: number
}

const ReviewsListPage = ({ reviews, total }: ReviewsListPageProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    },
    { shallow: true },
  )

  const visibleReviews = reviews

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (total === 0) {
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
      {isPendingPagination && <Loader h="28" message="Carregando dados..." />}

      {!isPendingPagination && (
        <div>
          {visibleReviews.length === 0 && (
            <Alert.Root status="info" rounded="xl" my="4">
              <Alert.Indicator />
              <Alert.Title>Não há avaliações visíveis</Alert.Title>
            </Alert.Root>
          )}

          {visibleReviews.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="4">
              <For each={visibleReviews}>
                {(review) => <CardReview key={review.id} review={review} />}
              </For>
            </SimpleGrid>
          )}
        </div>
      )}

      <PaginationTableReviews
        reviewsLength={total}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </Stack>
  )
}

export default ReviewsListPage
