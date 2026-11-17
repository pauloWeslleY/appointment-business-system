import { type DatePicker, parseDate } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useQueryStates } from 'nuqs'
import { parseAsInteger, parseAsString } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)

type DateRangeValueType = DatePicker.ValueChangeDetails['value']

interface DateFilterPickerParams {
  from: string
  to: string
}

const RouteDashboardLayout = getRouteApi('/_app/_authenticated/dashboard/$slug')

const formattedDateRange = (from: dayjs.Dayjs, to: dayjs.Dayjs) => ({
  from: from.format('YYYY-MM-DD'),
  to: to.format('YYYY-MM-DD'),
})

export function useFilterDatePicker(
  initialFrom?: string,
  initialTo?: string,
  resetPagination = false,
) {
  const [{ from, to }, setDateSearch] = useQueryStates(
    {
      from: parseAsString.withDefault(initialFrom ?? ''),
      to: parseAsString.withDefault(initialTo ?? ''),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: resetPagination,
    },
  )

  const queryDateValue = useMemo<DateRangeValueType>(() => {
    const listToDateFilter = [from, to].filter((date): date is string =>
      Boolean(date),
    )
    return listToDateFilter.map((date) => parseDate(date))
  }, [from, to])

  const [dateValue, setDateValue] = useState<DateRangeValueType>(queryDateValue)
  const { establishment } = RouteDashboardLayout.useLoaderData()
  const today = dayjs().tz(establishment.timezone).utc(true).locale('pt-br')
  const thisMonday = today.startOf('isoWeek')
  const nextMonday = thisMonday.add(1, 'week')
  const nextMonthStart = today.add(1, 'month').startOf('month')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateValue(queryDateValue)
  }, [queryDateValue])

  const displayedDate = useMemo(() => {
    const formatDate = (date: string) =>
      dayjs(date).locale('pt-br').format('DD MMM YYYY')

    if (from && to) {
      return `${formatDate(from)} - ${formatDate(to)}`
    }

    if (from) {
      return formatDate(from)
    }

    return 'Selecione um período'
  }, [from, to])

  const dateResetFilterPicker = formattedDateRange(today, today.add(1, 'month'))
  const filterDateCurrentMonth = formattedDateRange(
    today.startOf('month'),
    today.endOf('month'),
  )
  const filterDateThisWeek = formattedDateRange(
    thisMonday,
    thisMonday.add(6, 'days'),
  )
  const filterDateNextWeek = formattedDateRange(
    nextMonday,
    nextMonday.add(6, 'days'),
  )
  const filterDateNextSevenDays = formattedDateRange(
    today,
    today.add(6, 'days'),
  )
  const filterDateNextThirtyDays = formattedDateRange(
    today,
    today.add(29, 'days'),
  )
  const filterDateNextMonth = formattedDateRange(
    nextMonthStart,
    nextMonthStart.endOf('month'),
  )

  function handleSelectDateFilter(dateFilter: DateFilterPickerParams) {
    setDateSearch({
      from: dateFilter.from,
      to: dateFilter.to,
      ...(resetPagination && { page: 1 }),
    })
  }

  function onChangeInputCalendar(details: DatePicker.ValueChangeDetails) {
    setDateValue(details.value)
    const dateFrom = details.value[0]?.toString()
    const dateTo = details.value[1]?.toString()

    if (!dateFrom || !dateTo) {
      return
    }

    setDateSearch({
      from: dateFrom,
      to: dateTo,
      ...(resetPagination && { page: 1 }),
    })
  }

  return {
    dateValue,
    displayedDate,
    filterDateThisWeek,
    filterDateNextWeek,
    filterDateNextSevenDays,
    filterDateNextThirtyDays,
    filterDateNextMonth,
    filterDateCurrentMonth,
    dateResetFilterPicker,
    handleSelectDateFilter,
    onChangeInputCalendar,
  }
}
