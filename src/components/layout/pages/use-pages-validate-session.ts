import { useAppSession } from '@/features/authentication/hooks/use-app-session'

export function usePagesValidateSession() {
  const { data: session } = useAppSession()
  const homeRoute = session?.user ? '/establishment' : '/'

  function navigateToPreviousPage() {
    window.history.back()
  }

  return {
    homeRoute,
    navigateToPreviousPage,
  }
}
