import {
  Badge,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Icon,
  Portal,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

import { useFormUpdateStatusServiceEstablishment } from '../hooks/use-form-update-status-service-establishment'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model copy'

interface DialogStatusServiceEstablishmentProps {
  service: ListServicesEstablishmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogStatusServiceEstablishment = ({
  service,
  open,
  onOpen,
}: DialogStatusServiceEstablishmentProps) => {
  const {
    errors,
    control,
    handleSubmit,
    isPendingUpdateStatusServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  } = useFormUpdateStatusServiceEstablishment(service, onOpen)

  return (
    <Dialog.Root
      role="alertdialog"
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Atualizar status do serviço</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex mb="2" align="center" gap="2">
                <Text>Status atual:</Text>
                <Badge colorPalette={service.status ? 'green' : 'red'}>
                  {service.status ? 'Ativo' : 'Inativo'}
                </Badge>
              </Flex>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Field
                    invalid={!!errors.status}
                    errorText={errors.status?.message}
                  >
                    <Switch.Root
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      <Switch.HiddenInput onBlur={field.onBlur} />
                      <Switch.Control />
                      <Switch.Label>Ativar serviço</Switch.Label>
                    </Switch.Root>
                  </Field>
                )}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="red"
                  size="sm"
                  variant="surface"
                  rounded="xl"
                >
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                variant="surface"
                rounded="xl"
                colorPalette="primary"
                loading={isPendingUpdateStatusServiceEstablishment}
                onClick={handleSubmit(onSubmitUpdateServiceEstablishment)}
              >
                <Icon as={Save} boxSize="4" />
                Editar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogStatusServiceEstablishment
