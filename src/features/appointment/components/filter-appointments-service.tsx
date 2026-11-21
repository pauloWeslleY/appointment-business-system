import { Portal, Select, Spinner } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'

import {
  contentCss,
  inputFieldCss,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useFilterServiceAppointment } from '../hooks/use-filter-service-appointment'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const FilterAppointmentsService = () => {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const {
    open,
    setOpen,
    serviceId,
    disabledSelectService,
    loadSelectServiceAppointments,
    isLoadingLoadServiceByEstablishment,
    onChangeService,
    onChangeClearFilterService,
  } = useFilterServiceAppointment(establishment.id)

  return (
    <Select.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      collection={loadSelectServiceAppointments}
      disabled={disabledSelectService}
      variant="subtle"
      size="sm"
      minW="0"
      maxW="full"
      w={{ base: 'full', md: '250px' }}
      value={[serviceId]}
      onValueChange={(e) => onChangeService(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger {...inputFieldCss}>
          <Select.ValueText placeholder="Selecione o serviço" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {isLoadingLoadServiceByEstablishment && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}

          {!isLoadingLoadServiceByEstablishment && (
            <Select.ClearTrigger onClick={onChangeClearFilterService} />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectServiceAppointments.items.map((service) => (
              <Select.Item item={service} key={service.id} css={menuItemCss}>
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
