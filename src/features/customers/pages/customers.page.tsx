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
} from '@chakra-ui/react'
import { Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterCustomerSex from '@/features/customers/components/filter-customer-sex'
import FilterCustomerStatus from '@/features/customers/components/filter-customer-status'
import SidebarCreateCustomer from '@/features/customers/components/sidebar-create-customer'
import StatInfoCustomers from '@/features/customers/components/stat-info-customers'
import CustomersTable from '@/features/customers/pages/customers-table.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useCustomersPage } from '../hooks/use-customers-page'

function CustomersPage() {
  const {
    customers: getCustomers,
    customersError: errorCustomers,
    isLoadingCustomers,
    retryCustomers,
    scopeKey,
  } = useCustomersPage()

  return (
    <Box key={scopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={Users2} />
          <Header.Title>Clientes</Header.Title>
        </HStack>

        <SidebarCreateCustomer />
      </Header.Root>

      {errorCustomers && (
        <Alert.Root status="error" rounded="lg">
          <Alert.Indicator />
          <Alert.Title>Error: {errorCustomers?.message}</Alert.Title>
          <Button rounded="lg" onClick={retryCustomers} size="sm">
            Tentar novamente
          </Button>
        </Alert.Root>
      )}

      {isLoadingCustomers && (
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

      {!isLoadingCustomers && !errorCustomers && (
        <Box spaceY="4">
          <StatInfoCustomers />

          <Flex align="center" gap="2" flexWrap="wrap">
            <SearchPage />
            <FilterCustomerStatus />
            <FilterCustomerSex />
          </Flex>

          <Card.Root variant="outline" css={cardSectionCss}>
            <CustomersTable customers={getCustomers ?? []} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}

export default CustomersPage
