import { type NavigateOptions } from '@tanstack/react-router'
import { type ElementType } from 'react'

export interface MenuNavigationItemProps {
  icon?: ElementType
  label: string
  path: NavigateOptions['to']
  type?: 'header' | 'link'
}
