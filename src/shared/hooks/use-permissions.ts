import { useMemo } from 'react'

import { useMemberContext } from '@/features/members/hooks/use-member-context'
import {
  MemberRoles,
  type MemberRoleType,
} from '@/features/members/types/member-role.type'

import { RESOURCES, type ResourceType } from '../constants/permission'
import { listGroupedPermissions } from '../helpers/list-permissions'
import type { PermissionsByResource } from '../types/permissions.type'

export const hasMemberOwner = (role: MemberRoleType) =>
  role === MemberRoles.OWNER

export function usePermissions(resources?: ResourceType[]) {
  const memberContext = useMemberContext()

  const { invitations, subscriptions, organizationProfile, appointments } =
    useMemo(() => {
      const groupedPermissions = listGroupedPermissions(
        memberContext?.permissions ?? [],
      )

      const groupedByResource = groupedPermissions.map(
        (permission) => permission.resource,
      )

      const resourcesList = resources ?? groupedByResource

      const permissions = resourcesList.reduce<PermissionsByResource>(
        (flags, resource) => {
          const actions = groupedPermissions.find(
            (permission) => permission.resource === resource,
          )

          const actionList = actions?.actions ?? []

          flags[resource] = {
            canCreate: actionList.includes('create'),
            canRead: actionList.includes('read'),
            canUpdate: actionList.includes('update'),
            canDelete: actionList.includes('delete'),
            canCancel: actionList.includes('cancel'),
            canConclude: actionList.includes('conclude'),
          }

          return flags
        },
        {} as PermissionsByResource,
      )

      return {
        invitations: permissions[RESOURCES.INVITATION],
        subscriptions: permissions[RESOURCES.SUBSCRIPTION],
        organizationProfile: permissions[RESOURCES.ORGANIZATION_PROFILE],
        appointments: permissions[RESOURCES.APPOINTMENT],
      }
    }, [memberContext?.permissions, resources])

  return {
    invitations,
    subscriptions,
    organizationProfile,
    appointments,
  }
}
