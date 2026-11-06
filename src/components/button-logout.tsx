import { Button, Icon, IconButton } from '@chakra-ui/react'
import { LogOut } from 'lucide-react'

import { useLogout } from '@/shared/hooks/use-logout'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

const ButtonLogout = () => {
  const { collapsed } = useMenuCollapse()
  const { handleLogout } = useLogout()

  return (
    <>
      {!collapsed && (
        <Button
          onClick={handleLogout}
          w="full"
          size="xs"
          rounded="lg"
          colorPalette="brand"
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
          colorPalette="primary"
          aria-label="Logout"
        >
          <Icon as={LogOut} boxSize="4" />
        </IconButton>
      )}
    </>
  )
}

export default ButtonLogout
