import { For, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { EllipsisVertical, Info, PencilLineIcon } from 'lucide-react'
import { useReducer } from 'react'

import { contentCss } from '@/theme/styles/global-styles'

import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import DialogInfoAppointment from './dialog-info-appointment'
import DialogEditAppointment from './dialog-update-appointment'

interface MenuCardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

type StateProps = {
  info: boolean
  update: boolean
}

type ActionType = {
  type: keyof StateProps
  payload: boolean
}

const initialState: StateProps = {
  info: false,
  update: false,
}

const reducer = (state: StateProps, action: ActionType) => {
  switch (action.type) {
    case 'info':
      return { ...state, info: action.payload }
    case 'update':
      return { ...state, update: action.payload }
    default:
      return state
  }
}

const MenuCardAppointment = ({ appointment }: MenuCardAppointmentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadMenuCardAppointment = [
    {
      label: 'Info',
      icon: Info,
      action: () => handleOpenDialogInfo(true),
    },
    {
      label: 'Editar',
      icon: PencilLineIcon,
      action: () => handleOpenDialogUpdate(true),
    },
  ]

  function handleOpenDialogInfo(open: boolean) {
    dispatch({ type: 'info', payload: open })
  }

  function handleOpenDialogUpdate(open: boolean) {
    dispatch({ type: 'update', payload: open })
  }

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            variant="ghost"
            rounded="full"
            aria-label="Options"
            size="2xs"
          >
            <Icon as={EllipsisVertical} boxSize="4" />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content css={contentCss}>
              <For each={loadMenuCardAppointment}>
                {(item, index) => (
                  <Menu.Item
                    key={index}
                    value={item.label.toLowerCase()}
                    rounded="xl"
                    cursor="pointer"
                    _hover={{
                      bg: { base: 'gray.100', _dark: 'secondary.600' },
                    }}
                    onClick={item.action}
                  >
                    <Icon as={item.icon} boxSize="4" />
                    {item.label}
                  </Menu.Item>
                )}
              </For>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <DialogInfoAppointment
        appointment={appointment}
        open={state.info}
        onOpen={handleOpenDialogInfo}
      />

      <DialogEditAppointment
        appointment={appointment}
        open={state.update}
        onOpen={handleOpenDialogUpdate}
      />
    </>
  )
}

export default MenuCardAppointment
