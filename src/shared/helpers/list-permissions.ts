import type { ResourceType } from '../constants/permission'
import type { GroupedPermissions } from '../types/permissions.type'

export const listGroupedPermissions = (
  permissions: {
    resource: string
    action: string
  }[],
): GroupedPermissions[] => {
  return permissions.reduce<GroupedPermissions[]>((grouped, permission) => {
    const existing = grouped.find(
      (group) => group.resource === permission.resource,
    )

    if (existing) {
      existing.actions.push(permission.action)
    } else {
      grouped.push({
        resource: permission.resource as ResourceType,
        actions: [permission.action],
      })
    }
    return grouped
  }, [])
}
