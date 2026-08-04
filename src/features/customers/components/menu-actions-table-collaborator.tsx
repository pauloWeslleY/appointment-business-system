import { For, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import {
  EllipsisVertical,
  Info,
  PencilLineIcon,
  ShieldMinus,
} from 'lucide-react'
import React, { useReducer } from 'react'

import { contentCss } from '@/theme/styles/global-styles'

import type { CustomerModel } from '../types/customer.model'

interface MenuActionsTableCustomersProps {
  customer: CustomerModel
}

type StateProps = {
  info: boolean
  update: boolean
  inativar: boolean
}

type ActionType = {
  type: keyof StateProps
  payload: boolean
}

const initialState: StateProps = {
  info: false,
  update: false,
  inativar: false,
}

const reducer = (state: StateProps, action: ActionType) => {
  switch (action.type) {
    case 'info':
      return { ...state, info: action.payload }
    case 'update':
      return { ...state, update: action.payload }
    case 'inativar':
      return { ...state, inativar: action.payload }
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
    return dispatch({ type: 'inativar', payload: open })
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
      action: () => handleOpenSidebarUpdateCustomers(true),
    },
    {
      label: 'Inativar',
      icon: ShieldMinus,
      action: () => handleOpenDialogInactiveCustomers(true),
    },
  ]

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            variant="ghost"
            rounded="full"
            aria-label="Options"
            size="xs"
          >
            <Icon as={EllipsisVertical} boxSize="4" />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content css={contentCss}>
              <For each={loadMenuCardBooking}>
                {(item, index) => (
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
                      value={item.label.toLowerCase()}
                      rounded="xl"
                      cursor="pointer"
                      color={item.label === 'Inativar' ? 'fg.error' : 'inherit'}
                      _hover={
                        item.label === 'Inativar'
                          ? { bg: 'bg.error', color: 'fg.error' }
                          : { bg: { base: 'gray.100', _dark: 'secondary.600' } }
                      }
                      onClick={item.action}
                    >
                      <Icon as={item.icon} boxSize="4" />
                      {item.label}
                    </Menu.Item>
                  </React.Fragment>
                )}
              </For>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {/* <DialogDetailsCollaborator
        collaborator={collaborator}
        open={state.info}
        onOpen={handleOpenDialogInfoCollaborator}
      />

      <SidebarUpdateCollaborator
        collaborator={collaborator}
        open={state.update}
        onOpen={handleOpenSidebarUpdateCollaborator}
      />

      <DialogInactiveCollaborator
        collaborator={collaborator}
        open={state.inativar}
        onOpen={handleOpenDialogInactiveCollaborator}
      /> */}
    </>
  )
}

export default MenuActionsTableCustomers
