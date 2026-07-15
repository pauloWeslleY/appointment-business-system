import { create } from 'zustand'

type MenuCollapseState = {
  collapsed: boolean
  setCollapsed: (newCollapsed: boolean) => void
}

export const useMenuCollapse = create<MenuCollapseState>((set) => ({
  collapsed: false,
  setCollapsed: (newCollapsed: boolean) => set({ collapsed: newCollapsed }),
}))
