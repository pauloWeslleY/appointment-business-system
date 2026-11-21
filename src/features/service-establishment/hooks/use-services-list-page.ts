import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'

const servicesRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/services/',
)

export function useServicesListPage(
  services: ListServicesEstablishmentModel[],
  totalServices: number,
) {
  const [isChangingServicesPage, startServicesPageTransition] = useTransition()
  const [servicesPagination, setServicesPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(12).withOptions({
        clearOnDefault: false,
      }),
    },
    { shallow: true },
  )
  const servicesSearch = servicesRoute.useSearch()

  const hasServices = totalServices > 0
  const visibleServicesCountLabel = `Exibindo ${services.length} de ${totalServices} serviços`

  const changeServicesPage = (
    pageChangeDetails: PaginationPageChangeDetails,
  ) => {
    startServicesPageTransition(() => {
      setServicesPagination({
        page: pageChangeDetails.page,
        page_size: pageChangeDetails.pageSize,
      })
    })
  }

  return {
    servicesPagination,
    servicesSearch,
    hasServices,
    isChangingServicesPage,
    visibleServicesCountLabel,
    changeServicesPage,
  }
}
