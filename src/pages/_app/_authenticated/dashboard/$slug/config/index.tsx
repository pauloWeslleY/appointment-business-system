import { Box, For, Icon, Tabs, useBreakpointValue } from '@chakra-ui/react'
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
import { EstablishmentSettingsRouteSearchSchema } from '@/features/establishment/schemas/establishment-settings-route-search.schema'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/config/',
)({
  validateSearch: EstablishmentSettingsRouteSearchSchema,
  beforeLoad: ({ search, params }) => {
    if (!search.tab) {
      throw redirect({
        to: '/dashboard/$slug/config',
        params: { slug: params.slug },
        search: (prev) => ({ ...prev, tab: MenuSettingsEstablishment.EDIT }),
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
      MenuSettingsEstablishment.EDIT,
    ),
  )

  const { member } = Route.useRouteContext()
  const establishmentSlug = Route.useParams({ select: (params) => params.slug })
  const settingsTabsOrientation = useBreakpointValue<'horizontal' | 'vertical'>(
    {
      base: 'horizontal',
      lg: 'vertical',
    },
  )

  return (
    <Box spaceY={{ base: '4', lg: '8' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Settings2} />
        <Header.Title>Configurações</Header.Title>
      </Header.Root>

      <Box spaceY="4">
        <Tabs.Root
          value={tabConfigEstablishment}
          onValueChange={(tabsValueChange) =>
            setTabConfigEstablishment(
              tabsValueChange.value as MenuSettingsEstablishmentType,
            )
          }
          orientation={settingsTabsOrientation}
          variant="plain"
          gap="4"
          minW="0"
        >
          <Tabs.List
            {...cardSectionCss}
            gap="2"
            bg={{ _light: 'slate.100', _dark: 'slate.950/40' }}
            border="1px solid"
            p="1.5"
            h="fit"
            w={{ base: 'full', lg: 'auto' }}
            maxW="full"
            minW={{ base: '0', lg: '200px' }}
            mb={{ base: '2', md: '0' }}
            overflowX={{ base: 'auto', lg: 'visible' }}
            overflowY="hidden"
            scrollSnapType={{ base: 'x mandatory', lg: 'none' }}
            scrollbarWidth="none"
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
            }}
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
                  rounded="lg"
                  flexShrink="0"
                  minW="max-content"
                  whiteSpace="nowrap"
                  scrollSnapAlign="start"
                >
                  <Icon as={item.icon} boxSize="4" />
                  {item.label}
                </Tabs.Trigger>
              )}
            </For>
            <Tabs.Indicator
              shadow="none"
              rounded="lg"
              bg={{ _light: 'navy.100', _dark: 'navy.950/40' }}
              borderLeft="4px solid"
              borderLeftColor={{ _light: 'navy.300', _dark: 'navy.700' }}
            />
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
            <FormUpdateEstablishmentPage
              establishmentSlug={establishmentSlug}
            />
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
    </Box>
  )
}
