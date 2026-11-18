import { For, HStack, Icon, SegmentGroup } from '@chakra-ui/react'
import { LayoutGrid, List } from 'lucide-react'

import {
  AppointmentViewMode,
  AppointmentViewModeSchema,
  type AppointmentViewModeType,
} from '../types/appointment-view-mode.type'

interface AppointmentViewModeToggleProps {
  appointmentViewMode: AppointmentViewModeType
  onAppointmentViewModeChange: (
    selectedViewMode: AppointmentViewModeType,
  ) => void
}

const AppointmentViewModeToggle = ({
  appointmentViewMode,
  onAppointmentViewModeChange,
}: AppointmentViewModeToggleProps) => {
  const selectAppointmentViewMode = (selectedValue: string | null): void => {
    const appointmentViewModeValidation =
      AppointmentViewModeSchema.safeParse(selectedValue)

    if (!appointmentViewModeValidation.success) {
      return
    }

    onAppointmentViewModeChange(appointmentViewModeValidation.data)
  }

  return (
    <SegmentGroup.Root
      size="sm"
      colorPalette="brand"
      rounded="lg"
      bg="app.surface"
      borderWidth="1px"
      borderColor="app.border"
      shadow="xs"
      aria-label="Modo de visualização dos agendamentos"
      value={appointmentViewMode}
      onValueChange={({ value }) => selectAppointmentViewMode(value)}
    >
      <SegmentGroup.Indicator bg="brand.solid" rounded="md" shadow="shape" />

      <For
        each={[
          {
            viewMode: AppointmentViewMode.LIST,
            label: 'Lista',
            icon: List,
          },
          {
            viewMode: AppointmentViewMode.CARD,
            label: 'Cards',
            icon: LayoutGrid,
          },
        ]}
      >
        {(viewModeOption) => (
          <SegmentGroup.Item
            key={viewModeOption.viewMode}
            value={viewModeOption.viewMode}
            rounded="md"
            fontWeight="medium"
            color="app.fgMuted"
            cursor="pointer"
            _checked={{ color: 'brand.contrast' }}
          >
            <SegmentGroup.ItemText>
              <HStack gap="1.5">
                <Icon as={viewModeOption.icon} boxSize="3.5" />
                {viewModeOption.label}
              </HStack>
            </SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  )
}

export default AppointmentViewModeToggle
