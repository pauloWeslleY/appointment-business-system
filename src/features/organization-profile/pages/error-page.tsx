import type { ErrorComponentProps } from '@tanstack/react-router'

import AccessDenied from '@/components/layout/access-denied'
import { AccessDeniedError } from '@/shared/errors'

import ErrorPageOrganizationAlert from '../components/error-page-organization-alert'

const ErrorOrganizationPage = (props: ErrorComponentProps) => {
  const isAccessDenied = props.error instanceof AccessDeniedError

  if (isAccessDenied) {
    return <AccessDenied />
  }

  return (
    <ErrorPageOrganizationAlert
      status="error"
      title="Ocorreu um erro"
      description={
        props.error instanceof Error ? props.error.message : 'Unknown error'
      }
    />
  )
}

export default ErrorOrganizationPage
