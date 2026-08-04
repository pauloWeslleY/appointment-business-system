import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { contentCss } from '@/theme/styles/global-styles'

import type { ServiceEstablishmentModel } from '../types/service-esatablishment.model'
import DialogStatusServiceEstablishment from './dialog-status-service-establishment'

interface MenuActionServicesTableProps {
  service: ServiceEstablishmentModel
}

const MenuActionServicesTable = ({ service }: MenuActionServicesTableProps) => {
  const [
    isOpenDialogStatusServiceEstablishment,
    setIsOpenDialogStatusServiceEstablishment,
  ] = useState(false)
  const navigate = useNavigate()

  const handleNavigateToService = (page: 'edit' | 'info') => {
    navigate({
      to: `/dashboard/$establishmentId/services/$serviceEstablishmentId/${page}`,
      params: {
        establishmentId: service.establishmentId,
        serviceEstablishmentId: service.id,
      },
    })
  }

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            size="xs"
            variant="ghost"
            aria-label="Menu serviço"
            rounded="full"
            colorPalette={colorDefaultTheme}
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
            <Menu.Content css={contentCss}>
              <Menu.Item
                value="edit"
                rounded="xl"
                cursor="pointer"
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
                onClick={() => handleNavigateToService('edit')}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                value="info"
                rounded="xl"
                cursor="pointer"
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
                onClick={() => handleNavigateToService('info')}
              >
                Visualizar
              </Menu.Item>
              <Menu.Item
                value="status"
                rounded="xl"
                cursor="pointer"
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
                onClick={() => setIsOpenDialogStatusServiceEstablishment(true)}
              >
                Status
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <DialogStatusServiceEstablishment
        service={service}
        open={isOpenDialogStatusServiceEstablishment}
        onOpen={setIsOpenDialogStatusServiceEstablishment}
      />
    </>
  )
}

export default MenuActionServicesTable
