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

import { establishmentQueryKeys } from '../queries/establishment-query-key'
import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

const StatsEstablishments = () => {
  const queryClient = useQueryClient()
  const { data: organizationProfile } = useQuery(
    organizationProfileSummaryQueryOptions(),
  )
  const getEstablishmentsByOwner = queryClient.getQueryData<
    EstablishmentModel[]
  >(establishmentQueryKeys.organizationProfile(organizationProfile?.id))
  const breakPoints = useBreakpointValue({ base: 'horizontal', md: 'vertical' })

  const getStatInfoEstablishments = useMemo(() => {
    const totalEstablishments = getEstablishmentsByOwner?.length ?? 0
    const totalEstablishmentsOpening = getEstablishmentsByOwner?.filter(
      (establishment) =>
        validateOpeningHoursEstablishment(establishment).establishmentOpen,
    )

    return {
      total: totalEstablishments,
      totalOpening: totalEstablishmentsOpening?.length ?? 0,
      totalClosed:
        totalEstablishments - (totalEstablishmentsOpening?.length ?? 0),
    }
  }, [getEstablishmentsByOwner])

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
        <Stat.ValueText>{getStatInfoEstablishments.total}</Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation={breakPoints as SeparatorProps['orientation']}
        height={{ base: 'auto', lg: '14' }}
        width={{ base: 'full', lg: 'auto' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Stat.Label>Total de Estabelecimentos Abertos</Stat.Label>
        <Stat.ValueText>
          {getStatInfoEstablishments.totalOpening}
        </Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation={breakPoints as SeparatorProps['orientation']}
        height={{ base: 'auto', lg: '14' }}
        width={{ base: 'full', lg: 'auto' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
        flexDir={{ base: 'row', md: 'column' }}
      >
        <Stat.Label>Total de Estabelecimentos Fechados</Stat.Label>
        <Stat.ValueText>{getStatInfoEstablishments.totalClosed}</Stat.ValueText>
      </Stat.Root>
    </Card.Root>
  )
}

export default StatsEstablishments
