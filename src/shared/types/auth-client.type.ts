import type { authClient } from '@/lib/auth'

export type Auth = typeof authClient.$Infer

export type AuthenticationSessionType = Auth['Session']

export type AuthUserType = AuthenticationSessionType['user']

export type MemberType = Auth['Member']
