import {
  Alert,
  Box,
  Button,
  Card,
  EmptyState,
  For,
  GridItem,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Clock2Icon } from 'lucide-react'

import Header from '@/components/layout/header'
import DialogDeleteOpeningHours from '@/features/opening-hours/components/dialog-delete-opening-hours'
import ListOpeningHours from '@/features/opening-hours/components/list-opening-hours'
import { useOpeningHoursPage } from '@/features/opening-hours/hooks/use-opening-hours-page'
import FormCreateOpeningHoursPage from '@/features/opening-hours/pages/form-create-opening-hours.page'
import FormUpdateOpeningHoursPage from '@/features/opening-hours/pages/form-update-opening-hours.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/opening-hours/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.OPENING_HOURS,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: OpeningHoursPage,
  head: () => ({
    meta: [
      {
        title: 'Horários de Funcionamento | Agendros',
      },
    ],
  }),
})

function OpeningHoursPage() {
  const {
    establishmentId,
    openingHours,
    openingHoursInEdition,
    openingHoursToDelete,
    openingHoursError,
    isLoadingOpeningHours,
    retryOpeningHours,
    openingHoursScopeKey,
    isDeleteDialogOpen,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange,
  } = useOpeningHoursPage()

  const hasOpeningHours = openingHours.length > 0
  const hasNoOpeningHours =
    !isLoadingOpeningHours && !openingHoursError && !hasOpeningHours

  return (
    <Box key={openingHoursScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Clock2Icon} />
        <Header.Title>Horários</Header.Title>
      </Header.Root>

      <SimpleGrid columns={{ base: 1, lg: 5 }} gap="4" alignItems="start">
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Card.Root variant="outline" {...cardSectionCss}>
            <Card.Header px="0" pt="0" mb="4">
              <Card.Title>Horários de Funcionamento</Card.Title>
              <Card.Description>
                Intervalos em que o estabelecimento atende, por dia da semana.
              </Card.Description>
            </Card.Header>

            {openingHoursError && (
              <Alert.Root status="error" rounded="lg">
                <Alert.Indicator />
                <Alert.Title>{openingHoursError.message}</Alert.Title>
                <Button rounded="lg" onClick={retryOpeningHours} size="sm">
                  Tentar novamente
                </Button>
              </Alert.Root>
            )}

            {isLoadingOpeningHours && (
              <Stack gap="2" role="status" aria-label="Carregando horários">
                <For each={[1, 2, 3]}>
                  {(item) => <Skeleton key={item} height="14" rounded="xl" />}
                </For>
              </Stack>
            )}

            {hasNoOpeningHours && (
              <EmptyState.Root size="sm">
                <EmptyState.Content>
                  <EmptyState.Indicator>
                    <Clock2Icon />
                  </EmptyState.Indicator>
                  <EmptyState.Title>Nenhum horário cadastrado</EmptyState.Title>
                  <EmptyState.Description>
                    Cadastre o primeiro horário de funcionamento ao lado.
                  </EmptyState.Description>
                </EmptyState.Content>
              </EmptyState.Root>
            )}

            {hasOpeningHours && (
              <ListOpeningHours
                openingHours={openingHours}
                selectedOpeningHoursId={openingHoursInEdition?.id}
                onEdit={onEditOpeningHours}
                onDelete={onDeleteOpeningHours}
              />
            )}
          </Card.Root>
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }}>
          {openingHoursInEdition && (
            <FormUpdateOpeningHoursPage
              key={openingHoursInEdition.id}
              openingHours={openingHoursInEdition}
              establishmentId={establishmentId}
              onCancel={onCancelEditOpeningHours}
              onSaved={onCancelEditOpeningHours}
            />
          )}

          {!openingHoursInEdition && (
            <FormCreateOpeningHoursPage establishmentId={establishmentId} />
          )}
        </GridItem>
      </SimpleGrid>

      <DialogDeleteOpeningHours
        openingHours={openingHoursToDelete}
        establishmentId={establishmentId}
        open={isDeleteDialogOpen}
        onOpen={onDeleteDialogOpenChange}
      />
    </Box>
  )
}
