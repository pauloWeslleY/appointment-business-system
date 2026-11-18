import { Button, For, HStack, Separator, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import FilterDatePicker from '@/components/layout/filter-date-picker/filter-date-picker'

import { AppointmentPeriod } from '../constants/appointment-period'
import {
  type AppointmentPeriodRange,
  appointmentPeriodRange,
  isAppointmentPeriodSelected,
} from '../helpers/appointment-period-range'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

interface AppointmentPeriodFilterProps {
  from?: string
  to?: string
}

const AppointmentPeriodFilter = ({
  from: initialFrom,
  to: initialTo,
}: AppointmentPeriodFilterProps) => {
  const { establishment } = dashboardRoute.useLoaderData()
  const [selectedPeriodRange, setAppointmentPeriodSearch] = useQueryStates(
    {
      from: parseAsString.withDefault(initialFrom ?? ''),
      to: parseAsString.withDefault(initialTo ?? ''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: true },
  )

  const selectAppointmentPeriod = (periodRange: AppointmentPeriodRange) => {
    setAppointmentPeriodSearch({ ...periodRange, page: 1 })
  }

  return (
    <HStack gap="2" flexWrap="wrap">
      <Text fontSize="sm" color={{ _light: 'gray.500', _dark: 'gray.400' }}>
        Período:
      </Text>

      <For
        each={[
          {
            period: AppointmentPeriod.TODAY,
            label: 'Hoje',
          },
          {
            period: AppointmentPeriod.TOMORROW,
            label: 'Amanhã',
          },
          {
            period: AppointmentPeriod.THIS_WEEK,
            label: 'Esta semana',
          },
          {
            period: AppointmentPeriod.NEXT_THIRTY_DAYS,
            label: 'Próximos 30 dias',
          },
        ]}
      >
        {(appointmentPeriodOption) => {
          const periodRange = appointmentPeriodRange(
            appointmentPeriodOption.period,
            establishment.timezone,
          )
          const isPeriodSelected = isAppointmentPeriodSelected(
            periodRange,
            selectedPeriodRange,
          )

          return (
            <Button
              key={appointmentPeriodOption.period}
              size="xs"
              rounded="lg"
              variant={isPeriodSelected ? 'subtle' : 'outline'}
              colorPalette={isPeriodSelected ? 'teal' : 'secondary'}
              aria-pressed={isPeriodSelected}
              onClick={() => selectAppointmentPeriod(periodRange)}
            >
              {appointmentPeriodOption.label}
            </Button>
          )
        }}
      </For>

      <Separator
        orientation="vertical"
        h="6"
        borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
      />

      <FilterDatePicker from={initialFrom} to={initialTo} resetPagination />
    </HStack>
  )
}

export default AppointmentPeriodFilter
