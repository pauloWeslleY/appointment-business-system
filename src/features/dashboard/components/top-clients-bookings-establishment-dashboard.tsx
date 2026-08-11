'use client'

import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  Icon,
  Progress,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
import { User2Icon, UsersRound } from 'lucide-react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useGetTopClientsBookingsEstablishmentDashboard } from '../hooks/use-get-top-clients-bookings-establishment-dashboard'

interface TopClientsBookingsEstablishmentDashboardProps {
  from: string
  to: string
}

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const TopClientsBookingsEstablishmentDashboard = ({
  from,
  to,
}: TopClientsBookingsEstablishmentDashboardProps) => {
  const establishment = dashboardSlugRoute.useLoaderData()
  const establishmentId = establishment.id

  const {
    data: topClientsBookingsEstablishmentDashboard,
    error: errorTopClientsBookingsEstablishmentDashboard,
    isLoading: isLoadingTopClientsBookingsEstablishmentDashboard,
  } = useGetTopClientsBookingsEstablishmentDashboard({
    establishmentId,
    from,
    to,
  })
  const maxBookings = Math.max(
    ...(topClientsBookingsEstablishmentDashboard ?? []).map(
      (i) => i.totalBookings,
    ),
  )

  if (isLoadingTopClientsBookingsEstablishmentDashboard) {
    return (
      <Stack gap="2" w="full">
        <Skeleton
          height="400px"
          rounded="xl"
          bg={{ base: 'gray.300', _dark: 'gray.700/50' }}
        />
      </Stack>
    )
  }

  if (errorTopClientsBookingsEstablishmentDashboard) {
    return (
      <Alert.Root w="full" variant="subtle" status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro ao carregar os dados do dashboard</Alert.Title>
          <Alert.Description>
            {errorTopClientsBookingsEstablishmentDashboard.message}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Card.Root variant="outline" css={cardSectionCss} p="0">
      <Card.Header
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <Flex align="center" gap="3">
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
              as={UsersRound}
              boxSize="4"
              color={{
                base: `${colorDefaultTheme}.600`,
                _dark: `${colorDefaultTheme}.400`,
              }}
            />
          </Flex>
          <Card.Title fontSize="md">Clientes</Card.Title>
        </Flex>

        <Button
          asChild
          size="xs"
          variant="surface"
          rounded="lg"
          colorPalette={colorDefaultTheme}
        >
          <Link
            to="/dashboard/$slug/customers"
            params={{ slug: establishment.slug }}
          >
            Ver todos
          </Link>
        </Button>
      </Card.Header>
      <Card.Body>
        <Box spaceY="6">
          {topClientsBookingsEstablishmentDashboard?.length === 0 && (
            <Text textAlign="center" color="gray.focusRing">
              Nenhum cliente encontrado.
            </Text>
          )}

          <For each={topClientsBookingsEstablishmentDashboard ?? []}>
            {(topClients, index) => {
              const progressValue =
                (topClients.totalBookings / maxBookings) * 100

              return (
                <Stack
                  key={topClients.name + index}
                  direction="row"
                  align="center"
                  gap="4"
                >
                  <Flex
                    rounded="lg"
                    boxSize="10"
                    align="center"
                    justify="center"
                    bg="blue.600/10"
                  >
                    <Icon as={User2Icon} boxSize="5" />
                  </Flex>

                  <VStack align="center" w="full">
                    <Flex w="full" justify="space-between">
                      <Text fontSize="sm">{topClients.name}</Text>

                      <Box textAlign="right">
                        <Text
                          as="span"
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.focusRing"
                        >
                          {topClients.totalBookings} agend.
                        </Text>
                      </Box>
                    </Flex>

                    <Progress.Root
                      w="full"
                      variant="subtle"
                      colorPalette={colorDefaultTheme}
                      defaultValue={progressValue}
                    >
                      <Progress.Track rounded="lg">
                        <Progress.Range />
                      </Progress.Track>
                      <Progress.Label />
                      <Progress.ValueText />
                    </Progress.Root>
                  </VStack>
                </Stack>
              )
            }}
          </For>
        </Box>
      </Card.Body>
    </Card.Root>
  )
}

export default TopClientsBookingsEstablishmentDashboard
