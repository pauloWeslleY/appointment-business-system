import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import type { MemberRoleType } from '../types/member-role.type'
import FormUpadteRoleMember from './form-update-role-member'
import FormUpadteScopeMember from './form-update-scope-member'
import FormUpadteStatusMember from './form-update-status-member'

interface SidebarUpdateMemberProps {
  isOpen: boolean
  onOpen: (open: boolean) => void
  member?: {
    id: string
    organizationId: string
    role: MemberRoleType
    createdAt: Date
    userId: string
    user: {
      id: string
      email: string
      name: string
      image?: string
    }
  }
}

const SidebarUpdateMember = ({
  isOpen,
  onOpen,
  member,
}: SidebarUpdateMemberProps) => {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => onOpen(e.open)} size="md">
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content {...contentCss}>
            <Drawer.Header>
              <Drawer.Title>Membro - {member?.user.name ?? '--'}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body spaceY="4">
              <FormUpadteScopeMember memberId={member?.id} />
              <FormUpadteRoleMember memberId={member?.id} />
              <FormUpadteStatusMember memberId={member?.id} />
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                colorPalette="red"
                variant="surface"
                size="sm"
                rounded="lg"
                onClick={() => onOpen(false)}
              >
                Fechar
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarUpdateMember
