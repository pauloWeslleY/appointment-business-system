import { useQuery } from '@tanstack/react-query'
import { InfoIcon, PencilLineIcon } from 'lucide-react'
import { useMemo, useReducer } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { optionsStatusAppointmentConcludedCancelled } from '../constants/options-status-appointment'
import { appointmentDetailQueryOptions } from '../queries/appointment.query-options'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

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

export function useMenuCardAppointment(
  appointment: GetAppointmentByEstablishmentModel,
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data: session } = useAppSession()
  const {
    data: appointmentDetail,
    error: errorAppointment,
    isError: isErrorAppointment,
    isFetching: isFetchingAppointment,
  } = useQuery(
    appointmentDetailQueryOptions(
      appointment.id,
      appointment.establishmentId,
      session?.session.activeOrganizationId ?? '',
      session?.user.id,
      state.info || state.update,
    ),
  )

  const isLoadingAppointment =
    (state.info || state.update) && isFetchingAppointment
  const errorMessageAppointmentDetail =
    errorAppointment?.message ??
    'Não foi possível carregar os detalhes do agendamento'
  const disabledMenuCardStatusConcludedOrCancelled =
    optionsStatusAppointmentConcludedCancelled.has(appointment.status)

  const appointmentCurrentDetail = useMemo(() => {
    if (!appointmentDetail) {
      return
    }

    const appointmentOrganizationId = appointmentDetail.organizationId

    if (
      appointmentOrganizationId !== session?.session.activeOrganizationId ||
      appointmentOrganizationId !== appointment.organizationId
    ) {
      return
    }

    return appointmentDetail
  }, [
    appointment.organizationId,
    appointmentDetail,
    session?.session.activeOrganizationId,
  ])

  const loadMenuCardAppointment = [
    {
      label: 'Detalhes do agendamento',
      icon: InfoIcon,
      action: () => handleOpenDialogInfo(true),
    },
    {
      label: 'Editar agendamento',
      icon: PencilLineIcon,
      action: () => handleOpenDialogUpdate(true),
    },
  ]

  const optionsMenuCardAppointment = loadMenuCardAppointment.reduce(
    (acc, option) => {
      if (
        disabledMenuCardStatusConcludedOrCancelled &&
        option.label === 'Editar agendamento'
      ) {
        return acc
      }
      acc.push(option)
      return acc
    },
    [] as typeof loadMenuCardAppointment,
  )

  function handleOpenDialogInfo(open: boolean) {
    dispatch({ type: 'info', payload: open })
  }

  function handleOpenDialogUpdate(open: boolean) {
    dispatch({ type: 'update', payload: open })
  }

  return {
    state,
    isLoadingAppointment,
    isErrorAppointment,
    optionsMenuCardAppointment,
    appointmentCurrentDetail,
    errorMessageAppointmentDetail,
    disabledMenuCardStatusConcludedOrCancelled,
    handleOpenDialogInfo,
    handleOpenDialogUpdate,
  }
}
