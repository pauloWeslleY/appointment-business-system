import '@tanstack/react-router'

declare module '@tanstack/react-router' {
  interface HistoryState {
    emailVerified?: boolean
    registrationSuccess?: boolean
    email?: string
    passwordResetRequestSuccess?: boolean
  }
}
