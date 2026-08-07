import { createListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'
import { contentCss } from '@/theme/styles/global-styles'

const FilterBookingsService = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/bookings/',
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
          bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
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
          <Select.Content css={contentCss}>
            {loadSelectServiceBookings.items.map((service) => (
              <Select.Item
                item={service}
                key={service.id}
                rounded="xl"
                cursor="pointer"
                _hover={{
                  bg: { base: 'gray.100', _dark: 'secondary.600' },
                }}
              >
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
