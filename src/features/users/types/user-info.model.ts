import { type OAuth2UserInfo } from 'better-auth'

export interface GetAccountUserAuthApiResponse {
  account: {
    id: string
    providerId: string
    accountId: string
  }
  user: OAuth2UserInfo
  data: object
}
