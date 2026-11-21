import { Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

import { toaster } from '@/components/ui/toaster'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import DialogStatusServiceEstablishment from './dialog-status-service-establishment'

interface MenuActionServicesTableProps {
  service: ListServicesEstablishmentModel
  isViewServiceActionVisible?: boolean
}

const MenuActionServicesTable = ({
  service,
  isViewServiceActionVisible = true,
}: MenuActionServicesTableProps) => {
  const [
    isOpenDialogStatusServiceEstablishment,
    setIsOpenDialogStatusServiceEstablishment,
  ] = useState(false)
  const slugEstablishment = useParams({
    from: '/_app/_authenticated/dashboard/$slug/services/',
    select: (params) => params.slug,
  })
  const navigate = useNavigate()

  const handleNavigateToService = (page: 'edit' | 'info') => {
    if (!service.status && page === 'edit') {
      toaster.error({
        title: 'Serviço inativo',
        description: 'Não é possível editar um serviço que está inativo.',
      })
      return
    }

    navigate({
      to: `/dashboard/$slug/services/$serviceEstablishmentId/${page}`,
      params: {
        slug: slugEstablishment,
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
                cursor={!service.status ? 'not-allowed' : 'pointer'}
                disabled={!service.status}
                {...menuItemCss}
                onClick={() => handleNavigateToService('edit')}
              >
                Editar serviço
              </Menu.Item>
              {isViewServiceActionVisible && (
                <Menu.Item
                  value="info"
                  onClick={() => handleNavigateToService('info')}
                  {...menuItemCss}
                >
                  Visualizar serviço
                </Menu.Item>
              )}
              <Menu.Item
                value="status"
                onClick={() => setIsOpenDialogStatusServiceEstablishment(true)}
                {...menuItemCss}
              >
                Alterar status do serviço
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
