import { useReducedMotion } from 'motion/react'
import { useState } from 'react'

import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'

export function useTableServicesEstablishment(
  services: ListServicesEstablishmentModel[],
) {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null,
  )
  const shouldReduceServiceDetailsMotion = useReducedMotion()

  const serviceTableColumns = [
    'Serviço',
    'Preço',
    'Duração',
    'Agendamentos',
    'Status',
  ]
  const serviceDetailsColumnSpan = serviceTableColumns.length + 2
  const serviceDetailsAnimationDuration = shouldReduceServiceDetailsMotion
    ? 0
    : 0.3

  const serviceTableRows = services.map((service) => ({
    service,
    serviceDetailsId: `service-details-${service.id}`,
    isServiceExpanded: expandedServiceId === service.id,
  }))

  const toggleServiceDetails = (serviceId: string) => {
    setExpandedServiceId((currentExpandedServiceId) =>
      currentExpandedServiceId === serviceId ? null : serviceId,
    )
  }

  return {
    serviceTableColumns,
    serviceDetailsColumnSpan,
    serviceDetailsAnimationDuration,
    serviceTableRows,
    toggleServiceDetails,
  }
}
