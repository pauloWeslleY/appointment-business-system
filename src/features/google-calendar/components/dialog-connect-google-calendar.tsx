import { Button, Checkbox, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

import { useFormDialogConnectGoogle } from '../hooks/use-form-dialog-connect-google'

interface DialogConnectGoogleCalendarProps {
  isOpen: boolean
  onOpen: (open: boolean) => void
}

const DialogConnectGoogleCalendar = ({
  isOpen,
  onOpen,
}: DialogConnectGoogleCalendarProps) => {
  const {
    errors,
    control,
    handleConnectGoogle,
    isConnectGoogleCalendarPending,
  } = useFormDialogConnectGoogle(onOpen)

  return (
    <Dialog.Root
      size="md"
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
              <Dialog.Title>Conectar ao Google Calendar</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Controller
                control={control}
                name="inviteCustomers"
                render={({ field }) => (
                  <Field
                    invalid={Boolean(errors.inviteCustomers)}
                    errorText={errors.inviteCustomers?.message}
                  >
                    <Checkbox.Root
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control rounded="md" />
                      <Checkbox.Label>Convidar clientes</Checkbox.Label>
                    </Checkbox.Root>
                  </Field>
                )}
              />
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
                loading={isConnectGoogleCalendarPending}
                onClick={handleConnectGoogle}
              >
                Conectar com google
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

export default DialogConnectGoogleCalendar
