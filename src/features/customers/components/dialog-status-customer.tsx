import {
  Badge,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Icon,
  Portal,
  Text,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'

import { contentCss } from '@/theme/styles/global-styles'

import { useStatusCustomer } from '../hooks/use-status-customer'
import type { CustomerApiResponse } from '../types/customer-response.api.type'

interface DialogStatusCustomerProps {
  customer: CustomerApiResponse
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogStatusCustomer = ({
  customer,
  open,
  onOpen,
}: DialogStatusCustomerProps) => {
  const { handleStatusCustomer, isPendingStatusCustomer } = useStatusCustomer(
    customer,
    () => onOpen(false),
  )

  return (
    <Dialog.Root
      size="sm"
      role="alertdialog"
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content
            css={contentCss}
          >
            <Dialog.Header>
              <Dialog.Title>Atualizar status do cliente</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex mb="2" align="center" gap="2">
                <Text>Status atual:</Text>
                <Badge colorPalette={customer.status ? 'green' : 'red'}>
                  {customer.status ? 'Ativo' : 'Inativo'}
                </Badge>
              </Flex>
              <p>
                Tem certeza de que deseja atualizar o status do cliente "
                <strong>{customer.name}</strong>"?
              </p>
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button size="sm" variant="surface" rounded="xl">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                variant="surface"
                rounded="xl"
                colorPalette={customer.status ? 'red' : 'green'}
                loading={isPendingStatusCustomer}
                onClick={handleStatusCustomer}
              >
                <Icon as={Save} boxSize="4" />
                {customer.status ? 'Inativar' : 'Ativar'} status
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

export default DialogStatusCustomer
