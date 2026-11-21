import { createListCollection } from '@chakra-ui/react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useMemo, useState } from 'react'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'

export function useFilterServiceAppointment(establishmentId: string) {
  const [open, setOpen] = useState(false)
  const [{ service_id: serviceId }, setServiceId] = useQueryStates(
    {
      service_id: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: true },
  )

  const {
    data: loadServiceByEstablishmentData,
    isLoading: isLoadingLoadServiceByEstablishment,
  } = useGetServiceByEstablishment(establishmentId, open || Boolean(serviceId))

  const disabledSelectService =
    isLoadingLoadServiceByEstablishment ||
    loadServiceByEstablishmentData?.length === 0

  const loadSelectServiceAppointments = useMemo(() => {
    return createListCollection<{ id: string; name: string }>({
      items: loadServiceByEstablishmentData ?? [],
      itemToString: (service) => service.name,
      itemToValue: (service) => service.id,
    })
  }, [loadServiceByEstablishmentData])

  const onChangeService = (serviceId: string[]) => {
    setServiceId((prevState) => ({
      ...prevState,
      service_id: serviceId[0] ?? '',
    }))
  }

  const onChangeClearFilterService = () => {
    setServiceId({ service_id: '', page: 1 })
  }

  return {
    open,
    setOpen,
    serviceId,
    disabledSelectService,
    loadSelectServiceAppointments,
    isLoadingLoadServiceByEstablishment,
    onChangeService,
    onChangeClearFilterService,
  }
}
