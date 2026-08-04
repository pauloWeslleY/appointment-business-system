import { Button, CloseButton, DataList, Dialog, Portal } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Status } from '@/components/ui/status'
import { mapGenderLabel } from '@/shared/constants/map-label-gender-customer'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { cardSectionCss, contentCss } from '@/theme/styles/global-styles'

import type { CustomerModel } from '../types/customer.model'

interface SidebarInfoCustomerProps {
  customer: CustomerModel
  open: boolean
  onOpen: (open: boolean) => void
}

const SidebarInfoCustomer = ({
  customer,
  open,
  onOpen,
}: SidebarInfoCustomerProps) => {
  const loadInfoCustomer = [
    { label: 'Nome', value: customer.name },
    { label: 'Email', value: customer.email },
    {
      label: 'Telefone',
      value: customer.phones.map(formattedPhone).join(', '),
    },
    { label: 'Sexo', value: mapGenderLabel[customer.gender] },
    { label: 'Data de Nascimento', value: customer.birthDate },
    { label: 'Status', value: customer.active },
    {
      label: 'Data de Cadastro',
      value: dayjs(customer?.createdAt).format('DD/MM/YYYY'),
    },
    { label: 'Observações', value: customer.notes ?? 'Nenhuma observação' },
  ]

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
              <Dialog.Title>Atualizar Cliente</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body py="0">
              <DataList.Root
                orientation="vertical"
                gap="4"
                display="grid"
                gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                css={cardSectionCss}
                p="2"
                borderWidth="1px"
              >
                {loadInfoCustomer.map((item) => (
                  <DataList.Item
                    key={item.label}
                    gridColumn={{
                      md: item.label === 'Observações' ? 'span 2' : 'span 1',
                    }}
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
                ))}
              </DataList.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="red"
                  rounded="xl"
                >
                  Cancelar
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
