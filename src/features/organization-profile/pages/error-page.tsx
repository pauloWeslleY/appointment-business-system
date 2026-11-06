import { Alert, Box } from '@chakra-ui/react'
import type { ErrorComponentProps } from '@tanstack/react-router'

import AccessDenied from '@/components/layout/access-denied'
import { AccessDeniedError } from '@/shared/errors'

import ActiveOrganization from '../components/active-organization'
import ErrorPageOrganizationAlert from '../components/error-page-organization-alert'

const ErrorOrganizationPage = (props: ErrorComponentProps) => {
  const isAccessDenied = props.error instanceof AccessDeniedError

  if (isAccessDenied) {
    return <AccessDenied />
  }

  const _error =
    props.error instanceof Error ? props.error : new Error('Unknown error')

  if (_error.message === 'Selecione uma organização.') {
    return (
      <Box spaceY="4">
        <Alert.Root status="info" rounded="lg" variant="surface">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{_error.message}</Alert.Title>
            <Alert.Description>
              Por favor, selecione uma organização para continuar.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <ActiveOrganization />
      </Box>
    )
  }

  return (
    <ErrorPageOrganizationAlert
      status="error"
      title="Ocorreu um erro"
      description={_error.message}
    />
  )
}

export default ErrorOrganizationPage
