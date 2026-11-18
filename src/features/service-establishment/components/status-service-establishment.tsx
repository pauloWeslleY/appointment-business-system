import { Badge, type ColorPalette } from '@chakra-ui/react'
import type { ReactElement } from 'react'

import { Status, type StatusProps } from '@/components/ui/status'

import {
  mapColorStatusServiceEstablishment,
  StatusServiceEstablishmentTypeColor,
  type StatusServiceEstablishmentTypeColorType,
} from '../helpers/status-service-establishement'

interface StatusServiceEstablishmentProps {
  status: boolean
  color: StatusServiceEstablishmentTypeColorType
}

const StatusServiceEstablishment = ({
  status,
  color,
}: StatusServiceEstablishmentProps) => {
  const mapStatus = mapColorStatusServiceEstablishment(status, color)

  const Component: Record<
    StatusServiceEstablishmentTypeColorType,
    ReactElement
  > = {
    [StatusServiceEstablishmentTypeColor.color]: (
      <Badge
        size="sm"
        rounded="md"
        variant="surface"
        colorPalette={mapStatus.color as ColorPalette}
      >
        {mapStatus.label}
      </Badge>
    ),
    [StatusServiceEstablishmentTypeColor.status]: (
      <Status value={mapStatus.color as StatusProps['value']}>
        {mapStatus.label}
      </Status>
    ),
  }

  return Component[color]
}

export default StatusServiceEstablishment
