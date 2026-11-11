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
import { createFileRoute } from '@tanstack/react-router'
import { Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterCustomerSex from '@/features/customers/components/filter-customer-sex'
import FilterCustomerStatus from '@/features/customers/components/filter-customer-status'
import SidebarCreateCustomer from '@/features/customers/components/sidebar-create-customer'
import StatInfoCustomers from '@/features/customers/components/stat-info-customers'
import { useCustomersPage } from '@/features/customers/hooks/use-customers-page'
import CustomersTable from '@/features/customers/pages/customers-table.page'
import { CustomerSearchSchema } from '@/features/customers/schemas/customer-search.schema'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/customers/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.CUSTOMER,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: CustomerSearchSchema,
  component: CustomersPage,
  head: () => ({
    meta: [
      {
        title: 'Clientes | Agendros',
      },
    ],
  }),
})

function CustomersPage() {
  const {
    customers: getCustomers,
    total,
    summary,
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

      <Box spaceY="4">
        <Flex align="center" gap="2" flexWrap="wrap">
          <SearchPage resetPagination />
          <FilterCustomerStatus />
          <FilterCustomerSex />
        </Flex>

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
            {summary && <StatInfoCustomers summary={summary} />}

            <Card.Root variant="outline" css={cardSectionCss}>
              <CustomersTable customers={getCustomers ?? []} total={total} />
            </Card.Root>
          </Box>
        )}
      </Box>
    </Box>
  )
}
