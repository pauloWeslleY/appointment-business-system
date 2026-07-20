import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$establishmentId/customers/')({
  component: CustomersPage,
})

function CustomersPage() {
  return <div>Hello "/dashboard/$establishmentId/customers/"!</div>
}
