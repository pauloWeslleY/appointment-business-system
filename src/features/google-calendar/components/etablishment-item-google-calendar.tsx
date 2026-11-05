import { Badge, Button, Table } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { Status } from '@/components/ui/status'
import {
  type EstablishmentStatusType,
  mapStatusEstablishment,
} from '@/features/establishment/types/establishment-status.type'

import { getConnectionGoogleCalendarQueryOptions } from '../queries/google-calendar.query-options'

interface EstablishmentItemGoogleCalendarProps {
  onDialogGoogleCalendar: () => void
  establishment: {
    id: string
    name: string
    status: string
  }
}

const EstablishmentItemGoogleCalendar = ({
  establishment,
  onDialogGoogleCalendar,
}: EstablishmentItemGoogleCalendarProps) => {
  const { data: connectionGoogleCalendar } = useQuery(
    getConnectionGoogleCalendarQueryOptions(establishment.id),
  )

  const statusEstablishment = mapStatusEstablishment(
    establishment.status as EstablishmentStatusType,
  )

  return (
    <Table.Row
      key={establishment.id}
      bg={{ _light: 'slate.50', _dark: 'slate.950/60' }}
    >
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
            onClick={onDialogGoogleCalendar}
          >
            Desconectar
          </Button>
        ) : (
          <Button
            size="xs"
            variant="outline"
            rounded="lg"
            onClick={onDialogGoogleCalendar}
          >
            Conectar
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default EstablishmentItemGoogleCalendar
