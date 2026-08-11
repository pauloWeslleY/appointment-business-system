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
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, useParams } from '@tanstack/react-router'
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

const TopServicesEstablishmentDashboard = ({
  from,
  to,
}: TopServicesEstablishmentDashboardProps) => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/overview/',
  })

  const {
    data: topServicesEstablishmentDashboard,
    error: errorTopServicesEstablishmentDashboard,
    isLoading: isLoadingTopServicesEstablishmentDashboard,
  } = useGetTopServicesEstablishmentDashboard({ establishmentId, from, to })

  if (isLoadingTopServicesEstablishmentDashboard) {
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
              base: `${colorDefaultTheme}.600/20`,
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
                base: `${colorDefaultTheme}.600`,
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
            to="/dashboard/$establishmentId/services"
            params={{ establishmentId }}
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
              <Flex key={service.id} align="center" justify="space-between">
                <HStack align="center" gap="4">
                  <Avatar.Root size="md">
                    <Avatar.Image
                      src={service.imageUrl || undefined}
                      alt={service.name}
                    />
                    <Avatar.Fallback
                      name={servicosImageFallback(service.name)}
                    />
                  </Avatar.Root>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      {service.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500" truncate w="2xs">
                      {service.description}
                    </Text>
                  </Box>
                </HStack>
                <Box textAlign="right">
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    {service.bookings} agend.
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
