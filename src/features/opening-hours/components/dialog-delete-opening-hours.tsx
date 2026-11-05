import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'

import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { contentCss } from '@/theme/styles/global-styles'

import { useDeleteOpeningHours } from '../hooks/use-delete-opening-hours'
import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'

interface DialogDeleteOpeningHoursProps {
  openingHours: EstablishmentOpeningHoursItemApiResponse | null
  establishmentId: string
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogDeleteOpeningHours = ({
  openingHours,
  establishmentId,
  open,
  onOpen,
}: DialogDeleteOpeningHoursProps) => {
  const { handleDeleteOpeningHours, isPendingDeleteOpeningHours } =
    useDeleteOpeningHours(establishmentId, () => onOpen(false))

  const dayLabel = openingHours ? weekDaysLabels[openingHours.day] : ''
  const interval = openingHours?.intervals[0]

  return (
    <Dialog.Root
      size="sm"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
      role="alertdialog"
      motionPreset="slide-in-bottom"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Excluir horário de funcionamento</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body spaceY="2">
              <Text
                css={{
                  '& strong': {
                    color: { _light: 'sea.500', _dark: 'sea.600' },
                  },
                }}
              >
                Horário: <strong>{dayLabel}</strong>
                {interval && (
                  <strong>{` · ${interval.open} - ${interval.close}`}</strong>
                )}
              </Text>

              <p>
                Tem certeza que deseja excluir este horário? Esta ação não pode
                ser desfeita.
              </p>
            </Dialog.Body>

            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="brand"
                  variant="outline"
                  rounded="lg"
                  size="sm"
                  disabled={isPendingDeleteOpeningHours}
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>

              <Button
                colorPalette="red"
                variant="surface"
                rounded="lg"
                size="sm"
                loading={isPendingDeleteOpeningHours}
                onClick={() => handleDeleteOpeningHours(openingHours?.id)}
              >
                Excluir
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogDeleteOpeningHours
