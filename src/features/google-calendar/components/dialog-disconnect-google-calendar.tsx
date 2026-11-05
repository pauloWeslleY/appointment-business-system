import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useDialogDisconnectGoogle } from '../hooks/use-dialog-disconnect-google'

interface DialogDisconnectGoogleCalendarProps {
  isOpen: boolean
  onOpen: (open: boolean) => void
}

const DialogDisconnectGoogleCalendar = ({
  isOpen,
  onOpen,
}: DialogDisconnectGoogleCalendarProps) => {
  const { handleDisconnectGoogleCalendar, isDisconnectGoogleCalendarPending } =
    useDialogDisconnectGoogle(onOpen)

  return (
    <Dialog.Root
      size="sm"
      open={isOpen}
      onOpenChange={(e) => onOpen(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content
            {...contentCss}
          >
            <Dialog.Header>
              <Dialog.Title>Desconectar do Google Calendário</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Tem certeza de que deseja desconectar o Google Calendário deste
                estabelecimento?{' '}
              </p>
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  colorPalette="red"
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                rounded="lg"
                colorPalette="brand"
                loading={isDisconnectGoogleCalendarPending}
                onClick={handleDisconnectGoogleCalendar}
              >
                Desconectar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="xl" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogDisconnectGoogleCalendar
