import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

import { toaster } from '@/components/ui/toaster'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { contentCss } from '@/theme/styles/global-styles'

import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model copy'
import DialogStatusServiceEstablishment from './dialog-status-service-establishment'

interface MenuActionServicesTableProps {
  service: ListServicesEstablishmentModel
}

const MenuActionServicesTable = ({ service }: MenuActionServicesTableProps) => {
  const [
    isOpenDialogStatusServiceEstablishment,
    setIsOpenDialogStatusServiceEstablishment,
  ] = useState(false)
  const navigate = useNavigate()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/',
  })

  const handleNavigateToService = (page: 'edit' | 'info') => {
    navigate({
      to: `/dashboard/$establishmentId/services/$serviceEstablishmentId/${page}`,
      params: {
        establishmentId,
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
                cursor={!service.status ? 'not-allowed' : 'pointer'}
                disabled={!service.status}
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
                onClick={() => {
                  if (!service.status) {
                    toaster.error({
                      title: 'Serviço inativo',
                      description:
                        'Não é possível editar um serviço que está inativo.',
                    })
                    return
                  }
                  handleNavigateToService('edit')
                }}
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
