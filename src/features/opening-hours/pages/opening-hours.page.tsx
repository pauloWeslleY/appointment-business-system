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
import { Clock2Icon } from 'lucide-react'

import Header from '@/components/layout/header'
import { cardSectionCss } from '@/theme/styles/global-styles'

import DialogDeleteOpeningHours from '../components/dialog-delete-opening-hours'
import ListOpeningHours from '../components/list-opening-hours'
import { useOpeningHoursPage } from '../hooks/use-opening-hours-page'
import FormCreateOpeningHoursPage from './form-create-opening-hours.page'
import FormUpdateOpeningHoursPage from './form-update-opening-hours.page'

const OpeningHoursPage = () => {
  const {
    establishmentId,
    openingHoursQuery,
    openingHours,
    openingHoursInEdition,
    openingHoursToDelete,
    isDeleteDialogOpen,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange,
  } = useOpeningHoursPage()

  const hasNoOpeningHours =
    !openingHoursQuery.isLoading &&
    !openingHoursQuery.error &&
    openingHours.length === 0

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
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

            {openingHoursQuery.isLoading && (
              <Stack gap="2" role="status" aria-label="Carregando horários">
                <For each={[1, 2, 3]}>
                  {(item) => <Skeleton key={item} height="14" rounded="xl" />}
                </For>
              </Stack>
            )}

            {openingHoursQuery.error && (
              <Alert.Root status="error" rounded="xl">
                <Alert.Indicator />
                <Stack>
                  <Alert.Title>{openingHoursQuery.error.message}</Alert.Title>
                  <Button
                    size="sm"
                    rounded="lg"
                    variant="outline"
                    alignSelf="start"
                    onClick={() => openingHoursQuery.refetch()}
                  >
                    Tentar novamente
                  </Button>
                </Stack>
              </Alert.Root>
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

            {openingHours.length > 0 && (
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

export default OpeningHoursPage
