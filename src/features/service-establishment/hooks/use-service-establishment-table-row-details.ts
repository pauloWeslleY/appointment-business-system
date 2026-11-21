import { buildServiceAppointmentsSummaryItems } from '../helpers/service-appointments-summary'
import { useGetServiceEstablishmentDetails } from './use-get-service-establishment-details'

export function useServiceEstablishmentTableRowDetails(serviceId: string) {
  const {
    data: serviceDetails,
    isPending: isLoadingServiceDetails,
    error: serviceDetailsError,
    refetch: refetchServiceDetails,
  } = useGetServiceEstablishmentDetails(serviceId)

  const serviceAppointments = serviceDetails?.appointments ?? []
  const hasServiceAppointments = serviceAppointments.length > 0
  const serviceAppointmentsSummaryItems =
    buildServiceAppointmentsSummaryItems(serviceAppointments)

  const retryServiceDetails = () => {
    void refetchServiceDetails()
  }

  return {
    serviceDetails,
    isLoadingServiceDetails,
    serviceDetailsError,
    hasServiceAppointments,
    serviceAppointmentsSummaryItems,
    retryServiceDetails,
  }
}
