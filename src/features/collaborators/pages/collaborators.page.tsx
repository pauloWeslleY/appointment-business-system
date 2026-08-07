import {
  Alert,
  Box,
  For,
  type PaginationPageChangeDetails,
  Spinner,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import ReviewsTableHeader from '../components/collaborators-table-header'
import CollaboratorsTablePagination from '../components/collaborators-table-pagination'
import CollaboratorTableRows from '../components/collaborators-table-rows'
import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'

interface CollaboratorsTablePageProps {
  collaborators: CollaboratorEstablishmentModel[]
}

const CollaboratorsTablePage = ({
  collaborators,
}: CollaboratorsTablePageProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    },
    {
      shallow: true,
    },
  )

  const search = useSearch({
    from: '/dashboard/$establishmentId/collaborators/',
  })

  const loadCollaboratorsTableRows = useMemo<
    CollaboratorEstablishmentModel[]
  >(() => {
    const querySearch = search.q?.trim().toLowerCase()

    const searchReviewsTable = (params: string) =>
      querySearch ? params.toLowerCase().includes(querySearch) : true

    const filteredReviews = collaborators.filter((collaborator) => {
      const emailQueryParams = searchReviewsTable(collaborator.name)
      const nameQueryParams = searchReviewsTable(collaborator.email)
      const statusCollaboratorQueryParams = search.status
        ? search.status === collaborator.status
        : true
      const textSearch = emailQueryParams || nameQueryParams
      return textSearch && statusCollaboratorQueryParams
    })

    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size

    return filteredReviews.slice(start, end)
  }, [
    pagination.page,
    pagination.page_size,
    collaborators,
    search.q,
    search.status,
  ])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (collaborators.length === 0) {
    return (
      <Alert.Root status="info" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Não há colaboradores disponíveis</Alert.Title>
          <Alert.Description>
            Nenhum colaborador foi encontrado para este estabelecimento.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Box spaceY="4" w="full">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {loadCollaboratorsTableRows.length === 0 && (
        <Alert.Root status="info" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Não há colaboradores visíveis</Alert.Title>
        </Alert.Root>
      )}

      {loadCollaboratorsTableRows.length > 0 && (
        <Table.Root size="sm" overflow="hidden">
          <ReviewsTableHeader />
          <Table.Body>
            <For each={loadCollaboratorsTableRows}>
              {(collaborator) => (
                <CollaboratorTableRows
                  key={collaborator.id}
                  collaborator={collaborator}
                />
              )}
            </For>
          </Table.Body>
        </Table.Root>
      )}

      <CollaboratorsTablePagination
        count={collaborators.length}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default CollaboratorsTablePage
