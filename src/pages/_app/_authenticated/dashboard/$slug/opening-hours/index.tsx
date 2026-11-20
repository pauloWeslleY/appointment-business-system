import {
  Alert,
  Box,
  Button,
  Card,
  EmptyState,
  For,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Clock2Icon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import Header from '@/components/layout/header'
import DialogDeleteOpeningHours from '@/features/opening-hours/components/dialog-delete-opening-hours'
import ListOpeningHours from '@/features/opening-hours/components/list-opening-hours'
import { useOpeningHoursPage } from '@/features/opening-hours/hooks/use-opening-hours-page'
import FormCreateOpeningHoursPage from '@/features/opening-hours/pages/form-create-opening-hours.page'
import UpdateOpeningHoursPage from '@/features/opening-hours/pages/update-opening-hours.page'
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

const MotionBox = motion.create(Box)

function OpeningHoursPage() {
  const {
    establishmentId,
    isLoadingOpeningHours,
    isDeleteDialogOpen,
    openingHours,
    openingHourIdToDelete,
    openingHoursError,
    openingHoursScopeKey,
    hasOpeningHours,
    hasNoOpeningHours,
    hourSelectedEdition,
    isEditingOpeningHours,
    showOpeningHoursLimitAlert,
    showFormCreateOpeningHour,
    showOpeningHoursForm,
    openingHoursFormWidth,
    openingHoursMotionDuration,
    shouldReduceOpeningHoursMotion,
    retryOpeningHours,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange,
  } = useOpeningHoursPage()

  return (
    <Box key={openingHoursScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root>
        <Header.Icon icon={Clock2Icon} />
        <Header.Title>Horários</Header.Title>
      </Header.Root>

      <Box
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="start"
      >
        <Box w={{ base: 'full', lg: 'auto' }} flex={{ lg: '1 1 0%' }} minW="0">
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
                selectedOpeningHoursId={hourSelectedEdition}
                onEdit={onEditOpeningHours}
                onDelete={onDeleteOpeningHours}
              />
            )}
          </Card.Root>
          <AnimatePresence>
            {showOpeningHoursLimitAlert && (
              <motion.div
                key="opening-hours-limit"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: openingHoursMotionDuration,
                  ease: 'easeInOut',
                }}
                style={{ overflow: 'hidden' }}
              >
                <Alert.Root
                  status="info"
                  variant="surface"
                  rounded="xl"
                  shadow="xs"
                  border="1px solid"
                  borderColor="blue.muted"
                  mt="4"
                  mb="2"
                >
                  <Alert.Indicator />
                  <Alert.Title>Limite de horários atingido</Alert.Title>
                  <Alert.Description>
                    Você não pode adicionar mais horários de funcionamento.
                  </Alert.Description>
                </Alert.Root>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <MotionBox
          initial={false}
          animate={{ width: openingHoursFormWidth }}
          transition={{
            duration: openingHoursMotionDuration,
            ease: 'easeInOut',
          }}
          flexShrink="0"
          minW="0"
          overflowX="clip"
          inert={!showOpeningHoursForm}
        >
          <AnimatePresence initial={false}>
            {showOpeningHoursForm && (
              <MotionBox
                key="opening-hours-form"
                exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                transition={{
                  duration: openingHoursMotionDuration,
                  ease: 'easeInOut',
                }}
              >
                <Box pt={{ base: '4', lg: '0' }} ps={{ lg: '4' }}>
                  {isEditingOpeningHours && (
                    <MotionBox
                      key={hourSelectedEdition}
                      initial={
                        shouldReduceOpeningHoursMotion
                          ? false
                          : { opacity: 0, y: -8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: openingHoursMotionDuration,
                        ease: 'easeInOut',
                      }}
                    >
                      <UpdateOpeningHoursPage
                        openingHoursId={hourSelectedEdition}
                        establishmentId={establishmentId}
                        onCancel={onCancelEditOpeningHours}
                      />
                    </MotionBox>
                  )}

                  {showFormCreateOpeningHour && (
                    <FormCreateOpeningHoursPage
                      establishmentId={establishmentId}
                    />
                  )}
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>
      </Box>

      <DialogDeleteOpeningHours
        openingHoursId={openingHourIdToDelete}
        open={isDeleteDialogOpen}
        onOpen={onDeleteDialogOpenChange}
      />
    </Box>
  )
}
