import type {
  PermissionActionType,
  ResourceType,
} from '../constants/permission'

interface MemberPermission {
  resource: string
  action: string
}

export interface RequiredPermission {
  resource: ResourceType
  action: PermissionActionType
}

export function hasPermission(
  permissions: MemberPermission[],
  required: RequiredPermission,
): boolean {
  return permissions.some(
    (permission) =>
      permission.resource === required.resource &&
      permission.action === required.action,
  )
}
