import { Box, For, Icon, Tabs, useBreakpointValue } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import {
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
        search: (prev) => ({ ...prev, tab: MenuSettingsEstablishment.EDIT }),
      })
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Configurações do Estabelecimento' }],
  }),
})

function RouteComponent() {
  const [tabConfigEstablishment, setTabConfigEstablishment] = useQueryState(
    'tab',
    parseAsStringLiteral(MENU_SETTINGS_ESTABLISHMENT).withDefault(
      MenuSettingsEstablishment.EDIT,
    ),
  )

  const { member } = Route.useRouteContext()
  const slug = Route.useParams({ select: (params) => params.slug })
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'horizontal',
    lg: 'vertical',
  })

  return (
    <Box spaceY={{ base: '4', lg: '8' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Settings2} />
        <Header.Title>Configurações</Header.Title>
      </Header.Root>

      <Box spaceY="4">
        <Tabs.Root
          value={tabConfigEstablishment}
          onValueChange={(e) =>
            setTabConfigEstablishment(e.value as MenuSettingsEstablishmentType)
          }
          orientation={orientation}
          variant="plain"
          gap="4"
        >
          <Tabs.List
            flexWrap="wrap"
            {...cardSectionCss}
            bg={{ _light: 'slate.100', _dark: 'slate.950/40' }}
            border="1px solid"
            p="1.5"
            h="fit"
            minW="200px"
          >
            <For
              each={[
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
                <Tabs.Trigger key={item.value} value={item.value} rounded="lg">
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
            value={MenuSettingsEstablishment.EDIT}
            w="full"
            border="1px solid"
            {...cardSectionCss}
          >
            <FormUpdateEstablishmentPage establishmentSlug={slug} />
          </Tabs.Content>

          <Tabs.Content
            value={MenuSettingsEstablishment.UPLOAD}
            w="full"
            border="1px solid"
            {...cardSectionCss}
          >
            <UploadImageEstablishment establishmentSlug={slug} />
          </Tabs.Content>

          <Tabs.Content
            value={MenuSettingsEstablishment.ADDRESS}
            w="full"
            border="1px solid"
            {...cardSectionCss}
          >
            <FormUpdateEstablishmentAddressPage
              establishmentSlug={slug}
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
              establishmentSlug={slug}
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
              establishmentSlug={slug}
              memberContext={member.memberContext}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  )
}
