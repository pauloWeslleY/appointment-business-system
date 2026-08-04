import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useFormUpdateCustomer } from '../hooks/use-form-update-customer'
import type { CustomerModel } from '../types/customer.model'
import FieldsCustomer from './fields-customer'

interface SidebarUpdateCustomerProps {
  customer: CustomerModel
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
    <Drawer.Root size="lg" open={open} onOpenChange={(e) => onOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Header>
              <Drawer.Title>Atualizar Cliente</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FieldsCustomer form={formUpdateCustomer} />
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="red"
                  rounded="xl"
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                variant="surface"
                colorPalette="primary"
                rounded="xl"
                onClick={onSubmitUpdateCustomer}
                loading={isPendingUpdateCustomer}
              >
                Editar
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
