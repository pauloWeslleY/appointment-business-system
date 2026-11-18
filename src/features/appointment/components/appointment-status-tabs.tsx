import { Badge, For, Tabs } from '@chakra-ui/react'
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs'

import type { AppointmentPageApiResponse } from '../types/appointment-page-api.type'
import {
  AppointmentStatus,
  AppointmentStatusSchema,
} from '../types/appointment-status.type'

// Usado como valor da aba "Todos" e como seleção quando não há status na URL;
// as duas referências precisam permanecer iguais.
const ALL_APPOINTMENTS_TAB_VALUE = 'all'

interface AppointmentStatusTabsProps {
  appointmentsSummary: AppointmentPageApiResponse['summary']
}

const AppointmentStatusTabs = ({
  appointmentsSummary,
}: AppointmentStatusTabsProps) => {
  const [{ status: selectedAppointmentStatus }, setAppointmentStatusSearch] =
    useQueryStates(
      {
        status: parseAsStringEnum(Object.values(AppointmentStatus)),
        page: parseAsInteger.withDefault(1),
      },
      { shallow: true },
    )

  const selectedTabValue =
    selectedAppointmentStatus ?? ALL_APPOINTMENTS_TAB_VALUE

  const selectAppointmentStatusTab = (tabValue: string): void => {
    const appointmentStatusValidation =
      AppointmentStatusSchema.safeParse(tabValue)
    const selectedStatus = appointmentStatusValidation.success
      ? appointmentStatusValidation.data
      : null

    setAppointmentStatusSearch({ status: selectedStatus, page: 1 })
  }

  return (
    <Tabs.Root
      variant="line"
      colorPalette="teal"
      value={selectedTabValue}
      onValueChange={({ value }) => selectAppointmentStatusTab(value)}
    >
      <Tabs.List
        overflowX="auto"
        borderColor={{ _light: 'gray.100', _dark: 'slate.900' }}
      >
        <Tabs.Trigger value={ALL_APPOINTMENTS_TAB_VALUE}>
          Todos
          <Badge rounded="full" variant="subtle">
            {appointmentsSummary.total}
          </Badge>
        </Tabs.Trigger>

        <For
          each={[
            { status: AppointmentStatus.PENDING, label: 'Pendentes' },
            { status: AppointmentStatus.CONFIRMED, label: 'Confirmados' },
            { status: AppointmentStatus.CONCLUDED, label: 'Concluídos' },
            { status: AppointmentStatus.CANCELLED, label: 'Cancelados' },
          ]}
        >
          {(appointmentStatusTab) => (
            <Tabs.Trigger
              key={appointmentStatusTab.status}
              value={appointmentStatusTab.status}
            >
              {appointmentStatusTab.label}
              <Badge rounded="full" variant="subtle">
                {appointmentsSummary.byStatus[appointmentStatusTab.status]}
              </Badge>
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default AppointmentStatusTabs
