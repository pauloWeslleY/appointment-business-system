import { authClient } from '@/lib/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'

import {
  ChangePasswordApiRequestSchema,
  ChangePasswordApiResponseSchema,
} from '../schemas/change-password-api.schema'
import type { ChangePasswordApiRequest } from '../types/change-password.type'

export class ChangePasswordError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'ChangePasswordError'
    this.code = code
  }
}

export async function changePasswordService(
  input: ChangePasswordApiRequest,
): Promise<void> {
  const request = ChangePasswordApiRequestSchema.parse(input)
  const { data, error } = await authClient.changePassword(request)

  if (error) {
    const code = error.code ?? 'CHANGE_PASSWORD_FAILED'
    const messages: Record<string, string> = {
      INVALID_PASSWORD: 'A senha atual está incorreta.',
      CREDENTIAL_ACCOUNT_NOT_FOUND:
        'Sua conta não possui senha cadastrada. Saia da conta e use “Esqueci minha senha” para definir uma senha.',
    }
    const message =
      messages[code] ??
      mapErrorsLabel[code] ??
      'Não foi possível alterar sua senha. Tente novamente.'

    throw new ChangePasswordError(code, message)
  }

  ChangePasswordApiResponseSchema.parse(data)
}
