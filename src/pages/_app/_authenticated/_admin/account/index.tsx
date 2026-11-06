import { Box, For, Tabs } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserCog } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { z } from 'zod'

import Header from '@/components/layout/header'
import AdditionalSummaryMember from '@/features/users/components/additional-summary-member'
import ProfileSummaryPermissions from '@/features/users/components/profile-summary-permissions'
import { MenuAccount } from '@/features/users/constants/menu-account'
import FormChangePassword from '@/features/users/pages/form-change-password'
import Profile from '@/features/users/pages/profile'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_app/_authenticated/_admin/account/')({
  validateSearch: z.object({
    menu: z.string().optional().default(MenuAccount.PROFILE),
  }),
  component: AccountPage,
  head: () => ({
    meta: [{ title: 'Conta' }],
  }),
})

function AccountPage() {
  const search = Route.useSearch()
  const [menuProfile, setMenuProfile] = useQueryState(
    'menu',
    parseAsString.withDefault(search.menu),
  )

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center">
        <Header.Icon icon={UserCog} />
        <Header.Title>Conta</Header.Title>
      </Header.Root>

      <Tabs.Root
        variant="plain"
        value={menuProfile}
        onValueChange={(e) => setMenuProfile(e.value)}
      >
        <Tabs.List
          {...cardSectionCss}
          flexWrap="wrap"
          bg={{ _light: 'slate.100', _dark: 'slate.950/40' }}
          border="1px solid"
          p="2"
          h="fit"
        >
          <For
            each={[
              { value: MenuAccount.PROFILE, label: 'Perfil' },
              { value: MenuAccount.MEMBER, label: 'Membro' },
              { value: MenuAccount.PERMISSIONS, label: 'Permissões' },
              { value: MenuAccount.CHANGE_PASSWORD, label: 'Alterar Senha' },
            ]}
          >
            {({ value, label }) => (
              <Tabs.Trigger key={value} value={value} minH="10">
                {label}
              </Tabs.Trigger>
            )}
          </For>
          <Tabs.Indicator
            shadow="none"
            rounded="lg"
            bg={{ _light: 'navy.100', _dark: 'navy.950/40' }}
            outlineOffset="2px"
            outline="2px solid"
            outlineColor={{ _light: 'navy.300', _dark: 'navy.700' }}
          />
        </Tabs.List>

        <Tabs.Content value={MenuAccount.PROFILE} w="full">
          <Profile />
        </Tabs.Content>
        <Tabs.Content value={MenuAccount.MEMBER} w="full">
          <AdditionalSummaryMember />
        </Tabs.Content>
        <Tabs.Content value={MenuAccount.PERMISSIONS} w="full">
          <ProfileSummaryPermissions />
        </Tabs.Content>
        <Tabs.Content value={MenuAccount.CHANGE_PASSWORD} w="full">
          <FormChangePassword />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
