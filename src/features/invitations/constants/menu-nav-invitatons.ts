export const MenuNavInvitation = {
  SEND: 'send',
  PROJECTS: 'projects',
  TASKS: 'tasks',
} as const

export type MenuNavInvitationType =
  (typeof MenuNavInvitation)[keyof typeof MenuNavInvitation]

export const menuInvitation = [
  { value: MenuNavInvitation.SEND, label: 'Enviados' },
  { value: MenuNavInvitation.PROJECTS, label: 'Projects' },
  { value: MenuNavInvitation.TASKS, label: 'Settings' },
] satisfies { value: MenuNavInvitationType; label: string }[]
