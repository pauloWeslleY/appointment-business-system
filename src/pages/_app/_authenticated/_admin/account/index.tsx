import { Alert, Box, For, Icon, Tabs } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ShieldCogCornerIcon,
  ShieldIcon,
  User2Icon,
  UserCog,
  UserSquareIcon,
} from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { z } from 'zod'

import Header from '@/components/layout/header'
import AdditionalSummaryMember from '@/features/users/components/additional-summary-member'
import ProfileSummaryPermissions from '@/features/users/components/profile-summary-permissions'
import { MenuAccount } from '@/features/users/constants/menu-account'
import FormChangePassword from '@/features/users/pages/form-change-password'
import Profile from '@/features/users/pages/profile'
import { validateSignInWithCredential } from '@/features/users/services/validate-sign-in-with-credential'

export const Route = createFileRoute('/_app/_authenticated/_admin/account/')({
  validateSearch: z.object({
    menu: z.string().optional().default(MenuAccount.PROFILE),
  }),
  loader: async () => await validateSignInWithCredential(),
  component: AccountPage,
  head: () => ({
    meta: [
      {
        title: 'Conta | Agendros',
      },
    ],
  }),
})

function AccountPage() {
  const { hasSignInWithCredential } = Route.useLoaderData()
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
        value={menuProfile}
        onValueChange={(e) => setMenuProfile(e.value)}
      >
        <Tabs.List
          flexWrap="wrap"
          borderColor={{ _light: 'gray.100', _dark: 'slate.900' }}
        >
          <For
            each={[
              {
                value: MenuAccount.PROFILE,
                label: 'Perfil',
                icon: User2Icon,
              },
              {
                value: MenuAccount.MEMBER,
                label: 'Membro',
                icon: UserSquareIcon,
              },
              {
                value: MenuAccount.PERMISSIONS,
                label: 'Permissões',
                icon: ShieldCogCornerIcon,
              },
              {
                value: MenuAccount.CHANGE_PASSWORD,
                label: 'Segurança',
                icon: ShieldIcon,
              },
            ]}
          >
            {({ value, label, icon }) => (
              <Tabs.Trigger key={value} value={value}>
                <Icon
                  as={icon}
                  boxSize="4"
                  color={{ _light: 'sea.700', _dark: 'sea.300' }}
                  mr="2"
                />
                {label}
              </Tabs.Trigger>
            )}
          </For>
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
          {!hasSignInWithCredential && (
            <Alert.Root variant="surface" status="warning" rounded="lg">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Para alterar a senha</Alert.Title>
                <Alert.Description>
                  você precisa ter credenciais de login configuradas.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          {hasSignInWithCredential && <FormChangePassword />}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
