import {
  Button,
  CloseButton,
  DataList,
  Dialog,
  For,
  Portal,
} from '@chakra-ui/react'

import { Status } from '@/components/ui/status'
import { mapGenderLabel } from '@/shared/constants/map-label-gender-customer'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { contentCss } from '@/theme/styles/global-styles'

import type { CustomerApiResponse } from '../types/customer-response.api.type'

interface SidebarInfoCustomerProps {
  customer: CustomerApiResponse
  open: boolean
  onOpen: (open: boolean) => void
}

const SidebarInfoCustomer = ({
  customer,
  open,
  onOpen,
}: SidebarInfoCustomerProps) => {
  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      size="lg"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Informações do Cliente</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body py="0">
              <DataList.Root
                orientation="vertical"
                gap="4"
                display="grid"
                gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              >
                <For
                  each={[
                    {
                      label: 'Nome',
                      value: customer.name,
                    },
                    {
                      label: 'E-mail',
                      value: customer.email,
                    },
                    {
                      label: 'Sexo',
                      value: customer.gender
                        ? mapGenderLabel[customer.gender]
                        : 'N/A',
                    },
                    {
                      label: 'Status',
                      value: customer.status,
                    },
                    {
                      label: 'Data de Nascimento',
                      value: customer.birthDate
                        ? formattedDateAndHours(customer.birthDate)
                        : 'N/A',
                    },
                    {
                      label: 'Data de Cadastro',
                      value: formattedDateAndHours(customer.createdAt),
                    },
                    {
                      label: 'Telefone',
                      value:
                        customer.phones.length > 0
                          ? customer.phones.map(formattedPhone).join(', ')
                          : 'N/A',
                    },
                    {
                      label: 'Observações',
                      value: customer.notes ?? 'N/A',
                      fullWidth: true,
                    },
                  ]}
                >
                  {(item) => (
                    <DataList.Item
                      key={item.label}
                      gridColumn={{ md: item.fullWidth ? '1 / -1' : 'auto' }}
                    >
                      <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                      <DataList.ItemValue>
                        {typeof item.value === 'boolean' ? (
                          <Status value={item.value ? 'success' : 'error'}>
                            {item.value ? 'Ativo' : 'Inativo'}
                          </Status>
                        ) : (
                          item.value
                        )}
                      </DataList.ItemValue>
                    </DataList.Item>
                  )}
                </For>
              </DataList.Root>
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="red"
                  rounded="lg"
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default SidebarInfoCustomer
