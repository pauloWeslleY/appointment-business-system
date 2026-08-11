import {
  Box,
  chakra,
  Flex,
  For,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import { Status } from '@/components/ui/status'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { mapGenderLabel } from '@/shared/constants/map-label-gender-customer'
import { usePagination } from '@/shared/hooks/use-pagination'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

import MenuActionsTableCustomers from '../components/menu-actions-table-collaborator'
import type { CustomerModel } from '../types/customer.model'

const customersTableHeaders = [
  'Nome',
  'E-mail',
  'Sexo',
  'Celulares',
  'Ativos',
  'Data de Nasc.',
]

interface CustomerTableProps {
  customers: CustomerModel[]
}

const CustomersTable = ({ customers }: CustomerTableProps) => {
  const search = useSearch({ from: '/dashboard/$slug/customers/' })

  const loadCustomers = useMemo(() => {
    const data = customers.map((customer) => ({
      ...customer,
      name: customer.name,
      email: customer.email,
      birthDate: formattedDateAndHours(customer.birthDate),
    }))

    const query = search.q?.toLowerCase()

    const rows = data.filter((customer) => {
      const queryStringName = query
        ? customer.name.toLowerCase().includes(query)
        : true

      const queryStringEmail = query
        ? customer.email.toLowerCase().includes(query)
        : true

      const queryString = queryStringName || queryStringEmail
      const querySex = search.sex ? search.sex === customer.gender : true
      const queryStatus = search.status
        ? search.status === (customer.active ? 'active' : 'inactive')
        : true

      return queryString && querySex && queryStatus
    })
    return rows
  }, [customers, search.q, search.sex, search.status])

  const {
    pagination,
    isPendingPagination,
    loadTablePagination,
    handlePaginationChange,
  } = usePagination(loadCustomers)

  const formattedPhoneCustomer = (phones: string[]) =>
    phones.map(formattedPhone)[0]

  if (customers.length === 0) {
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
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <For each={loadTablePagination}>
          {(row, index) => (
            <Flex key={index} direction={{ base: 'row', md: 'column' }}>
              <SimpleGrid
                columns={{ base: 1, md: customersTableHeaders.length + 2 }}
                gap="3"
                w={{ base: 120, md: 'full' }}
                bg={{ base: 'gray.100', _dark: 'gray.950/40' }}
                color="gray.500"
                py={{ base: 1, md: 2 }}
                px={{ base: 2, md: 6, xl: 2 }}
                textTransform="uppercase"
                fontSize="md"
                fontWeight="hairline"
                roundedTop={index === 0 ? 'xl' : undefined}
              >
                <For each={customersTableHeaders}>
                  {(header) => (
                    <Text
                      key={header}
                      as="span"
                      gridColumn={{
                        md: header === 'E-mail' ? 'span 2' : undefined,
                      }}
                    >
                      {header}
                    </Text>
                  )}
                </For>
                <chakra.span textAlign={{ md: 'right' }}>Ações</chakra.span>
              </SimpleGrid>

              <SimpleGrid
                columns={{ base: 1, md: customersTableHeaders.length + 2 }}
                gap="3"
                w="full"
                py="2"
                alignItems="center"
                px={{ base: '2', md: '4', xl: '2' }}
                fontWeight="hairline"
                bg={{ base: 'white', _dark: 'transparent' }}
                roundedBottom={
                  index === loadTablePagination.length - 1 ? 'xl' : undefined
                }
              >
                <span>{row.name}</span>
                <Text as="span" gridColumn={{ md: 'span 2' }}>
                  {row.email}
                </Text>
                <span>{mapGenderLabel[row.gender] ?? row.gender}</span>
                <Text as="span" truncate>
                  {formattedPhoneCustomer(row.phones)}
                </Text>
                <span>
                  <Status value={row.active ? 'success' : 'error'}>
                    {row.active ? 'Ativo' : 'Inativo'}
                  </Status>
                </span>
                <span>{row.birthDate}</span>

                <Flex justify={{ md: 'end' }}>
                  <MenuActionsTableCustomers customer={row} />
                </Flex>
              </SimpleGrid>
            </Flex>
          )}
        </For>
      )}

      <HStack justify="space-between" w="full">
        <PaginationTable
          count={customers.length}
          pageSize={pagination.page_size}
          page={pagination.page}
          onPageChange={handlePaginationChange}
        />

        <Box>
          <Text fontSize="sm" color="gray.400">
            {`Exibindo ${loadTablePagination.length} de ${loadCustomers.length} clientes`}
          </Text>
        </Box>
      </HStack>
    </Stack>
  )
}

export default CustomersTable
