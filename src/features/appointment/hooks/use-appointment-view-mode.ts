import { parseAsStringEnum, useQueryState } from 'nuqs'

import {
  AppointmentViewMode,
  type AppointmentViewModeType,
} from '../types/appointment-view-mode.type'

export function useAppointmentViewMode() {
  const [appointmentViewMode, setAppointmentViewModeSearch] = useQueryState(
    'view',
    parseAsStringEnum(Object.values(AppointmentViewMode))
      .withDefault(AppointmentViewMode.LIST)
      .withOptions({ shallow: true }),
  )

  const changeAppointmentViewMode = (
    selectedViewMode: AppointmentViewModeType,
  ): void => {
    setAppointmentViewModeSearch(selectedViewMode)
  }

  return {
    appointmentViewMode,
    changeAppointmentViewMode,
  }
}
