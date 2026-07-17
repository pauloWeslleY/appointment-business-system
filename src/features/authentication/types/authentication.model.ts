import { type AccountModel } from './account.model'

export interface AuthModel {
  redirect: boolean
  token: string
  url: string
  user: AccountModel
}
