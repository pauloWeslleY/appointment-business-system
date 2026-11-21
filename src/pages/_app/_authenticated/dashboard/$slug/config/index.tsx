import { Box, For, Icon, Tabs } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  ClipboardIcon,
  LinkIcon,
  MapPin,
  PaletteIcon,
  PencilIcon,
  Settings2,
  UploadCloud,
} from 'lucide-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import z from 'zod'

import Header from '@/components/layout/header'
import SummaryEstablishment from '@/features/establishment/components/summary-establishment'
import {
  MENU_SETTINGS_ESTABLISHMENT,
  MenuSettingsEstablishment,
  type MenuSettingsEstablishmentType,
} from '@/features/establishment/constants/menu-tab-establishment-update'
import EstablishmentColorsSettingsPage from '@/features/establishment/pages/establishment-colors-settings.page'
import EstablishmentLinksSettingsPage from '@/features/establishment/pages/establishment-links-settings.page'
import FormUpdateEstablishmentPage from '@/features/establishment/pages/form-update-establishment.page'
import FormUpdateEstablishmentAddressPage from '@/features/establishment/pages/form-update-establishment-address.page'
import UploadImageEstablishment from '@/features/establishment/pages/upload-image-establishment.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/config/',
)({
  validateSearch: z.object({
    tab: z.enum(MENU_SETTINGS_ESTABLISHMENT).optional().catch(undefined),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.tab) {
      throw redirect({
        to: '/dashboard/$slug/config',
        params: { slug: params.slug },
        search: (prev) => ({ ...prev, tab: MenuSettingsEstablishment.SUMMARY }),
      })
    }
  },
  component: EstablishmentSettingsPage,
  head: () => ({
    meta: [
      {
        title: 'Configurações do Estabelecimento | Agendros',
      },
    ],
  }),
})

function EstablishmentSettingsPage() {
  const [tabConfigEstablishment, setTabConfigEstablishment] = useQueryState(
    'tab',
    parseAsStringLiteral(MENU_SETTINGS_ESTABLISHMENT).withDefault(
      MenuSettingsEstablishment.SUMMARY,
    ),
  )

  const { member } = Route.useRouteContext()
  const establishmentSlug = Route.useParams({ select: (params) => params.slug })

  return (
    <Box spaceY={{ base: '4', lg: '8' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Settings2} />
        <Header.Title>Configurações</Header.Title>
      </Header.Root>

      <Tabs.Root
        size="sm"
        value={tabConfigEstablishment}
        onValueChange={(tabsValueChange) =>
          setTabConfigEstablishment(
            tabsValueChange.value as MenuSettingsEstablishmentType,
          )
        }
      >
        <Tabs.List
          aria-label="Menu de settings"
          flexWrap="wrap"
          borderColor={{ _light: 'gray.100', _dark: 'slate.900' }}
          mb="2"
          mx="1.5"
        >
          <For
            each={[
              {
                label: 'Resumo',
                value: MenuSettingsEstablishment.SUMMARY,
                icon: ClipboardIcon,
              },
              {
                label: 'Editar',
                value: MenuSettingsEstablishment.EDIT,
                icon: PencilIcon,
              },
              {
                label: 'Upload',
                value: MenuSettingsEstablishment.UPLOAD,
                icon: UploadCloud,
              },
              {
                label: 'Links',
                value: MenuSettingsEstablishment.LINKS,
                icon: LinkIcon,
              },
              {
                label: 'Cores',
                value: MenuSettingsEstablishment.COLORS,
                icon: PaletteIcon,
              },
              {
                label: 'Endereço',
                value: MenuSettingsEstablishment.ADDRESS,
                icon: MapPin,
              },
            ]}
          >
            {(item) => (
              <Tabs.Trigger
                key={item.value}
                value={item.value}
                justifyContent="center"
                rounded="lg"
              >
                <Icon
                  as={item.icon}
                  boxSize="4"
                  color={{ _light: 'sea.700', _dark: 'sea.300' }}
                />
                {item.label}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>

        <Tabs.Content
          value={MenuSettingsEstablishment.SUMMARY}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <SummaryEstablishment />
        </Tabs.Content>

        <Tabs.Content
          value={MenuSettingsEstablishment.EDIT}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <FormUpdateEstablishmentPage establishmentSlug={establishmentSlug} />
        </Tabs.Content>

        <Tabs.Content
          value={MenuSettingsEstablishment.UPLOAD}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <UploadImageEstablishment establishmentSlug={establishmentSlug} />
        </Tabs.Content>

        <Tabs.Content
          value={MenuSettingsEstablishment.ADDRESS}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <FormUpdateEstablishmentAddressPage
            establishmentSlug={establishmentSlug}
            member={member.memberContext}
          />
        </Tabs.Content>

        <Tabs.Content
          value={MenuSettingsEstablishment.LINKS}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <EstablishmentLinksSettingsPage
            establishmentSlug={establishmentSlug}
            memberContext={member.memberContext}
          />
        </Tabs.Content>

        <Tabs.Content
          value={MenuSettingsEstablishment.COLORS}
          w="full"
          border="1px solid"
          {...cardSectionCss}
        >
          <EstablishmentColorsSettingsPage
            establishmentSlug={establishmentSlug}
            memberContext={member.memberContext}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
