import {
  Alert,
  Box,
  Icon,
  Image,
  type PaginationPageChangeDetails,
  RatingGroup,
  Skeleton,
  Spinner,
  Stack,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams, useSearch } from '@tanstack/react-router'
import { FileImage } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import PaginationTableReviews from '../components/pagination-table-reviews'
import ReviewsTableHeader from '../components/reviews-table-header'
import { useGetAllReviewsByEstablishment } from '../hooks/use-get-all-reviews-by-establishment'
import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

const ReviewsTablePage = () => {
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
        <Table.Root size="sm" rounded="xl" overflow="hidden">
          <ReviewsTableHeader />

          {visibleReviews.length === 0 && (
            <Alert.Root status="info" rounded="xl" my="4">
              <Alert.Indicator />
              <Alert.Title>Não há avaliações visíveis</Alert.Title>
            </Alert.Root>
          )}

          {visibleReviews.length > 0 && (
            <Table.Body>
              {visibleReviews.map((item) => (
                <Table.Row
                  key={item.id}
                  transition="colors"
                  bg={{ base: 'white', _dark: 'gray.950/40' }}
                  _hover={{
                    bg: { base: 'gray.100', _dark: 'colorPalette.900/30' },
                  }}
                >
                  <Table.Cell>
                    {item.user.image && (
                      <Image
                        src={item.user.image}
                        alt={item.user.name}
                        boxSize="50px"
                        objectFit="cover"
                        rounded="lg"
                      />
                    )}

                    {!item.user.image && (
                      <Box
                        p="2"
                        bg={{ base: 'gray.200', _dark: 'gray.800' }}
                        rounded="full"
                        w="fit"
                      >
                        <Icon boxSize="6">
                          <FileImage />
                        </Icon>
                      </Box>
                    )}
                  </Table.Cell>
                  <Table.Cell>{item.user.name}</Table.Cell>
                  <Table.Cell>{item.comment}</Table.Cell>
                  <Table.Cell>
                    <RatingGroup.Root
                      readOnly
                      count={5}
                      defaultValue={Number.parseInt(String(item.rating), 10)}
                      size="sm"
                    >
                      <RatingGroup.HiddenInput />
                      <RatingGroup.Control />
                    </RatingGroup.Root>
                  </Table.Cell>
                  <Table.Cell>
                    {formattedDateAndHours(item.createdAt)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
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

export default ReviewsTablePage
