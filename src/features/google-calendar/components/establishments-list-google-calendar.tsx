import { For, Table } from '@chakra-ui/react'

import { cssTableColumns } from '@/theme/styles/global-styles'

import { useEstablishmentsListGoogleCalendar } from '../hooks/use-establishments-list-google-calendar'
import DialogConnectGoogleCalendar from './dialog-connect-google-calendar'
import DialogDisconnectGoogleCalendar from './dialog-disconnect-google-calendar'
import EstablishmentItemGoogleCalendar from './etablishment-item-google-calendar'

const EstablishmentsListGoogleCalendar = () => {
  const {
    isOpenDialogGoogleCalendar,
    listEstablishmentsGoogleCalendar,
    handleDialogGoogleCalendar,
    setIsOpenDialogGoogleCalendar,
  } = useEstablishmentsListGoogleCalendar()

  return (
    <>
      <Table.ScrollArea
        rounded="lg"
        borderColor={{ _light: 'slate.200', _dark: 'slate.900/60' }}
      >
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row bg={{ _light: 'slate.200', _dark: 'slate.900/60' }}>
              <For
                each={[
                  'Estabelecimento',
                  'Situação',
                  'Conexão',
                  'Convidar clientes',
                ]}
              >
                {(header) => (
                  <Table.ColumnHeader {...cssTableColumns}>
                    {header}
                  </Table.ColumnHeader>
                )}
              </For>
              <Table.ColumnHeader textAlign="right" {...cssTableColumns}>
                Ações
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listEstablishmentsGoogleCalendar.map((establishment) => {
              return (
                <EstablishmentItemGoogleCalendar
                  key={establishment.id}
                  establishment={establishment}
                  onDialogGoogleCalendar={() =>
                    handleDialogGoogleCalendar(establishment.id)
                  }
                />
              )
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <DialogConnectGoogleCalendar
        isOpen={isOpenDialogGoogleCalendar}
        onOpen={setIsOpenDialogGoogleCalendar}
      />

      <DialogDisconnectGoogleCalendar
        isOpen={isOpenDialogGoogleCalendar}
        onOpen={setIsOpenDialogGoogleCalendar}
      />
    </>
  )
}

export default EstablishmentsListGoogleCalendar
