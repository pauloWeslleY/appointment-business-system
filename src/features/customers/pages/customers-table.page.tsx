import {
  Box,
  Flex,
  For,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

import PaginationTable from '@/components/layout/pagination-table'
import Loader from '@/components/loader'
import { Status } from '@/components/ui/status'
import { mapGenderLabel } from '@/shared/constants/map-label-gender-customer'
import { usePagination } from '@/shared/hooks/use-pagination'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

import MenuActionsTableCustomers from '../components/menu-actions-table-customer'
import type { CustomerApiResponse } from '../types/customer-response.api.type'

interface CustomerTableProps {
  customers: CustomerApiResponse[]
  total: number
}

const CustomersTable = ({ customers, total }: CustomerTableProps) => {
  const {
    pagination,
    isPendingPagination,
    loadTablePagination,
    handlePaginationChange,
  } = usePagination(customers, total)

  const formattedPhoneCustomer = (phones: string[]) => {
    if (!phones || phones.length === 0) return 'Não informado'
    return phones.map(formattedPhone)[0]
  }

  if (total === 0) {
    return (
      <Stack
        direction={{ base: 'column' }}
        w="full"
        align="center"
        justify="center"
      >
        <Text color="gray.500">Nenhum cliente encontrado.</Text>
      </Stack>
    )
  }

  return (
    <Stack direction={{ base: 'column' }} w="full">
      {isPendingPagination && <Loader h="28" message="Carregando dados..." />}

      {!isPendingPagination && (
        <For each={loadTablePagination}>
          {(row, index) => (
            <SimpleGrid
              key={row.id}
              columns={{ base: 1, md: 2, xl: 8 }}
              gap="3"
              w="full"
              p="3"
              alignItems="start"
              bg={{ _light: 'white', _dark: 'transparent' }}
              borderBottomWidth={
                index === loadTablePagination.length - 1 ? '0' : '1px'
              }
              borderColor="border.muted"
            >
              {[
                { label: 'Nome', value: row.name },
                { label: 'E-mail', value: row.email },
                {
                  label: 'Sexo',
                  value: row.gender
                    ? (mapGenderLabel[row.gender] ?? row.gender)
                    : 'Não informado',
                },
                {
                  label: 'Celulares',
                  value: formattedPhoneCustomer(row.phones),
                },
                {
                  label: 'Ativos',
                  value: (
                    <Status value={row.status ? 'success' : 'error'}>
                      {row.status ? 'Ativo' : 'Inativo'}
                    </Status>
                  ),
                },
                {
                  label: 'Data de Nasc.',
                  value: formattedDateAndHours(row.birthDate),
                },
              ].map(({ label, value }) => (
                <Box
                  key={label}
                  minW="0"
                  gridColumn={{ xl: label === 'E-mail' ? 'span 2' : undefined }}
                >
                  <Text fontSize="xs" color="fg.muted" mb="1">
                    {label}
                  </Text>
                  <Box overflowWrap="anywhere">{value}</Box>
                </Box>
              ))}

              <Flex justify={{ xl: 'flex-end' }}>
                <MenuActionsTableCustomers customer={row} />
              </Flex>
            </SimpleGrid>
          )}
        </For>
      )}

      <HStack justify="space-between" w="full" flexWrap="wrap">
        <PaginationTable
          count={total}
          pageSize={pagination.page_size}
          page={pagination.page}
          onPageChange={handlePaginationChange}
        />

        <Box>
          <Text fontSize="sm" color="gray.400">
            {`Exibindo ${loadTablePagination.length} de ${total} clientes`}
          </Text>
        </Box>
      </HStack>
    </Stack>
  )
}

export default CustomersTable
