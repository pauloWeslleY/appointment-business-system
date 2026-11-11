import {
  Alert,
  Box,
  Button,
  Card,
  EmptyState,
  GridItem,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { MapPinHouseIcon, PencilIcon } from 'lucide-react'

import Header from '@/components/layout/header'
import AddressSummary from '@/features/address/components/address-summary'
import { useAddressPage } from '@/features/address/hooks/use-address-page'
import FormCreateAddressPage from '@/features/address/pages/form-create-address.page'
import FormUpdateAddressPage from '@/features/address/pages/form-update-address.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/address/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.ADDRESS,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: AddressPage,
  head: () => ({
    meta: [
      {
        title: 'Endereço | Agendros',
      },
    ],
  }),
})

function AddressPage() {
  const {
    establishmentId,
    address,
    hasAddress,
    addressInEdition,
    addressError,
    isLoadingAddress,
    retryAddress,
    addressScopeKey,
    onEditAddress,
    onCancelEditAddress,
  } = useAddressPage()

  const isAddressResolved = !isLoadingAddress && !addressError
  const canCreateAddress = isAddressResolved && !hasAddress
  const isShowingRegisteredAddress = hasAddress && !addressInEdition

  return (
    <Box key={addressScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <Header.Icon icon={MapPinHouseIcon} />
        <Header.Title>Endereço</Header.Title>
      </Header.Root>

      <SimpleGrid columns={{ base: 1, lg: 5 }} gap="4" alignItems="start">
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Card.Root variant="outline" {...cardSectionCss}>
            <Card.Header px="0" pt="0" mb="4">
              <Card.Title>Endereço do Estabelecimento</Card.Title>
              <Card.Description>
                Local de atendimento exibido para os clientes.
              </Card.Description>
            </Card.Header>

            {addressError && (
              <Alert.Root status="error" rounded="lg">
                <Alert.Indicator />
                <Alert.Title>{addressError.message}</Alert.Title>
                <Button rounded="lg" onClick={retryAddress} size="sm">
                  Tentar novamente
                </Button>
              </Alert.Root>
            )}

            {isLoadingAddress && (
              <Stack gap="2" role="status" aria-label="Carregando endereço">
                <Skeleton height="6" rounded="lg" />
                <Skeleton height="6" rounded="lg" />
                <Skeleton height="6" rounded="lg" />
              </Stack>
            )}

            {canCreateAddress && (
              <EmptyState.Root size="sm">
                <EmptyState.Content>
                  <EmptyState.Indicator>
                    <MapPinHouseIcon />
                  </EmptyState.Indicator>
                  <EmptyState.Title>
                    Nenhum endereço cadastrado
                  </EmptyState.Title>
                  <EmptyState.Description>
                    O endereço não foi informado no cadastro do estabelecimento.
                    Cadastre-o ao lado.
                  </EmptyState.Description>
                </EmptyState.Content>
              </EmptyState.Root>
            )}

            {address && <AddressSummary address={address} />}
          </Card.Root>
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }}>
          {addressInEdition && (
            <Card.Root variant="outline" {...cardSectionCss}>
              <Card.Header px="0" pt="0" mb="4">
                <Card.Title>Edição de Endereço</Card.Title>
                <Card.Description>
                  Altere os dados do endereço vinculado ao estabelecimento.
                </Card.Description>
              </Card.Header>

              <FormUpdateAddressPage
                key={addressInEdition.id}
                address={addressInEdition}
                onCancel={onCancelEditAddress}
                onSaved={onCancelEditAddress}
              />
            </Card.Root>
          )}

          {isShowingRegisteredAddress && (
            <Alert.Root status="info" variant="surface" rounded="xl">
              <Alert.Indicator />
              <Stack>
                <Alert.Title>
                  Endereço já cadastrado para este estabelecimento.
                </Alert.Title>
                <Alert.Description>
                  Para alterar os dados, edite o endereço atual.
                </Alert.Description>
                <Button
                  size="sm"
                  rounded="lg"
                  variant="outline"
                  alignSelf="start"
                  onClick={onEditAddress}
                >
                  <Icon as={PencilIcon} boxSize="4" />
                  Editar endereço
                </Button>
              </Stack>
            </Alert.Root>
          )}

          {canCreateAddress && (
            <FormCreateAddressPage establishmentId={establishmentId} />
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}
