import { Alert, Button, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { getCustomTimesOpeningHoursQueryOptions } from '../queries/opening-hours.query-options'
import FormCustomTimesOpeningHours from './form-custom-times-opening-hours'
import FormUpdateOpeningHours from './form-update-opening-hours'

interface UpdateOpeningHoursPageProps {
  establishmentId: string
  openingHoursId: string
  onCancel: () => void
}

const UpdateOpeningHoursPage = ({
  establishmentId,
  openingHoursId,
  onCancel,
}: UpdateOpeningHoursPageProps) => {
  const { data: session, isPending: isLoadingSession } = useAppSession()
  const {
    data: openingHoursDetail,
    error: openingHoursDetailError,
    isLoading: isLoadingOpeningHoursDetail,
    refetch: retryOpeningHoursDetail,
  } = useQuery(
    getCustomTimesOpeningHoursQueryOptions({
      userId: session?.user.id ?? '',
      organizationId: session?.session.activeOrganizationId ?? '',
      openingHoursId,
      establishmentId,
    }),
  )

  if (isLoadingSession || isLoadingOpeningHoursDetail) {
    return (
      <Skeleton
        h="14"
        rounded="xl"
        role="status"
        aria-label="Carregando horário de funcionamento"
      />
    )
  }

  if (!openingHoursDetail) {
    return (
      <Alert.Root status="error" rounded="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Não foi possível carregar o horário</Alert.Title>
          <Alert.Description>
            {openingHoursDetailError?.message ??
              'Verifique a organização ativa e o horário selecionado.'}
          </Alert.Description>
        </Alert.Content>

        {openingHoursDetailError && (
          <Button
            rounded="lg"
            onClick={() => retryOpeningHoursDetail()}
            size="sm"
          >
            Tentar novamente
          </Button>
        )}
      </Alert.Root>
    )
  }

  return (
    <Stack gap="4">
      <FormUpdateOpeningHours openingHours={openingHoursDetail} />
      <FormCustomTimesOpeningHours openingHours={openingHoursDetail} />

      <HStack justify="flex-end">
        <Button
          type="button"
          size="sm"
          rounded="lg"
          variant="surface"
          colorPalette="red"
          disabled={isLoadingSession || isLoadingOpeningHoursDetail}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </HStack>
    </Stack>
  )
}

export default UpdateOpeningHoursPage
