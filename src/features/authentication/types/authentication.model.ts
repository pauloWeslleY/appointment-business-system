import { type AccountModel } from './account.model'

export interface AuthModel {
  token: string
  user: AccountModel
}
