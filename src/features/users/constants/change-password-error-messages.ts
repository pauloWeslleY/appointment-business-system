export const changePasswordErrorMessages: Record<string, string> = {
  INVALID_PASSWORD: 'A senha atual está incorreta.',
  CREDENTIAL_ACCOUNT_NOT_FOUND:
    'Sua conta não possui senha cadastrada. Saia da conta e use “Esqueci minha senha” para definir uma senha.',
}

export const CHANGE_PASSWORD_FALLBACK_ERROR_MESSAGE =
  'Não foi possível alterar sua senha. Tente novamente.'

export const EXPIRED_SESSION_ERROR_MESSAGE =
  'Sua sessão expirou. Faça login novamente.'

export const INVALID_CHANGE_PASSWORD_RESPONSE_ERROR_MESSAGE =
  'Não foi possível confirmar a alteração da senha. Recarregue a página e verifique se a nova senha foi aplicada.'

export const REFRESH_SESSION_ERROR_MESSAGE =
  'Sua senha foi alterada, mas não foi possível atualizar a sessão. Recarregue a página.'
