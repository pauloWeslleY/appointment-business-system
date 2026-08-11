import { Alert, Card, Flex, Icon, Skeleton, Stack } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useGetDailyBookingsEstablishmentDashboard } from '../hooks/use-get-daily-bookings-establishment-dashboard'
import TableDailyBookingsEstablishmentDashboard from './table-daily-bookings-establishment-dashboard'

interface DailyBookingsEstablishmentDashboardProps {
  from: string
  to: string
}

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const DailyBookingsEstablishmentDashboard = (
  props: DailyBookingsEstablishmentDashboardProps,
) => {
  const establishment = dashboardSlugRoute.useLoaderData()

  const {
    data: dailyBookingsEstablishmentDashboard = [],
    error: errorDailyBookingsEstablishmentDashboard,
    isLoading: isLoadingDailyBookingsEstablishmentDashboard,
  } = useGetDailyBookingsEstablishmentDashboard({
    establishmentId: establishment.id,
    from: props.from,
    to: props.to,
  })

  if (isLoadingDailyBookingsEstablishmentDashboard) {
    return (
      <Stack gap="2" w="full">
        <Skeleton
          height="300px"
          rounded="xl"
          bg={{ base: 'gray.300', _dark: 'gray.700/50' }}
        />
      </Stack>
    )
  }

  return (
    <>
      {errorDailyBookingsEstablishmentDashboard && (
        <Alert.Root w="full" variant="subtle" status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erro ao carregar os dados do dashboard</Alert.Title>
            <Alert.Description>
              {errorDailyBookingsEstablishmentDashboard.message}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!errorDailyBookingsEstablishmentDashboard && (
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
                as={CalendarIcon}
                boxSize="4"
                color={{
                  base: `${colorDefaultTheme}.600`,
                  _dark: `${colorDefaultTheme}.400`,
                }}
              />
            </Flex>
            <Card.Title fontSize="md">Agendamentos do dia</Card.Title>
          </Card.Header>

          <Card.Body>
            <TableDailyBookingsEstablishmentDashboard
              bookings={dailyBookingsEstablishmentDashboard}
            />
          </Card.Body>
        </Card.Root>
      )}
    </>
  )
}

export default DailyBookingsEstablishmentDashboard
