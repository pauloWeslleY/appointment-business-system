import { type NavigateOptions } from '@tanstack/react-router'
import { type ElementType } from 'react'

export interface MenuNavigationItemProps {
  readonly icon?: ElementType
  readonly label: string
  readonly path: NavigateOptions['to']
  readonly type?: 'header' | 'link'
}
