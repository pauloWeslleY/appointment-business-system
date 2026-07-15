import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { EllipsisVertical } from 'lucide-react'

import type { ServiceEstablishmentModel } from '@/shared/services/service-establishment/service-establishment.dto'

interface MenuActionServicesTableProps {
  service: ServiceEstablishmentModel
}

const MenuActionServicesTable = ({ service }: MenuActionServicesTableProps) => {
  console.log('service', service)

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Menu serviço"
          rounded="full"
          colorPalette="gray"
        >
          <Icon
            as={EllipsisVertical}
            boxSize="4"
            color={{ base: 'gray.700', _dark: 'gray.200' }}
          />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
            bg={{ base: 'white', _dark: 'gray.900' }}
            rounded="md"
          >
            <Menu.Item value="rename" rounded="md" cursor="pointer">
              Editar
            </Menu.Item>
            <Menu.Item value="export" rounded="md" cursor="pointer">
              Visualizar
            </Menu.Item>
            <Menu.Item
              value="delete"
              color="fg.error"
              _hover={{ bg: 'bg.error', color: 'fg.error' }}
              rounded="md"
              cursor="pointer"
            >
              Excluir
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default MenuActionServicesTable
