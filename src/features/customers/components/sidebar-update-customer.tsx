import { Button, CloseButton, Drawer, Icon, Portal } from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import { contentCss } from '@/theme/styles/global-styles'

import { useFormUpdateCustomer } from '../hooks/use-form-update-customer'
import type { CustomerApiResponse } from '../types/customer-response.api.type'
import FieldsCustomer from './fields-customer'

interface SidebarUpdateCustomerProps {
  customer: CustomerApiResponse
  open: boolean
  onOpen: (open: boolean) => void
}

const SidebarUpdateCustomer = ({
  customer,
  open,
  onOpen,
}: SidebarUpdateCustomerProps) => {
  const {
    formUpdateCustomer,
    onSubmitUpdateCustomer,
    isPendingUpdateCustomer,
  } = useFormUpdateCustomer(customer)

  return (
    <Drawer.Root size="md" open={open} onOpenChange={(e) => onOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss} minW="0">
            <Drawer.Header>
              <Drawer.Title>Atualizar Cliente</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FieldsCustomer form={formUpdateCustomer} />
            </Drawer.Body>
            <Drawer.Footer flexWrap="wrap" gap="2">
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  rounded="lg"
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                colorPalette="brand"
                rounded="lg"
                onClick={onSubmitUpdateCustomer}
                loading={isPendingUpdateCustomer}
              >
                <Icon as={SaveIcon} boxSize="4" />
                Salvar alterações
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarUpdateCustomer
