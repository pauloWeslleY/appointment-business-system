import { createFileRoute } from '@tanstack/react-router'

import CustomersPage from '@/features/customers/pages/customers.page'
import { CustomerSearchSchema } from '@/features/customers/schemas/customer-search.schema'

export const Route = createFileRoute('/dashboard/$slug/customers/')({
  validateSearch: CustomerSearchSchema,
  component: CustomersPage,
})
