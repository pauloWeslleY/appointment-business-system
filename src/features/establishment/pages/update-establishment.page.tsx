import { For, Icon, Tabs } from '@chakra-ui/react'
import { MapPin, PencilIcon, UploadCloud } from 'lucide-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import {
  MENU_UPDATE_ESTABLISHMENT,
  MenuUpdateEstablishment,
  type MenuUpdateEstablishmentType,
} from '../constants/menu-tab-establishment-update'
import FormUpdateEstablishment from './form-update-establishment.page'
import FormUpdateEstablishmentAddressPage from './form-update-establishment-address.page'
import UploadImageEstablishment from './upload-image-establishment.page'

const UpdateEstablishmentPage = () => {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(MENU_UPDATE_ESTABLISHMENT).withDefault(
      MenuUpdateEstablishment.EDIT,
    ),
  )

  return (
    <Tabs.Root
      size="sm"
      value={tab}
      onValueChange={(e) => setTab(e.value as MenuUpdateEstablishmentType)}
      colorPalette={colorDefaultTheme}
      variant="subtle"
    >
      <Tabs.List
        aria-label="Establishment updated menu"
        w={{ base: 'full', lg: 'md' }}
      >
        <For
          each={[
            {
              label: 'Editar',
              value: MenuUpdateEstablishment.EDIT,
              icon: PencilIcon,
            },
            {
              label: 'Upload',
              value: MenuUpdateEstablishment.UPLOAD,
              icon: UploadCloud,
            },
            {
              label: 'Endereço',
              value: MenuUpdateEstablishment.ADDRESS,
              icon: MapPin,
            },
          ]}
        >
          {(item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              flex="1"
              justifyContent="center"
              rounded="lg"
            >
              <Icon as={item.icon} boxSize="4" />
              {item.label}
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>

      <Tabs.Content value={MenuUpdateEstablishment.EDIT}>
        <FormUpdateEstablishment />
      </Tabs.Content>

      <Tabs.Content value={MenuUpdateEstablishment.UPLOAD}>
        <UploadImageEstablishment />
      </Tabs.Content>

      <Tabs.Content value={MenuUpdateEstablishment.ADDRESS}>
        <FormUpdateEstablishmentAddressPage />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default UpdateEstablishmentPage
