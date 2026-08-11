import { Alert, Card, Flex, Icon, Skeleton, Stack } from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { DollarSignIcon } from 'lucide-react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useGetRevenueEstablishmentDashboard } from '../hooks/use-get-revenue-establishment-dashboard'
import RevenueEstablishmentCharts from './revenue-establishment-charts'

interface RevenueEstablishmentDashboardProps {
  from: string
  to: string
}

const RevenueEstablishmentDashboard = (
  props: RevenueEstablishmentDashboardProps,
) => {
  const params = useParams({
    from: '/dashboard/$establishmentId/overview/',
  })

  const {
    data: revenueEstablishmentDashboard,
    error: errorRevenueEstablishmentDashboard,
    isLoading: isLoadingRevenueEstablishmentDashboard,
  } = useGetRevenueEstablishmentDashboard({
    establishmentId: params.establishmentId,
    from: props.from,
    to: props.to,
  })

  if (isLoadingRevenueEstablishmentDashboard) {
    return (
      <Stack gap="2" w="full">
        <Skeleton
          height="200px"
          rounded="xl"
          bg={{ base: 'gray.300', _dark: 'gray.700/50' }}
        />
      </Stack>
    )
  }

  return (
    <>
      {errorRevenueEstablishmentDashboard && (
        <Alert.Root w="full" variant="subtle" status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erro ao carregar os dados do dashboard</Alert.Title>
            <Alert.Description>
              {errorRevenueEstablishmentDashboard.message}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!errorRevenueEstablishmentDashboard && (
        <Card.Root variant="outline" css={cardSectionCss} p="0">
          <Card.Header
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="2"
          >
            <Flex
              bg={{
                base: `${colorDefaultTheme}.600/20`,
                _dark: `${colorDefaultTheme}.400/20`,
              }}
              boxSize="8"
              align="center"
              justify="center"
              rounded="full"
            >
              <Icon
                as={DollarSignIcon}
                boxSize="4"
                color={{
                  base: `${colorDefaultTheme}.600`,
                  _dark: `${colorDefaultTheme}.400`,
                }}
              />
            </Flex>

            <Card.Title fontSize="md">Faturamentos</Card.Title>
          </Card.Header>

          <Card.Body>
            <RevenueEstablishmentCharts
              revenue={revenueEstablishmentDashboard ?? []}
            />
          </Card.Body>
        </Card.Root>
      )}
    </>
  )
}

export default RevenueEstablishmentDashboard
