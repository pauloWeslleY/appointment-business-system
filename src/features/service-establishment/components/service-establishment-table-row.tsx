import {
  Avatar,
  Badge,
  HStack,
  Icon,
  IconButton,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

import { tableRowsCss } from '@/theme/styles/global-styles'

import { useServiceEstablishmentTableRow } from '../hooks/use-service-establishment-table-row'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import MenuActionServicesTable from './menu-action-services-table'
import StatusServiceEstablishment from './status-service-establishment'

interface ServiceEstablishmentTableRowProps {
  service: ListServicesEstablishmentModel
  serviceDetailsId: string
  isServiceExpanded: boolean
  onToggleServiceDetails: (serviceId: string) => void
}

export default function ServiceEstablishmentTableRow({
  service,
  serviceDetailsId,
  isServiceExpanded,
  onToggleServiceDetails,
}: ServiceEstablishmentTableRowProps) {
  const { servicePriceLabel, serviceDurationLabel, serviceAppointmentsLabel } =
    useServiceEstablishmentTableRow(service)

  return (
    <Table.Row {...tableRowsCss}>
      <Table.Cell>
        <IconButton
          size="xs"
          variant="ghost"
          rounded="lg"
          aria-expanded={isServiceExpanded}
          aria-controls={serviceDetailsId}
          aria-label={`${isServiceExpanded ? 'Ocultar' : 'Exibir'} detalhes de ${service.name}`}
          onClick={() => onToggleServiceDetails(service.id)}
        >
          <Icon as={isServiceExpanded ? ChevronDownIcon : ChevronRightIcon} />
        </IconButton>
      </Table.Cell>

      <Table.Cell>
        <HStack gap="3">
          <Avatar.Root size="sm" shape="rounded" colorPalette="primary">
            {service.imageUrl && (
              <Avatar.Image src={service.imageUrl} alt="Imagem do serviço" />
            )}
            <Avatar.Fallback name={service.name} />
          </Avatar.Root>
          <Stack gap="0" minW="0">
            <Text fontWeight="medium" lineClamp={1}>
              {service.name}
            </Text>
            <Text
              fontSize="xs"
              color={{ _light: 'gray.600', _dark: 'gray.400' }}
              lineClamp={1}
            >
              {service.description}
            </Text>
          </Stack>
        </HStack>
      </Table.Cell>

      <Table.Cell>
        <Badge size="sm" variant="surface">
          {servicePriceLabel}
        </Badge>
      </Table.Cell>

      <Table.Cell>
        <Text fontSize="sm">{serviceDurationLabel}</Text>
      </Table.Cell>

      <Table.Cell>
        <Text fontSize="sm">{serviceAppointmentsLabel}</Text>
      </Table.Cell>

      <Table.Cell>
        <StatusServiceEstablishment status={service.status} color="color" />
      </Table.Cell>

      <Table.Cell textAlign="right">
        <MenuActionServicesTable
          service={service}
          isViewServiceActionVisible={false}
        />
      </Table.Cell>
    </Table.Row>
  )
}
