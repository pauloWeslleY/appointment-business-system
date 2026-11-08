import { createListCollection, type ListCollection } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import { establishmentByOrganizationQueryOptions } from '../queries/establishment.query-options'

export function useSelectEstablishmentsByOrganization(organizationId?: string) {
  const slug = useParams({
    from: '/_app/_authenticated/dashboard/$slug',
    select: (params) => params.slug,
  })

  const navigate = useNavigate()
  const {
    data: establishments = [],
    error: errorEstablishments,
    isLoading: isLoadingEstablishments,
  } = useQuery({
    ...establishmentByOrganizationQueryOptions(organizationId),
    select: (data) =>
      (data ?? []).map((establishment) => ({
        id: establishment.id,
        name: establishment.name,
        slug: establishment.slug,
      })),
  })

  const {
    establishmentsByOrganizationSelected,
    loadSelectEstablishmentsByOrganization,
  } = useMemo<{
    loadSelectEstablishmentsByOrganization: ListCollection<{
      id: string
      name: string
      slug: string
    }>
    establishmentsByOrganizationSelected: string | null
  }>(() => {
    const loadSelectEstablishmentsByOrganization = createListCollection({
      items: establishments,
      itemToString: (establishment) => establishment.name,
      itemToValue: (establishment) => establishment.slug,
    })

    const selectedEstablishment =
      loadSelectEstablishmentsByOrganization.items.find(
        (establishment) => establishment.slug === slug,
      )

    const establishmentSelectedId = selectedEstablishment?.slug ?? null

    return {
      loadSelectEstablishmentsByOrganization,
      establishmentsByOrganizationSelected: establishmentSelectedId,
    }
  }, [establishments, slug])

  const onChangeSelectEstablishmentByOrganization = async (
    establishment: string[],
  ) => {
    if (establishment.length === 0) {
      return
    }

    navigate({
      to: '/dashboard/$slug/overview',
      params: { slug: establishment[0] },
      search: (prev) => ({ ...prev }),
    })
  }

  return {
    isLoadingEstablishments,
    errorEstablishments,
    establishmentsByOrganizationSelected,
    loadSelectEstablishmentsByOrganization,
    onChangeSelectEstablishmentByOrganization,
  }
}
