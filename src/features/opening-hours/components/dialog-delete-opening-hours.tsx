import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Skeleton,
  Text,
} from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useDeleteOpeningHours } from '../hooks/use-delete-opening-hours'

interface DialogDeleteOpeningHoursProps {
  openingHoursId: string
  open: boolean
  onOpen: (open: boolean) => void
  clearOpeningHoursId?: () => void
}

const DialogDeleteOpeningHours = ({
  openingHoursId,
  open,
  onOpen,
}: DialogDeleteOpeningHoursProps) => {
  const {
    openingHourDetails,
    // openingHoursErrorSummary,
    isLoadingOpeningHoursSummary,
    isPendingDeleteOpeningHours,
    handleDeleteOpeningHours,
  } = useDeleteOpeningHours(openingHoursId, () => onOpen(false))

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

            {isLoadingOpeningHoursSummary && (
              <Dialog.Body>
                <Skeleton
                  h="14"
                  w="full"
                  rounded="lg"
                  bg={{ _light: 'slate.100', _dark: 'slate.800/30' }}
                />
              </Dialog.Body>
            )}

            {!isLoadingOpeningHoursSummary && (
              <Dialog.Body spaceY="2">
                <Text
                  css={{
                    '& strong': {
                      color: { _light: 'sea.500', _dark: 'sea.600' },
                    },
                  }}
                >
                  Horário: <strong>{openingHourDetails}</strong>
                </Text>

                <p>
                  Tem certeza que deseja excluir este horário? Esta ação não
                  pode ser desfeita.
                </p>
              </Dialog.Body>
            )}

            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="brand"
                  variant="ghost"
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
                onClick={() => handleDeleteOpeningHours(openingHoursId)}
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
