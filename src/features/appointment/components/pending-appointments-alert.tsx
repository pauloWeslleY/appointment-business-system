import { Alert, Button } from '@chakra-ui/react'
import { Clock } from 'lucide-react'
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs'

import { AppointmentStatus } from '../types/appointment-status.type'

interface PendingAppointmentsAlertProps {
  pendingAppointmentsCount: number
}

const PendingAppointmentsAlert = ({
  pendingAppointmentsCount,
}: PendingAppointmentsAlertProps) => {
  const [{ status: selectedAppointmentStatus }, setAppointmentStatusSearch] =
    useQueryStates(
      {
        status: parseAsStringEnum(Object.values(AppointmentStatus)),
        page: parseAsInteger.withDefault(1),
      },
      { shallow: true },
    )

  const isShowingPendingAppointments =
    selectedAppointmentStatus === AppointmentStatus.PENDING
  const pendingAppointmentsLabel =
    pendingAppointmentsCount === 1 ? 'agendamento' : 'agendamentos'

  const showPendingAppointments = (): void => {
    setAppointmentStatusSearch({
      status: AppointmentStatus.PENDING,
      page: 1,
    })
  }

  return (
    <Alert.Root
      status="warning"
      variant="surface"
      rounded="xl"
      alignItems="center"
    >
      <Alert.Indicator>
        <Clock />
      </Alert.Indicator>
      <Alert.Title flex="1">
        <strong>
          {pendingAppointmentsCount} {pendingAppointmentsLabel}
        </strong>{' '}
        aguardando sua confirmação
      </Alert.Title>

      {!isShowingPendingAppointments && (
        <Button
          size="sm"
          variant="outline"
          colorPalette="orange"
          rounded="lg"
          onClick={showPendingAppointments}
        >
          Ver pendentes
        </Button>
      )}
    </Alert.Root>
  )
}

export default PendingAppointmentsAlert
