import z from 'zod'

export const MemberAccessScope = {
  ALL_ESTABLISHMENTS: 'all_establishments',
  RESTRICTED: 'restricted',
} as const

export const MemberAccessScopeSchema = z.enum(MemberAccessScope)

export type MemberAccessScopeType =
  (typeof MemberAccessScope)[keyof typeof MemberAccessScope]

export const loadMemberAccessScope = new Set<MemberAccessScopeType>([
  MemberAccessScope.ALL_ESTABLISHMENTS,
  MemberAccessScope.RESTRICTED,
])

export const mapLabelMemberAccessScope = (
  accessScope: MemberAccessScopeType = MemberAccessScope.ALL_ESTABLISHMENTS,
) => {
  const map: Record<MemberAccessScopeType, string> = {
    [MemberAccessScope.ALL_ESTABLISHMENTS]: 'Todos establecimentos',
    [MemberAccessScope.RESTRICTED]: 'Restrito',
  }

  return map[accessScope]
}

export const loadSelectMemberAccessScope = Array.from(
  loadMemberAccessScope,
).map((accessScope) => ({
  value: accessScope,
  label: mapLabelMemberAccessScope(accessScope),
}))
