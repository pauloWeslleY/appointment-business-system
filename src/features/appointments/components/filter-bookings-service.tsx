import { createListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'

const FilterBookingsService = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const [serviceId, setServiceId] = useQueryState(
    'service_id',
    parseAsString.withDefault(''),
  )

  const loadServiceByEstablishment =
    useGetServiceByEstablishment(establishmentId)

  const loadSelectServiceBookings = createListCollection({
    items: loadServiceByEstablishment.data ?? [],
    itemToString: (service) => service.name,
    itemToValue: (service) => service.id,
  })

  const onChangeService = (serviceId: string[]) => {
    setServiceId(serviceId[0])
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectServiceBookings}
      w="250px"
      value={[serviceId]}
      onValueChange={(e) => onChangeService(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
        >
          <Select.ValueText placeholder="Selecione o serviço" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {loadServiceByEstablishment.isLoading && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}

          {!loadServiceByEstablishment.isLoading && (
            <Select.ClearTrigger onClick={() => setServiceId(null)} />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            rounded="lg"
          >
            {loadSelectServiceBookings.items.map((service) => (
              <Select.Item item={service} key={service.id} rounded="lg">
                {service.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterBookingsService
