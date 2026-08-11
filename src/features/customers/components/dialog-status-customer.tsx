import {
  Badge,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Icon,
  Portal,
  Text,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Save } from 'lucide-react'

import { toaster } from '@/components/ui/toaster'
import { contentCss } from '@/theme/styles/global-styles'

import { customersMutationOptions } from '../queries/customers-mutation-key'
import { customersQueryKeys } from '../queries/customers-query-key'
import type { CustomerModel } from '../types/customer.model'

interface DialogStatusCustomerProps {
  customer: CustomerModel
  open: boolean
  onOpen: (open: boolean) => void
}

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')
const DialogStatusCustomer = ({
  customer,
  open,
  onOpen,
}: DialogStatusCustomerProps) => {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()

  const { mutate: mutateStatusCustomer, isPending: isPendingStatusCustomer } =
    useMutation({
      ...customersMutationOptions.status(),
      onSuccess: (updateStatusCustomer) => {
        queryClient.setQueryData<CustomerModel[]>(
          customersQueryKeys.establishment(establishment.id),
          (listCustomersCache) => {
            if (!listCustomersCache) return []

            return listCustomersCache.map((customer) =>
              customer.id === updateStatusCustomer.id
                ? { ...updateStatusCustomer }
                : customer,
            )
          },
        )
        toaster.success({ title: 'Status do cliente atualizado com sucesso!' })
        onOpen(false)
      },
      onError: (error) => {
        toaster.error({
          title: 'Erro ao atualizar status do cliente',
          description: error.message,
        })
      },
    })

  const handleStatusCustomer = () => {
    mutateStatusCustomer({ id: customer.id, active: !customer.active })
  }

  return (
    <Dialog.Root
      role="alertdialog"
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Atualizar status do cliente</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex mb="2" align="center" gap="2">
                <Text>Status atual:</Text>
                <Badge colorPalette={customer.active ? 'green' : 'red'}>
                  {customer.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </Flex>
              <p>
                Tem certeza de que deseja atualizar o status do cliente "
                <strong>{customer.name}</strong>"?
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button size="sm" variant="surface" rounded="xl">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                variant="surface"
                rounded="xl"
                colorPalette={customer.active ? 'red' : 'green'}
                loading={isPendingStatusCustomer}
                onClick={handleStatusCustomer}
              >
                <Icon as={Save} boxSize="4" />
                {customer.active ? 'Inativar' : 'Ativar'} status
              </Button>
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

export default DialogStatusCustomer
