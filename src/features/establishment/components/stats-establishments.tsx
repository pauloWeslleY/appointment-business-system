import { Card, Separator, Stat } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { establishmentQueryKeys } from '../queries/establishment-query-key'
import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

const StatsEstablishments = () => {
  const queryClient = useQueryClient()
  const { data: owner } = useGetOwnerById()
  const getEstablishmentsByOwner = queryClient.getQueryData<
    EstablishmentModel[]
  >(establishmentQueryKeys.owner(owner?.id))

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
      gap="4"
      flexDir={{ base: 'column', md: 'row' }}
      alignItems="center"
    >
      <Stat.Root>
        <Stat.Label>Total de Estabelecimentos</Stat.Label>
        <Stat.ValueText>{getStatInfoEstablishments.total}</Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation="vertical"
        height="14"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root>
        <Stat.Label>Total de Estabelecimentos Abertos</Stat.Label>
        <Stat.ValueText>
          {getStatInfoEstablishments.totalOpening}
        </Stat.ValueText>
      </Stat.Root>

      <Separator
        orientation="vertical"
        height="14"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <Stat.Root>
        <Stat.Label>Total de Estabelecimentos Fechados</Stat.Label>
        <Stat.ValueText>{getStatInfoEstablishments.totalClosed}</Stat.ValueText>
      </Stat.Root>
    </Card.Root>
  )
}

export default StatsEstablishments
