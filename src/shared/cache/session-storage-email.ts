const STORAGE_KEY = 'registration:email'

export const registrationStorage = {
  setEmail(email: string) {
    sessionStorage.setItem(STORAGE_KEY, email)
  },

  getEmail(): string | null {
    return sessionStorage.getItem(STORAGE_KEY)
  },

  clear() {
    sessionStorage.removeItem(STORAGE_KEY)
  },
}
