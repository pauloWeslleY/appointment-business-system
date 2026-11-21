import { For, Table, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { Fragment } from 'react'

import { tableColumnsCss, tableRowsCss } from '@/theme/styles/global-styles'

import { useTableServicesEstablishment } from '../hooks/use-table-services-establishment'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import ServiceEstablishmentTableRow from './service-establishment-table-row'
import ServiceEstablishmentTableRowDetails from './service-establishment-table-row-details'

interface TableServicesEstablishmentProps {
  services: ListServicesEstablishmentModel[]
}

const TableServicesEstablishment = ({
  services,
}: TableServicesEstablishmentProps) => {
  const {
    serviceTableColumns,
    serviceDetailsColumnSpan,
    serviceDetailsAnimationDuration,
    serviceTableRows,
    toggleServiceDetails,
  } = useTableServicesEstablishment(services)

  return (
    <Table.ScrollArea
      tabIndex={0}
      maxW="full"
      aria-label="Serviços: role para ver todas as colunas"
      rounded="lg"
    >
      <Table.Root variant="outline" minW="56rem">
        <Table.Header>
          <Table.Row {...tableRowsCss}>
            <Table.ColumnHeader w="12" {...tableColumnsCss}>
              <Text srOnly>Expandir detalhes</Text>
            </Table.ColumnHeader>

            <For each={serviceTableColumns}>
              {(serviceTableColumn) => (
                <Table.ColumnHeader
                  key={serviceTableColumn}
                  textTransform="uppercase"
                  fontSize="xs"
                  {...tableColumnsCss}
                >
                  {serviceTableColumn}
                </Table.ColumnHeader>
              )}
            </For>

            <Table.ColumnHeader
              textAlign="right"
              textTransform="uppercase"
              fontSize="xs"
              {...tableColumnsCss}
            >
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <For each={serviceTableRows}>
            {(serviceTableRow) => (
              <Fragment key={serviceTableRow.service.id}>
                <ServiceEstablishmentTableRow
                  service={serviceTableRow.service}
                  serviceDetailsId={serviceTableRow.serviceDetailsId}
                  isServiceExpanded={serviceTableRow.isServiceExpanded}
                  onToggleServiceDetails={toggleServiceDetails}
                />

                <AnimatePresence initial={false}>
                  {serviceTableRow.isServiceExpanded && (
                    <Table.Row
                      id={serviceTableRow.serviceDetailsId}
                      {...tableRowsCss}
                    >
                      <Table.Cell colSpan={serviceDetailsColumnSpan} p="0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: serviceDetailsAnimationDuration,
                            ease: [0.4, 0, 0.2, 1] as const,
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <ServiceEstablishmentTableRowDetails
                            serviceId={serviceTableRow.service.id}
                          />
                        </motion.div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </AnimatePresence>
              </Fragment>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default TableServicesEstablishment
