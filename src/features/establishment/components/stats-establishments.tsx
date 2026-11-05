import {
  Card,
  Separator,
  type SeparatorProps,
  Stat,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { establishmentQueryKeys } from '../queries/establishment.query-key'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

const StatsEstablishments = () => {
  const queryClient = useQueryClient()
  const { data: organizationProfile } = useQuery(
    organizationProfileSummaryQueryOptions(),
  )

  const establishmentsByOrganization = queryClient.getQueryData<
    EstablishmentOrganizationProfileApiResponse[]
  >(establishmentQueryKeys.organization(organizationProfile?.organizationId))
  const separatorOrientation = useBreakpointValue({
    base: 'horizontal',
    md: 'vertical',
  })

  const establishmentStats = useMemo(() => {
    const totalEstablishments = establishmentsByOrganization?.length ?? 0
    const openEstablishments = establishmentsByOrganization?.filter(
      (establishment) =>
        validateOpeningHoursEstablishment(establishment).establishmentOpen,
    )

    return {
      total: totalEstablishments,
      totalOpening: openEstablishments?.length ?? 0,
      totalClosed: totalEstablishments - (openEstablishments?.length ?? 0),
    }
  }, [establishmentsByOrganization])

  return (
    <Card.Root
      variant="outline"
      css={cardSectionCss}
      display="flex"
      gap={{ base: '2', md: '4' }}
      flexDir={{ base: 'column', md: 'row' }}
      alignItems="center"
    >
      <Stat.Root
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Stat.Label>Total de Estabelecimentos</Stat.Label>
        <Stat.ValueText>{establishmentStats.total}</Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation={separatorOrientation as SeparatorProps['orientation']}
        height={{ base: 'auto', md: '14' }}
        width={{ base: 'full', md: 'auto' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Stat.Label>Total de Estabelecimentos Abertos</Stat.Label>
        <Stat.ValueText>{establishmentStats.totalOpening}</Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation={separatorOrientation as SeparatorProps['orientation']}
        height={{ base: 'auto', md: '14' }}
        width={{ base: 'full', md: 'auto' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Stat.Label>Total de Estabelecimentos Fechados</Stat.Label>
        <Stat.ValueText>{establishmentStats.totalClosed}</Stat.ValueText>
      </Stat.Root>
    </Card.Root>
  )
}

export default StatsEstablishments
