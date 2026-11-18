import {
  Alert,
  For,
  Icon,
  IconButton,
  Menu,
  Popover,
  Portal,
} from '@chakra-ui/react'
import { EllipsisVertical } from 'lucide-react'

import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import { useMenuCardAppointment } from '../hooks/use-menu-card-appointment'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import DialogInfoAppointment from './dialog-info-appointment'
import DialogEditAppointment from './dialog-update-appointment'

interface MenuCardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const MenuCardAppointment = ({ appointment }: MenuCardAppointmentProps) => {
  const {
    state,
    isLoadingAppointment,
    optionsMenuCardAppointment,
    appointmentCurrentDetail,
    isErrorAppointment,
    errorMessageAppointmentDetail,
    handleOpenDialogInfo,
    handleOpenDialogUpdate,
  } = useMenuCardAppointment(appointment)

  const renderIconButtonTrigger = () => (
    <IconButton
      aria-label="Options"
      variant="ghost"
      rounded="md"
      size="2xs"
      loading={isLoadingAppointment}
    >
      <Icon as={EllipsisVertical} boxSize="4" />
    </IconButton>
  )

  if (isErrorAppointment) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>{renderIconButtonTrigger()}</Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content css={contentCss}>
              <Popover.Body p="1">
                <Alert.Root status="error" rounded="lg">
                  <Alert.Indicator />
                  <Alert.Title>{errorMessageAppointmentDetail}</Alert.Title>
                </Alert.Root>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    )
  }

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>{renderIconButtonTrigger()}</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content css={contentCss} minW={{ base: 'auto', xl: '40' }}>
              <For each={optionsMenuCardAppointment}>
                {(item, index) => (
                  <Menu.Item
                    key={index}
                    value={item.label.toLowerCase()}
                    onClick={item.action}
                    {...menuItemCss}
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

      {appointmentCurrentDetail && (
        <>
          <DialogInfoAppointment
            appointment={appointmentCurrentDetail}
            open={state.info}
            onOpen={handleOpenDialogInfo}
          />

          <DialogEditAppointment
            appointment={appointmentCurrentDetail}
            open={state.update}
            onOpen={handleOpenDialogUpdate}
          />
        </>
      )}
    </>
  )
}

export default MenuCardAppointment
