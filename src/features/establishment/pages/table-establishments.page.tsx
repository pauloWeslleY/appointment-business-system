import { Box, Card, EmptyState, Flex, Text, VStack } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { StoreIcon } from 'lucide-react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'
import { cardSectionCss } from '@/theme/styles/global-styles'

import FilterTableEstablishment from '../components/filter-table-establishment'
import TableEstablishments from '../components/table-establishments'
import { useTableEstablishment } from '../hooks/use-table-establishment'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

interface TableEstablishmentsPageProps {
  establishments: EstablishmentOrganizationProfileApiResponse[]
}

const TableEstablishmentsPage = ({
  establishments,
}: TableEstablishmentsPageProps) => {
  const search = useSearch({
    from: '/_app/_authenticated/_admin/establishment/',
  })
  const {
    pagination,
    visibleEstablishments,
    isPendingPagination,
    hasSearchEstablishmentsEmpty,
    handlePageChange,
    startTransition,
  } = useTableEstablishment(establishments, search)

  return (
    <Card.Root
      variant="outline"
      css={cardSectionCss}
      spaceY={{ base: '4', lg: '6' }}
    >
      <FilterTableEstablishment
        opening={search.opening}
        status={search.status}
        startTransition={startTransition}
      />

      {isPendingPagination && <Loader h="28" message="Carregando dados..." />}

      {!isPendingPagination && hasSearchEstablishmentsEmpty && (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <StoreIcon />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>
                Nenhum estabelecimento encontrado
              </EmptyState.Title>
              <EmptyState.Description>
                A busca não retornou nenhum estabelecimento.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}

      {!isPendingPagination && !hasSearchEstablishmentsEmpty && (
        <TableEstablishments establishments={visibleEstablishments} />
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        flexWrap="wrap"
        gap="3"
        w="full"
      >
        <Flex flexDir={{ base: 'column', md: 'row' }} align="center" gap="2">
          <PaginationTable
            count={establishments.length}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePageChange}
          />

          <SelectPageSize
            pages={[4, 24, 48]}
            search={{
              page: search?.page ?? 1,
              pageSize: search?.page_size ?? 4,
            }}
          />
        </Flex>

        <Box
          textAlign={{ base: 'center', md: 'right' }}
          mt={{ base: '2', md: '0' }}
        >
          <Text fontSize="sm" color="gray.400">
            {`Exibindo ${visibleEstablishments.length} de ${establishments.length} estabelecimentos`}
          </Text>
        </Box>
      </Flex>
    </Card.Root>
  )
}

export default TableEstablishmentsPage
