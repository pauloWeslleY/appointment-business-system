import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useDialogCancelInvite } from '../hooks/use-dialog-cancel-invite'
import type { InviteProps } from '../types/invitation.model.api'

interface DialogCancelInviteProps {
  invite: InviteProps | null
  open: boolean
  onOpen(open: boolean): void
}

const DialogCancelInvite = ({
  invite,
  open,
  onOpen,
}: DialogCancelInviteProps) => {
  const { isCancellingInvite, handleCancelInvite } =
    useDialogCancelInvite(onOpen)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
      role="alertdialog"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Cancelar convite</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="2">
              <Text
                css={{
                  '& strong': {
                    color: { _light: 'sea.500', _dark: 'sea.600' },
                  },
                }}
              >
                Convite para: <strong>{invite?.email ?? 'usuário'}</strong>
              </Text>

              <p>
                Tem certeza que deseja cancelar este convite? Esta ação não pode
                ser desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="brand"
                  variant="outline"
                  rounded="lg"
                  size="sm"
                  onClick={() => onOpen(false)}
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                variant="surface"
                rounded="lg"
                size="sm"
                loading={isCancellingInvite}
                onClick={() => handleCancelInvite(invite?.id)}
              >
                Cancelar
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

export default DialogCancelInvite
