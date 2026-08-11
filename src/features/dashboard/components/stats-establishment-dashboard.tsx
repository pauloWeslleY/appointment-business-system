import {
  Alert,
  Box,
  Card,
  Flex,
  For,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import {
  BriefcaseBusinessIcon,
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
} from 'lucide-react'
import { useMemo } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import { useGetStatsEstablishmentDashboard } from '../hooks/use-get-stats-establishment-dashboard'

interface StatsEstablishmentDashboardProps {
  from: string
  to: string
}

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const StatsEstablishmentDashboard = (
  props: StatsEstablishmentDashboardProps,
) => {
  const establishment = dashboardSlugRoute.useLoaderData()

  const {
    data: statsEstablishmentDashboard,
    error: errorStatsEstablishmentDashboard,
    isLoading: isLoadingStatsEstablishmentDashboard,
  } = useGetStatsEstablishmentDashboard({
    establishmentId: establishment.id,
    from: props.from,
    to: props.to,
  })

  const getStatsEstablishmentDashboard = useMemo(
    () => [
      {
        title: 'Faturamento',
        value: formatCurrencyInCents(
          statsEstablishmentDashboard?.totalRevenue ?? 0,
        ),
        icon: DollarSignIcon,
      },
      {
        title: 'Agendamentos',
        value: (statsEstablishmentDashboard?.totalBookings ?? 0).toString(),
        icon: CalendarIcon,
      },
      {
        title: 'Clientes',
        value: (statsEstablishmentDashboard?.totalClients ?? 0).toString(),
        icon: UserIcon,
      },
      {
        title: 'Serviços',
        value: (statsEstablishmentDashboard?.totalServices ?? 0).toString(),
        icon: BriefcaseBusinessIcon,
      },
    ],
    [statsEstablishmentDashboard],
  )

  if (isLoadingStatsEstablishmentDashboard) {
    return (
      <Stack gap="2" w="full">
        {getStatsEstablishmentDashboard.slice(0, 2).map((_, index) => (
          <Skeleton
            key={`stat-skeleton-${index}`}
            height="50px"
            rounded="xl"
            bg={{ base: 'gray.300', _dark: 'gray.700/50' }}
          />
        ))}
      </Stack>
    )
  }

  return (
    <Box w="full">
      {errorStatsEstablishmentDashboard && (
        <Alert.Root w="full" variant="subtle" status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erro ao carregar os dados do dashboard</Alert.Title>
            <Alert.Description>
              {errorStatsEstablishmentDashboard.message}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!errorStatsEstablishmentDashboard && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4" w="full">
          <For each={getStatsEstablishmentDashboard}>
            {(stat, index) => (
              <Card.Root
                key={`stat-${index}`}
                rounded="xl"
                shadow="xs"
                bg={{ base: 'primary.100/40', _dark: 'gray.950/40' }}
                outlineStyle="solid"
                outlineWidth="1px"
                outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                border="none"
                borderLeft="4px solid"
                borderColor={`${colorDefaultTheme}.500`}
              >
                <Card.Header
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap="2"
                  pb="2"
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
                      as={stat.icon}
                      boxSize="4"
                      color={{
                        base: `${colorDefaultTheme}.600`,
                        _dark: `${colorDefaultTheme}.400`,
                      }}
                    />
                  </Flex>

                  <Card.Title
                    color={{
                      base: `${colorDefaultTheme}.600`,
                      _dark: `${colorDefaultTheme}.400`,
                    }}
                    fontSize="lg"
                    fontWeight="medium"
                  >
                    {stat.title}
                  </Card.Title>
                </Card.Header>
                <Card.Body py="1.5">
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={{
                      base: `${colorDefaultTheme}.800/70`,
                      _dark: `${colorDefaultTheme}.300/50`,
                    }}
                  >
                    {stat.value}
                  </Text>
                </Card.Body>
              </Card.Root>
            )}
          </For>
        </SimpleGrid>
      )}
    </Box>
  )
}

export default StatsEstablishmentDashboard
