import { useQuery } from '@tanstack/react-query'

import { customersQueryKeys } from '../queries/customers-query-key'
import { getCustomersService } from '../services/customer.services'

export function useGetAllCustomersByEstablishment(establishmentId?: string) {
  return useQuery({
    queryKey: customersQueryKeys.establishment(establishmentId),
    queryFn: () => getCustomersService(establishmentId),
    enabled: !!establishmentId,
  })
}
