import type { ResourceType } from '../constants/permission'

export interface GroupedPermissions {
  resource: ResourceType
  actions: string[]
}

export interface PermissionFlags {
  canRead: boolean
  canCreate: boolean
  canUpdate: boolean
  canDelete: boolean
  canCancel: boolean
  canConclude: boolean
}

export type PermissionsByResource = Record<ResourceType, PermissionFlags>
