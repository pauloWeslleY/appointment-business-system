import { createListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'
import { contentCss } from '@/theme/styles/global-styles'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const FilterAppointmentsService = () => {
  const [open, setOpen] = useState(false)
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const [{ service_id: serviceId }, setServiceId] = useQueryStates(
    {
      service_id: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: true },
  )

  const loadServiceByEstablishment = useGetServiceByEstablishment(
    establishment.id,
    open || Boolean(serviceId),
  )

  const loadSelectServiceAppointments = createListCollection({
    items: loadServiceByEstablishment.data ?? [],
    itemToString: (service) => service.name,
    itemToValue: (service) => service.id,
  })

  const onChangeService = (serviceId: string[]) => {
    setServiceId({ service_id: serviceId[0] ?? null, page: 1 })
  }

  return (
    <Select.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      variant="subtle"
      size="sm"
      collection={loadSelectServiceAppointments}
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
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
            <Select.ClearTrigger
              onClick={() => setServiceId({ service_id: null, page: 1 })}
            />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectServiceAppointments.items.map((service) => (
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

export default FilterAppointmentsService
