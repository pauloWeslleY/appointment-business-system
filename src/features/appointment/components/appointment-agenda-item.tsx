import {
  Badge,
  Button,
  For,
  // Flex,
  Grid,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Check, SmartphoneIcon, UserCircle2Icon } from 'lucide-react'

import { useAppointmentAgendaItem } from '../hooks/use-appointment-agenda-item'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import MenuCardAppointment from './menu-card-appointment'

interface AppointmentAgendaItemProps {
  appointment: GetAppointmentByEstablishmentModel
}

const AppointmentAgendaItem = ({ appointment }: AppointmentAgendaItemProps) => {
  const {
    appointmentStatusAction,
    appointmentStatusColor,
    appointmentStartTime,
    appointmentDuration,
    detailedCustomer,
    detailedProfessional,
    detailedServiceAppointment,
    isUpdatingAppointmentStatus,
    applyAppointmentStatusAction,
  } = useAppointmentAgendaItem(appointment)

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
          {appointmentDuration}
        </Text>
      </Stack>

      <SimpleGrid
        flex="1"
        columns={{ base: 1, md: detailedProfessional ? 4 : 3 }}
        alignItems="center"
        gap="0"
      >
        <div>
          <Text
            truncate
            fontWeight="semibold"
            color={{ _light: 'sea.700', _dark: 'sea.200' }}
          >
            {detailedServiceAppointment?.name ?? appointment.serviceName}
          </Text>
          <Badge size="sm" rounded="md" variant="outline" colorPalette="gray">
            {detailedServiceAppointment?.price}
          </Badge>
        </div>

        <div>
          <For
            each={[
              {
                icon: UserCircle2Icon,
                name: detailedCustomer?.name ?? appointment.customerName,
                field: 'name',
              },
              {
                icon: SmartphoneIcon,
                name: detailedCustomer?.phoneNumber ?? 'N/A',
                field: 'phoneNumber',
              },
            ]}
          >
            {(customer) => (
              <HStack gap="2">
                <Icon
                  as={customer.icon}
                  boxSize="4"
                  color={{ _light: 'primary.700', _dark: 'primary.300' }}
                />
                <Text
                  fontWeight="medium"
                  truncate
                  color={
                    customer.field === 'name'
                      ? { _light: 'sea.700', _dark: 'sea.200' }
                      : { _light: 'gray.400', _dark: 'gray.500/70' }
                  }
                >
                  {customer.name}
                </Text>
              </HStack>
            )}
          </For>
        </div>

        {detailedProfessional && (
          <Text
            css={{
              '& strong': {
                letterSpacing: 'wider',
                fontWeight: 'medium',
                color: { _light: 'sea.700', _dark: 'sea.200' },
              },
            }}
          >
            <strong>Profissional(a)</strong>
            <Text
              as="span"
              display="block"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wider"
              color={{ _light: 'navy.700', _dark: 'navy.200' }}
            >
              {detailedProfessional.name ?? 'N/A'}
            </Text>
          </Text>
        )}

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
