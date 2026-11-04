import { Portal, Select, Spinner } from '@chakra-ui/react'

import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import { useSelectEstablishmentsByOrganization } from '../hooks/use-select-establishments-by-organization'

interface SelectEstablishmentsByOrganizationProps {
  organizationProfileId?: string
}

const SelectEstablishmentsByOrganization = ({
  organizationProfileId,
}: SelectEstablishmentsByOrganizationProps) => {
  const {
    isLoadingEstablishments,
    errorEstablishments,
    establishmentsByOrganizationSelected,
    loadSelectEstablishmentsByOrganization,
    onChangeSelectEstablishmentByOrganization,
  } = useSelectEstablishmentsByOrganization(organizationProfileId)

  if (errorEstablishments) {
    return <div>Ocorreu um erro ao carregar os estabelecimentos.</div>
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectEstablishmentsByOrganization}
      w="250px"
      value={[establishmentsByOrganizationSelected ?? '']}
      onValueChange={(e) => onChangeSelectEstablishmentByOrganization(e.value)}
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
          {isLoadingEstablishments && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectEstablishmentsByOrganization.items.map(
              (establishment) => (
                <Select.Item
                  key={establishment.id}
                  item={establishment}
                  {...menuItemCss}
                >
                  {establishment.name}
                  <Select.ItemIndicator />
                </Select.Item>
              ),
            )}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectEstablishmentsByOrganization
