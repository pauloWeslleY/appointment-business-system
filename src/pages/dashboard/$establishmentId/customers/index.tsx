import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Users2 } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import SidebarCreateCustomer from '@/features/customers/components/sidebar-create-customer'
import CustomersTable from '@/features/customers/pages/customers-table.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/dashboard/$establishmentId/customers/')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: CustomersPage,
})

function CustomersPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={Users2} />
          <Header.Title>Clientes</Header.Title>
        </HStack>

        <SidebarCreateCustomer />
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <SearchPage />

        <CustomersTable />
      </Card.Root>
    </Box>
  )
}
