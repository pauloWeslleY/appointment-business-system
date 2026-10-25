import { useBreakpointValue } from '@chakra-ui/react'
import { useQueryState } from 'nuqs'

import {
  MenuNavInvitation,
  type MenuNavInvitationType,
} from '../constants/menu-nav-invitatons'

export function useInvitationNavigation(initialTab?: MenuNavInvitationType) {
  const [tabQueryValue, setTabQueryValue] = useQueryState('tab', {
    defaultValue: initialTab ?? MenuNavInvitation.SEND,
  })
  const tabsOrientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'horizontal',
    md: 'vertical',
  })
  const activeTab =
    Object.values(MenuNavInvitation).find((value) => value === tabQueryValue) ??
    MenuNavInvitation.SEND

  const handleTabChange = (nextTab: string) => {
    void setTabQueryValue(nextTab)
  }

  return {
    activeTab,
    tabsOrientation,
    handleTabChange,
  }
}
