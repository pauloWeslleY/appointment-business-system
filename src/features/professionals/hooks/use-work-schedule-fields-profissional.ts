import { useFieldArray, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { MAX_WORK_SCHEDULE_PERIODS } from '../schemas/professional-form.schema'
import type { ProfessionalFormMethods } from '../types/professional-form.type'

export function useWorkScheduleFieldsProfissional(
  form: ProfessionalFormMethods,
) {
  const { errors } = form.formState

  const {
    fields: workScheduleFields,
    append: appendWorkPeriod,
    remove: removeWorkPeriod,
  } = useFieldArray({
    control: form.control,
    name: 'workSchedule',
  })

  const workSchedule =
    useWatch({ control: form.control, name: 'workSchedule' }) ?? []

  const selectedWorkDays = [
    ...new Set(workSchedule.map((period) => String(period.dayOfWeek))),
  ]

  const hasReachedWorkPeriodsLimit =
    workScheduleFields.length >= MAX_WORK_SCHEDULE_PERIODS

  const handleSelectedWorkDaysChange = (days: string[]) => {
    const addedDays = days.filter((day) => !selectedWorkDays.includes(day))
    const removedDays = selectedWorkDays.filter((day) => !days.includes(day))
    const removedPeriodIndexes = workScheduleFields.flatMap((field, index) =>
      removedDays.includes(String(field.dayOfWeek)) ? [index] : [],
    )

    removeWorkPeriod(removedPeriodIndexes)

    for (const day of addedDays) {
      appendWorkPeriod({
        dayOfWeek: Number(day),
        startsAt: '08:00',
        endsAt: '18:00',
      })
    }
  }

  const addWorkPeriodToDay = (dayOfWeek: number) => {
    const MAX_WORK_PERIODS_PER_DAY = 2
    const validateWorkPeriodsLimit = workScheduleFields.filter(
      (field) => field.dayOfWeek === dayOfWeek,
    )
    const hasReachedWorkPeriodsLimitForDay =
      validateWorkPeriodsLimit.length >= MAX_WORK_PERIODS_PER_DAY

    if (hasReachedWorkPeriodsLimitForDay) {
      toaster.warning({
        title: 'Limite de períodos atingido',
        description: `Você não pode adicionar mais de ${MAX_WORK_PERIODS_PER_DAY} períodos de trabalho.`,
      })
      return
    }
    appendWorkPeriod({
      dayOfWeek,
      startsAt: '',
      endsAt: '',
    })
  }

  return {
    errors,
    selectedWorkDays,
    workScheduleFields,
    hasReachedWorkPeriodsLimit,
    addWorkPeriodToDay,
    removeWorkPeriod,
    handleSelectedWorkDaysChange,
  }
}
