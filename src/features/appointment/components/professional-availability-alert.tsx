import { Alert, Spinner, Text } from '@chakra-ui/react'

interface ProfessionalAvailabilityAlertProps {
  isServiceWithoutDuration: boolean
  isChecking: boolean
  isAvailable: boolean
  error: Error | null
}

const ProfessionalAvailabilityAlert = ({
  isServiceWithoutDuration,
  isChecking,
  isAvailable,
  error,
}: ProfessionalAvailabilityAlertProps) => {
  if (isServiceWithoutDuration) {
    return (
      <Alert.Root status="warning" rounded="xl" role="status">
        <Alert.Indicator />
        <Alert.Title>
          O serviço não tem duração definida. Não é possível validar a agenda do
          profissional.
        </Alert.Title>
      </Alert.Root>
    )
  }

  if (isChecking) {
    return (
      <Text
        role="status"
        fontSize="sm"
        color="fg.muted"
        display="flex"
        alignItems="center"
        gap="2"
      >
        <Spinner size="xs" borderWidth="1.5px" />
        Verificando disponibilidade do profissional...
      </Text>
    )
  }

  if (error) {
    return (
      <Alert.Root status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Title>{error.message}</Alert.Title>
      </Alert.Root>
    )
  }

  if (isAvailable) {
    return (
      <Alert.Root status="success" rounded="xl" role="status">
        <Alert.Indicator />
        <Alert.Title>Profissional disponível neste horário.</Alert.Title>
      </Alert.Root>
    )
  }

  return null
}

export default ProfessionalAvailabilityAlert
