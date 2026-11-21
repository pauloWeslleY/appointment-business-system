import { Badge, Button, Table } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { Status } from '@/components/ui/status'
import {
  type EstablishmentStatusType,
  mapStatusEstablishment,
} from '@/features/establishment/types/establishment-status.type'
import { tableRowsCss } from '@/theme/styles/global-styles'

import { getConnectionGoogleCalendarQueryOptions } from '../queries/google-calendar.query-options'

interface EstablishmentItemGoogleCalendarProps {
  onDialogConnectGoogleCalendar: () => void
  onDialogDisconnectGoogleCalendar: () => void
  establishment: {
    id: string
    name: string
    status: string
  }
}

const EstablishmentItemGoogleCalendar = ({
  establishment,
  onDialogConnectGoogleCalendar,
  onDialogDisconnectGoogleCalendar,
}: EstablishmentItemGoogleCalendarProps) => {
  const { data: connectionGoogleCalendar } = useQuery(
    getConnectionGoogleCalendarQueryOptions(establishment.id),
  )

  const statusEstablishment = mapStatusEstablishment(
    establishment.status as EstablishmentStatusType,
  )

  return (
    <Table.Row key={establishment.id} {...tableRowsCss}>
      <Table.Cell>{establishment.name}</Table.Cell>

      <Table.Cell>
        <Badge
          size="sm"
          rounded="md"
          variant="outline"
          colorPalette={statusEstablishment.color}
        >
          {statusEstablishment.label}
        </Badge>
      </Table.Cell>

      <Table.Cell>
        <Status
          value={connectionGoogleCalendar?.connected ? 'success' : 'error'}
        >
          {connectionGoogleCalendar?.connected ? 'Conectado' : 'Desconectado'}
        </Status>
      </Table.Cell>

      <Table.Cell>
        <Badge
          size="sm"
          rounded="lg"
          variant="plain"
          colorPalette={
            connectionGoogleCalendar?.inviteCustomers ? 'green' : 'red'
          }
        >
          {connectionGoogleCalendar?.inviteCustomers ? 'Ativo' : 'Inativo'}
        </Badge>
      </Table.Cell>

      <Table.Cell textAlign="right">
        {connectionGoogleCalendar?.connected ? (
          <Button
            size="xs"
            variant="outline"
            rounded="lg"
            colorPalette="red"
            onClick={onDialogDisconnectGoogleCalendar}
          >
            Desconectar
          </Button>
        ) : (
          <Button
            size="xs"
            variant="outline"
            rounded="lg"
            onClick={onDialogConnectGoogleCalendar}
          >
            Conectar
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default EstablishmentItemGoogleCalendar
