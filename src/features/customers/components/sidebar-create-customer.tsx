'use client'

import { Button, CloseButton, Drawer, Icon, Portal } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'

import { contentCss } from '@/theme/styles/global-styles'

import { useFormCreateCustomer } from '../hooks/use-form-create-customer'
import FieldsCustomer from './fields-customer'

const SidebarCreateCustomer = () => {
  const {
    formCreateCustomer,
    onSubmitCreateCustomer,
    isPendingCreateCustomer,
  } = useFormCreateCustomer()

  return (
    <Drawer.Root size="lg">
      <Drawer.Trigger asChild>
        <Button rounded="xl" size="xs" variant="surface" colorPalette="emerald">
          <Icon as={PlusIcon} boxSize="5" />
          Novo Cliente
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Header>
              <Drawer.Title>Novo Cliente</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FieldsCustomer form={formCreateCustomer} />
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
                onClick={onSubmitCreateCustomer}
                loading={isPendingCreateCustomer}
              >
                Salvar
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

export default SidebarCreateCustomer
