import { DataList, For } from '@chakra-ui/react'

import { Status } from '@/components/ui/status'

import type { ServiceAppointmentsSummaryItem } from '../helpers/service-appointments-summary'

interface ServiceAppointmentsSummaryProps {
  serviceAppointmentsSummaryItems: ServiceAppointmentsSummaryItem[]
}

const ServiceAppointmentsSummary = ({
  serviceAppointmentsSummaryItems,
}: ServiceAppointmentsSummaryProps) => (
  <DataList.Root
    orientation="vertical"
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    gap="10"
    mt="4"
  >
    <For each={serviceAppointmentsSummaryItems}>
      {(serviceAppointmentsSummaryItem) => (
        <DataList.Item key={serviceAppointmentsSummaryItem.label}>
          <DataList.ItemLabel>
            {serviceAppointmentsSummaryItem.label}
          </DataList.ItemLabel>
          <DataList.ItemValue>
            {serviceAppointmentsSummaryItem.status ? (
              <Status value={serviceAppointmentsSummaryItem.status}>
                {serviceAppointmentsSummaryItem.value}
              </Status>
            ) : (
              serviceAppointmentsSummaryItem.value
            )}
          </DataList.ItemValue>
        </DataList.Item>
      )}
    </For>
  </DataList.Root>
)

export default ServiceAppointmentsSummary
