import { Box, Button, Flex, HStack, RadioCard } from '@chakra-ui/react'

import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeBookingColor } from '../constants/get-badge-booking-color'
import { useUpdateStatusBookingForm } from '../hooks/use-update-status-booking-form'
import type { BookingStatusType } from '../types/booking-status.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'
import { loadSelectStatusBooking } from '../utils/select-booking'

interface FormUpdateStatusBookingProps {
  booking: GetBookingByEstablishmentModel
}

const FormUpdateStatusBooking = ({ booking }: FormUpdateStatusBookingProps) => {
  const {
    statusBookingValue,
    onChangeSelectStatusBooking,
    onSubmitUpdateStatusBooking,
    isPendingUpdateStatusBooking,
  } = useUpdateStatusBookingForm(booking)

  return (
    <Flex
      align="center"
      gap="6"
      css={cardCss}
      borderWidth="1px"
      bg={{ base: 'tertiary.200', _dark: 'secondary.900/20' }}
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
          loading={isPendingUpdateStatusBooking}
          onClick={onSubmitUpdateStatusBooking}
        >
          Atualizar status
        </Button>
      </Box>
    </Flex>
  )
}

export default FormUpdateStatusBooking
