'use client'

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Icon,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { getRouteApi, Link } from '@tanstack/react-router'
import { BriefcaseBusiness } from 'lucide-react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useGetTopServicesEstablishmentDashboard } from '../hooks/use-get-top-services-establishment-dashboard'

interface TopServicesEstablishmentDashboardProps {
  from: string
  to: string
}

const servicosImageFallback = (name: string) => {
  if (!name) return 'Serviços'
  const nameDoctor = name.split(' ').map((n) => n[0])
  return nameDoctor.join('').slice(0, 2)
}

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const TopServicesEstablishmentDashboard = ({
  from,
  to,
}: TopServicesEstablishmentDashboardProps) => {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const establishmentId = establishment.id

  const {
    data: topServicesEstablishmentDashboard,
    error: errorTopServicesEstablishmentDashboard,
    isLoading: isLoadingTopServicesEstablishmentDashboard,
  } = useGetTopServicesEstablishmentDashboard({ establishmentId, from, to })

  if (isLoadingTopServicesEstablishmentDashboard) {
    return (
      <Skeleton
        w="full"
        height="200px"
        rounded="xl"
        bg={{ _light: 'gray.300', _dark: 'gray.700/50' }}
      />
    )
  }

  if (errorTopServicesEstablishmentDashboard) {
    return (
      <Alert.Root w="full" variant="subtle" status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro ao carregar os dados do dashboard</Alert.Title>
          <Alert.Description>
            {errorTopServicesEstablishmentDashboard.message}
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
              _light: `${colorDefaultTheme}.600/20`,
              _dark: `${colorDefaultTheme}.400/20`,
            }}
            boxSize="8"
            align="center"
            justify="center"
            rounded="full"
          >
            <Icon
              as={BriefcaseBusiness}
              boxSize="4"
              color={{
                _light: `${colorDefaultTheme}.600`,
                _dark: `${colorDefaultTheme}.400`,
              }}
            />
          </Flex>
          <Card.Title fontSize="md">Serviços</Card.Title>
        </Flex>

        <Button
          asChild
          size="xs"
          variant="surface"
          rounded="lg"
          colorPalette={colorDefaultTheme}
        >
          <Link
            to="/dashboard/$slug/services"
            params={{ slug: establishment.slug }}
          >
            Ver todos
          </Link>
        </Button>
      </Card.Header>

      <Card.Body>
        <Box spaceY="6">
          {topServicesEstablishmentDashboard?.length === 0 && (
            <Text textAlign="center" color="gray.400">
              Nenhum serviço cadastrado.
            </Text>
          )}

          <For each={topServicesEstablishmentDashboard ?? []}>
            {(service) => (
              <Flex
                key={service.id}
                align="center"
                justify="space-between"
                gap="3"
                flexWrap="wrap"
              >
                <HStack align="center" gap="4" minW="0" flex="1">
                  <Avatar.Root size="md">
                    <Avatar.Image
                      src={service.imageUrl || undefined}
                      alt={service.name}
                    />
                    <Avatar.Fallback
                      name={servicosImageFallback(service.name)}
                    />
                  </Avatar.Root>

                  <Box minW="0">
                    <Text fontSize="sm" fontWeight="medium">
                      {service.name}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      overflowWrap="anywhere"
                    >
                      {service.description}
                    </Text>
                  </Box>
                </HStack>
                <Box textAlign="right">
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    {service.appointments} agend.
                  </Text>
                </Box>
              </Flex>
            )}
          </For>
        </Box>
      </Card.Body>
    </Card.Root>
  )
}

export default TopServicesEstablishmentDashboard
