import { Box, Button, Flex, HStack, RadioCard } from '@chakra-ui/react'

import { getBadgeBookingColor } from '../constants/get-badge-appointment-color'
import { useUpdateStatusAppointmentForm } from '../hooks/use-update-status-appointment-form'
import type { BookingStatusType } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import { loadSelectStatusBooking } from '../utils/select-booking'

interface FormUpdateStatusBookingProps {
  booking: GetAppointmentByEstablishmentModel
}

const FormUpdateStatusBooking = ({ booking }: FormUpdateStatusBookingProps) => {
  const {
    statusBookingValue,
    onChangeSelectStatusBooking,
    onSubmitUpdateStatusAppointment,
    isPendingUpdateStatusAppointment,
  } = useUpdateStatusAppointmentForm(booking)

  return (
    <Flex
      align="center"
      gap="6"
      shadow="xs"
      p="4"
      rounded="lg"
      bg={{ base: 'white', _dark: 'secondary.500/20' }}
      borderWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <RadioCard.Root
        value={statusBookingValue[0] as string}
        colorPalette={
          getBadgeBookingColor[statusBookingValue[0] as BookingStatusType]
        }
        onValueChange={(e) =>
          onChangeSelectStatusBooking(e.value as BookingStatusType)
        }
      >
        <RadioCard.Label>Selecione o status</RadioCard.Label>
        <HStack align="stretch">
          {loadSelectStatusBooking.map((bookingStatus, index) => (
            <RadioCard.Item
              key={index}
              value={bookingStatus.value as string}
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              rounded="lg"
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <RadioCard.ItemText>{bookingStatus.label}</RadioCard.ItemText>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>

      <Box mt="6">
        <Button
          size="xs"
          rounded="xl"
          colorPalette="cyan"
          variant="outline"
          loading={isPendingUpdateStatusAppointment}
          onClick={onSubmitUpdateStatusAppointment}
        >
          Atualizar status
        </Button>
      </Box>
    </Flex>
  )
}

export default FormUpdateStatusBooking
