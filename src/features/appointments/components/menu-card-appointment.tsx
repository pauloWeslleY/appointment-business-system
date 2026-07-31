import { For, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { EllipsisVertical, Info, PencilLineIcon, Sparkles } from 'lucide-react'
import { useReducer } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import DialogInfoAppointment from './dialog-info-appointment'
import DialogEditAppointment from './dialog-update-appointment'
import DialogUpdateStatusAppointment from './dialog-update-status-appointment'

interface MenuCardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

type StateProps = {
  info: boolean
  update: boolean
  'update-status': boolean
}

type ActionType = {
  type: keyof StateProps
  payload: boolean
}

const initialState: StateProps = {
  info: false,
  update: false,
  'update-status': false,
}

const reducer = (state: StateProps, action: ActionType) => {
  switch (action.type) {
    case 'info':
      return { ...state, info: action.payload }
    case 'update':
      return { ...state, update: action.payload }
    case 'update-status':
      return { ...state, 'update-status': action.payload }
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
      action: () => dispatch({ type: 'info', payload: true }),
    },
    {
      label: 'Editar',
      icon: PencilLineIcon,
      action: () => dispatch({ type: 'update', payload: true }),
    },
    {
      label: 'Status',
      icon: Sparkles,
      action: () => dispatch({ type: 'update-status', payload: true }),
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
            <Menu.Content
              colorPalette={colorDefaultTheme}
              borderWidth="1px"
              bg={{ base: 'white', _dark: 'secondary.700' }}
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              rounded="lg"
            >
              <For each={loadMenuCardAppointment}>
                {(item) => (
                  <Menu.Item
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
        onOpen={(open) => dispatch({ type: 'info', payload: open })}
      />

      <DialogUpdateStatusAppointment
        appointment={appointment}
        open={state['update-status']}
        onOpen={(open) => dispatch({ type: 'update-status', payload: open })}
      />

      <DialogEditAppointment
        appointment={appointment}
        open={state.update}
        onOpen={(open) => dispatch({ type: 'update', payload: open })}
      />
    </>
  )
}

export default MenuCardAppointment
