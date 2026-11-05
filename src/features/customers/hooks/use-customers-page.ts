import { getRouteApi } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

import { useGetAllCustomersByEstablishment } from './use-get-all-customers-by-establishment'

const dashboardRoute = getRouteApi('/dashboard/$slug')

export function useCustomersPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = authClient.useSession()
  const { data, error, isLoading, refetch } = useGetAllCustomersByEstablishment(
    establishment.id,
  )

  const retryCustomers = () => refetch()

  return {
    customers: data ?? [],
    customersError: error,
    isLoadingCustomers: isLoading,
    retryCustomers,
    scopeKey: `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`,
  }
}
