import { mapErrorsLabel } from '../constants/map-errors-label'

interface BetterAuthErrorResponse {
  code?: string
  message?: string
}

interface GetBetterAuthErrorMessageOptions {
  customErrorMessages?: Record<string, string>
  fallbackErrorMessage: string
}

export function getBetterAuthErrorMessage(
  betterAuthError: BetterAuthErrorResponse,
  {
    customErrorMessages = {},
    fallbackErrorMessage,
  }: GetBetterAuthErrorMessageOptions,
): string {
  const betterAuthErrorCode = betterAuthError.code

  if (!betterAuthErrorCode) {
    return fallbackErrorMessage
  }

  return (
    customErrorMessages[betterAuthErrorCode] ??
    mapErrorsLabel[betterAuthErrorCode] ??
    fallbackErrorMessage
  )
}
