export const TABS_PERMISSIONS = {
  OPERATION: 'operation',
  TEAM: 'team',
  COMPANY: 'company',
  FINANCE: 'finance',
} as const

export type TabsPermissionsType =
  (typeof TABS_PERMISSIONS)[keyof typeof TABS_PERMISSIONS]

export const PermissionByModule: Record<TabsPermissionsType, string[]> = {
  [TABS_PERMISSIONS.OPERATION]: [
    'Agendamentos',
    'Serviços',
    'Clientes',
    'Horários de funcionamento',
    'Estabelecimentos',
  ],
  [TABS_PERMISSIONS.TEAM]: [
    'Membros',
    'Perfil do membro',
    'Convites',
    'Profissionais',
    'Vínculos profissionais',
    'Gestão de proprietários',
    'Escopo de acesso',
  ],
  [TABS_PERMISSIONS.COMPANY]: [
    'Perfil empresarial',
    'Pessoa jurídica',
    'Documentos da pessoa jurídica',
    'Endereços',
    'Painel',
  ],
  [TABS_PERMISSIONS.FINANCE]: ['Faturamento', 'Assinaturas'],
}
