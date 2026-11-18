import { authClient } from '@/lib/auth'

export async function validateSignInWithCredential(): Promise<{
  hasSignInWithCredential: boolean
}> {
  const { data: accounts, error: listAccountsError } =
    await authClient.listAccounts()

  if (listAccountsError) {
    throw new Error(
      listAccountsError.message ?? 'Falha ao listar contas vinculadas',
    )
  }

  const hasSignInWithCredential = accounts.some(
    ({ providerId }) => providerId === 'credential',
  )

  return {
    hasSignInWithCredential,
  }
}
