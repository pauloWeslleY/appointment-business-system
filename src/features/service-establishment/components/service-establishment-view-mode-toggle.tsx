import { For, HStack, Icon, SegmentGroup } from '@chakra-ui/react'
import { LayoutGrid, Table } from 'lucide-react'

import {
  ServiceEstablishmentViewMode,
  ServiceEstablishmentViewModeSchema,
  type ServiceEstablishmentViewModeType,
} from '../types/service-establishment-view-mode.type'

interface ServiceEstablishmentViewModeToggleProps {
  serviceEstablishmentViewMode: ServiceEstablishmentViewModeType
  onServiceEstablishmentViewModeChange: (
    selectedViewMode: ServiceEstablishmentViewModeType,
  ) => void
}

const ServiceEstablishmentViewModeToggle = ({
  serviceEstablishmentViewMode,
  onServiceEstablishmentViewModeChange,
}: ServiceEstablishmentViewModeToggleProps) => {
  const selectServiceEstablishmentViewMode = (
    selectedValue: string | null,
  ): void => {
    const serviceViewModeValidation =
      ServiceEstablishmentViewModeSchema.safeParse(selectedValue)

    if (!serviceViewModeValidation.success) {
      return
    }

    onServiceEstablishmentViewModeChange(serviceViewModeValidation.data)
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
      aria-label="Modo de visualização dos serviços"
      value={serviceEstablishmentViewMode}
      onValueChange={({ value }) => selectServiceEstablishmentViewMode(value)}
    >
      <SegmentGroup.Indicator bg="brand.solid" rounded="md" shadow="shape" />

      <For
        each={[
          {
            viewMode: ServiceEstablishmentViewMode.TABLE,
            label: 'Tabela',
            icon: Table,
          },
          {
            viewMode: ServiceEstablishmentViewMode.CARD,
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

export default ServiceEstablishmentViewModeToggle
