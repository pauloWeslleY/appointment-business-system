import {
  Avatar,
  Badge,
  Button,
  // Flex,
  Grid,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouteContext } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import { professionalDetailsQueryOptions } from '@/features/professionals/queries/professionals.query-options'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import {
  appointmentDurationInMinutes,
  appointmentLocalDate,
} from '../helpers/appointment-date'
import { useAppointmentStatusAction } from '../hooks/use-appointment-status-action'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import MenuCardAppointment from './menu-card-appointment'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

interface AppointmentAgendaItemProps {
  appointment: GetAppointmentByEstablishmentModel
}

const AppointmentAgendaItem = ({ appointment }: AppointmentAgendaItemProps) => {
  const { session } = useRouteContext({
    from: '/_app/_authenticated/dashboard/$slug',
  })
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: detailedProfessional } = useQuery(
    professionalDetailsQueryOptions(
      appointment.professionalId ?? undefined,
      session.user.id,
      establishment.organizationId,
    ),
  )
  const {
    appointmentStatusAction,
    isUpdatingAppointmentStatus,
    applyAppointmentStatusAction,
  } = useAppointmentStatusAction(appointment)
  const appointmentStatusColor = getBadgeAppointmentColor[appointment.status]
  const appointmentStartTime = appointmentLocalDate(
    appointment.startsAt,
    establishment.timezone,
  ).format('HH:mm')

  const appointmentDuration = appointmentDurationInMinutes(
    appointment.startsAt,
    appointment.endsAt,
  )

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '100px 1fr' }}
      as="li"
      py="4"
      px={{ base: '4', md: '6' }}
      gap={{ base: '3', md: '6' }}
      _notLast={{
        borderBottomWidth: '1px',
        borderColor: { _light: 'gray.300', _dark: 'secondary.500/20' },
      }}
    >
      <Stack
        gap="0"
        color={{ _light: 'gray.700', _dark: 'gray.200' }}
        pe={{ base: '0', md: '6' }}
        borderRightWidth={{ base: '0', md: '1px' }}
        borderColor={{ _light: 'gray.300', _dark: 'secondary.500/20' }}
      >
        <Text fontSize="xl" fontWeight="bold" lineHeight="short">
          {appointmentStartTime}
        </Text>
        <Text fontSize="sm" color={{ _light: 'gray.500', _dark: 'gray.400' }}>
          {appointmentDuration} min
        </Text>
      </Stack>

      <SimpleGrid
        flex="1"
        columns={{ base: 1, md: 3 }}
        alignItems="center"
        gap="0"
      >
        <div>
          <Text
            fontWeight="semibold"
            truncate
            color={{ _light: 'sea.700', _dark: 'sea.200' }}
          >
            {appointment.serviceName}
          </Text>

          {detailedProfessional && (
            <Text
              fontSize="xs"
              truncate
              css={{
                '& strong': {
                  letterSpacing: 'wider',
                  fontWeight: 'light',
                  color: { _light: 'gray.700', _dark: 'gray.400' },
                },
              }}
            >
              <strong>com Profissional(a){': '}</strong>
              <Text
                as="span"
                fontWeight="semibold"
                letterSpacing="wider"
                color={{ _light: 'sea.700', _dark: 'sea.200' }}
              >
                {detailedProfessional.professional.displayName}
              </Text>
            </Text>
          )}
        </div>

        <HStack gap="2" justify="center">
          <Avatar.Root size="sm" variant="subtle">
            <Avatar.Fallback name={appointment.customerName} />
          </Avatar.Root>
          <Text fontWeight="medium" truncate>
            {appointment.customerName}
          </Text>
        </HStack>

        <HStack
          justify="flex-end"
          gap="3"
          flexShrink="0"
          ms={{ base: 'auto', md: '0' }}
        >
          <Badge
            px="3"
            size="sm"
            rounded="lg"
            variant="subtle"
            colorPalette={appointmentStatusColor}
          >
            {appointmentStatusLabel[appointment.status]}
          </Badge>

          {appointmentStatusAction && (
            <Button
              colorPalette={appointmentStatusAction.color}
              size="2xs"
              variant="ghost"
              rounded="lg"
              minW="28"
              loading={isUpdatingAppointmentStatus}
              onClick={applyAppointmentStatusAction}
            >
              <Icon as={Check} boxSize="4" />
              {appointmentStatusAction.label}
            </Button>
          )}

          <MenuCardAppointment appointment={appointment} />
        </HStack>
      </SimpleGrid>
    </Grid>
  )
}

export default AppointmentAgendaItem
