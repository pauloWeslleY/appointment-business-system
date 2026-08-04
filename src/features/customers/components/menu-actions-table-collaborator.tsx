import { For, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import {
  EllipsisVertical,
  Info,
  PencilLineIcon,
  ShieldMinus,
} from 'lucide-react'
import React, { useReducer } from 'react'

import { toaster } from '@/components/ui/toaster'
import { contentCss } from '@/theme/styles/global-styles'

import type { CustomerModel } from '../types/customer.model'
import SidebarInfoCustomer from './dialog-info-customer'
import DialogStatusCustomer from './dialog-status-customer'
import SidebarUpdateCustomer from './sidebar-update-customer'

interface MenuActionsTableCustomersProps {
  customer: CustomerModel
}

type StateProps = {
  info: boolean
  update: boolean
  status: boolean
}

type ActionType = {
  type: keyof StateProps
  payload: boolean
}

const initialState: StateProps = {
  info: false,
  update: false,
  status: false,
}

const reducer = (state: StateProps, action: ActionType) => {
  switch (action.type) {
    case 'info':
      return { ...state, info: action.payload }
    case 'update':
      return { ...state, update: action.payload }
    case 'status':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

const MenuActionsTableCustomers = ({
  customer,
}: MenuActionsTableCustomersProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOpenDialogInfoCustomers = (open: boolean) => {
    return dispatch({ type: 'info', payload: open })
  }

  const handleOpenSidebarUpdateCustomers = (open: boolean) => {
    return dispatch({ type: 'update', payload: open })
  }

  const handleOpenDialogInactiveCustomers = (open: boolean) => {
    return dispatch({ type: 'status', payload: open })
  }

  const loadMenuCardBooking = [
    {
      label: 'Info',
      icon: Info,
      action: () => handleOpenDialogInfoCustomers(true),
    },
    {
      label: 'Editar',
      icon: PencilLineIcon,
      action: () => {
        if (!customer.active) {
          toaster.error({
            title: 'Cliente inativo',
            description: 'Não é possível editar um cliente inativo.',
          })
          return
        }
        handleOpenSidebarUpdateCustomers(true)
      },
      disabled: !customer.active,
    },
    {
      label: 'Status',
      icon: ShieldMinus,
      action: () => handleOpenDialogInactiveCustomers(true),
    },
  ]

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="Options"
            variant="surface"
            rounded="lg"
            size="xs"
            colorPalette="gray"
          >
            <Icon as={EllipsisVertical} boxSize="4" />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content css={contentCss}>
              <For each={loadMenuCardBooking}>
                {(menu, index) => (
                  <React.Fragment key={index}>
                    {index === 2 && (
                      <Menu.Separator
                        mx="0.5"
                        borderColor={{
                          base: 'gray.200',
                          _dark: 'colorPalette.500/20',
                        }}
                      />
                    )}

                    <Menu.Item
                      value={menu.label.toLowerCase()}
                      rounded="xl"
                      cursor={menu.disabled ? 'not-allowed' : 'pointer'}
                      disabled={menu.disabled ?? false}
                      _hover={{
                        bg: { base: 'gray.100', _dark: 'secondary.600' },
                      }}
                      onClick={menu.action}
                    >
                      <Icon as={menu.icon} boxSize="4" />
                      {menu.label}
                    </Menu.Item>
                  </React.Fragment>
                )}
              </For>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <SidebarUpdateCustomer
        customer={customer}
        open={state.update}
        onOpen={handleOpenSidebarUpdateCustomers}
      />

      <SidebarInfoCustomer
        customer={customer}
        open={state.info}
        onOpen={handleOpenDialogInfoCustomers}
      />

      <DialogStatusCustomer
        customer={customer}
        open={state.status}
        onOpen={handleOpenDialogInactiveCustomers}
      />
    </>
  )
}

export default MenuActionsTableCustomers
