import { For, Icon, Tabs } from '@chakra-ui/react'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { MapPin, PencilIcon, UploadCloud } from 'lucide-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import {
  MENU_UPDATE_ESTABLISHMENT,
  MenuUpdateEstablishment,
  type MenuUpdateEstablishmentType,
} from '../constants/menu-tab-establishment-update'
import FormUpdateEstablishmentPage from './form-update-establishment.page'
import FormUpdateEstablishmentAddressPage from './form-update-establishment-address.page'
import UploadImageEstablishment from './upload-image-establishment.page'

const UpdateEstablishmentPage = () => {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(MENU_UPDATE_ESTABLISHMENT).withDefault(
      MenuUpdateEstablishment.EDIT,
    ),
  )

  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const slug = useParams({
    from: '/_app/_authenticated/_admin/establishment/_routes/$establishmentSlug/',
    select: (params) => params.establishmentSlug,
  })

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
        w="full"
        flexWrap="wrap"
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
              flex={{ base: '1 1 100%', sm: '1 1 auto' }}
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
        <FormUpdateEstablishmentPage establishmentSlug={slug} />
      </Tabs.Content>

      <Tabs.Content value={MenuUpdateEstablishment.UPLOAD}>
        <UploadImageEstablishment establishmentSlug={slug} />
      </Tabs.Content>

      <Tabs.Content value={MenuUpdateEstablishment.ADDRESS}>
        <FormUpdateEstablishmentAddressPage
          establishmentSlug={slug}
          member={memberContext}
        />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default UpdateEstablishmentPage
