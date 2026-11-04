export interface ISessionStorage<T> {
  set(value: object): void
  get(): T | null
  delete(): void
}

class SessionStorage<T> implements ISessionStorage<T> {
  private readonly storageKey: string

  constructor(storageKey: string) {
    this.storageKey = storageKey
  }

  set(value: object) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(value))
  }

  get(): T | null {
    const item = sessionStorage.getItem(this.storageKey)
    return item ? JSON.parse(item) : null
  }

  delete() {
    sessionStorage.removeItem(this.storageKey)
  }
}

export const makeSessionStorage = <T>(storageKey: string) =>
  new SessionStorage<T>(storageKey)
