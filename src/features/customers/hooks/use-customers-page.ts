import { getRouteApi } from '@tanstack/react-router'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { useGetAllCustomersByEstablishment } from './use-get-all-customers-by-establishment'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useCustomersPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
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
