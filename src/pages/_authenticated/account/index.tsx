import { Box, For, Tabs } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserCog } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { z } from 'zod'

import Header from '@/components/layout/header'
import AdditionalSummaryMember from '@/features/users/components/additional-summary-member'
import ProfileSummaryPermissions from '@/features/users/components/profile-summary-permissions'
import Profile from '@/features/users/pages/profile'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/account/')({
  validateSearch: z.object({
    menu: z.string().optional().default('profile'),
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
          flexWrap="wrap"
          {...cardSectionCss}
          bg={{ _light: 'slate.100', _dark: 'slate.950/40' }}
          border="1px solid"
          p="1.5"
          h="fit"
        >
          <For
            each={[
              { value: 'profile', label: 'Perfil' },
              { value: 'member', label: 'Membro' },
              { value: 'permissions', label: 'Permissões' },
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
            roundedTopLeft="lg"
            roundedTopRight="lg"
            bg={{ _light: 'navy.100', _dark: 'navy.950/40' }}
            borderBottom="4px solid"
            borderBottomColor={{ _light: 'navy.300', _dark: 'navy.700' }}
          />
        </Tabs.List>

        <Tabs.Content value="profile" w="full">
          <Profile />
        </Tabs.Content>
        <Tabs.Content value="member" w="full">
          <AdditionalSummaryMember />
        </Tabs.Content>
        <Tabs.Content value="permissions" w="full">
          <ProfileSummaryPermissions />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
