import { defineStyle, Tabs } from '@chakra-ui/react'
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu'

import {
  menuInvitation,
  MenuNavInvitation,
  type MenuNavInvitationType,
} from '../constants/menu-nav-invitatons'
import { useInvitationNavigation } from '../hooks/use-invitation-navigation'

const cssTabsTrigger = defineStyle({
  color: { _light: 'slate.700', _dark: 'slate.200/70' },
  _selected: {
    rounded: 'md',
    border: '1px solid',
    borderColor: { _light: 'slate.300', _dark: 'slate.700' },
    bg: { _light: 'slate.200', _dark: 'slate.800' },
    color: { _light: 'sea.700', _dark: 'sea.500' },
  },
})

interface InvitationProps {
  searchParams: {
    tab?: MenuNavInvitationType
  }
}

const Invitation = ({ searchParams }: InvitationProps) => {
  const { activeTab, tabsOrientation, handleTabChange } =
    useInvitationNavigation(searchParams.tab)

  const iconsMenuNavInvitation: Record<MenuNavInvitationType, React.ReactNode> =
    {
      [MenuNavInvitation.SEND]: <LuUser />,
      [MenuNavInvitation.PROJECTS]: <LuFolder />,
      [MenuNavInvitation.TASKS]: <LuSquareCheck />,
    }

  const ContentInvitation: Record<MenuNavInvitationType, React.ReactNode> = {
    [MenuNavInvitation.SEND]: (
      <Tabs.Content value={MenuNavInvitation.SEND}>
        Manage your team send
      </Tabs.Content>
    ),
    [MenuNavInvitation.PROJECTS]: (
      <Tabs.Content value={MenuNavInvitation.PROJECTS}>
        Manage your projects
      </Tabs.Content>
    ),
    [MenuNavInvitation.TASKS]: (
      <Tabs.Content value={MenuNavInvitation.TASKS}>
        Manage your tasks for freelancers
      </Tabs.Content>
    ),
  }

  return (
    <Tabs.Root
      value={activeTab}
      variant="enclosed"
      orientation={tabsOrientation}
      onValueChange={(details) => handleTabChange(details.value)}
    >
      <Tabs.List bg={{ _light: 'slate.100', _dark: 'slate.950' }}>
        {menuInvitation.map(({ value, label }) => (
          <Tabs.Trigger key={value} value={value} css={cssTabsTrigger}>
            {iconsMenuNavInvitation[value]}
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {ContentInvitation[activeTab] ?? (
        <Tabs.Content value={activeTab}>No content available</Tabs.Content>
      )}
    </Tabs.Root>
  )
}

export default Invitation
