import { Button, Icon, IconButton } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { authClient } from '@/shared/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

import { toaster } from './ui/toaster'

const ButtonLogout = () => {
  const { collapsed } = useMenuCollapse()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/login' })
        },
        onError: ({ error }) => {
          toaster.error({
            title: mapErrorsLabel[error.code] || 'Erro ao realizar logout',
          })
        },
      },
    })
  }

  return (
    <>
      {!collapsed && (
        <Button
          onClick={handleLogout}
          size="sm"
          rounded="xl"
          variant="outline"
          w="full"
          color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
          borderColor={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
          _hover={{
            bg: { base: 'colorPalette.400/10', _dark: 'colorPalette.800' },
          }}
        >
          <Icon as={LogOut} boxSize="4" />
          Sair
        </Button>
      )}

      {collapsed && (
        <IconButton
          onClick={handleLogout}
          size="sm"
          rounded="xl"
          variant="outline"
          aria-label="Logout"
        >
          <Icon as={LogOut} boxSize="4" />
        </IconButton>
      )}
    </>
  )
}

export default ButtonLogout
