export const RESOURCES = {
  SUBSCRIPTION: 'subscription',
  DASHBOARD: 'dashboard',
  DASHBOARD_REVENUE: 'dashboardRevenue',
  INVITATION: 'invitation',
  PROFESSIONAL: 'professional',
  EMPLOYMENT: 'employment',
  LEGAL_ENTITY: 'legalEntity',
  LEGAL_ENTITY_DOCUMENT: 'legalEntityDocument',
  MEMBER: 'member',
  MEMBER_PROFILE: 'memberProfile',
  MEMBER_OWNERSHIP: 'memberOwnership',
  MEMBER_SCOPE: 'memberScope',
  ORGANIZATION_PROFILE: 'organizationProfile',
  ADDRESS: 'address',
  APPOINTMENT: 'appointment',
  SERVICE: 'service',
  CUSTOMER: 'customer',
  ESTABLISHMENT: 'establishment',
  OPENING_HOURS: 'openingHours',
} as const

export type ResourceType = (typeof RESOURCES)[keyof typeof RESOURCES]

export const PERMISSION_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  CANCEL: 'cancel',
  CONCLUDE: 'conclude',
} as const

export type PermissionActionType =
  (typeof PERMISSION_ACTIONS)[keyof typeof PERMISSION_ACTIONS]

export const mapLabelResource: Record<ResourceType, string> = {
  [RESOURCES.SUBSCRIPTION]: 'Assinaturas',
  [RESOURCES.DASHBOARD]: 'Painel',
  [RESOURCES.DASHBOARD_REVENUE]: 'Faturamento',
  [RESOURCES.INVITATION]: 'Convites',
  [RESOURCES.PROFESSIONAL]: 'Profissionais',
  [RESOURCES.EMPLOYMENT]: 'Vínculos profissionais',
  [RESOURCES.LEGAL_ENTITY]: 'Pessoa jurídica',
  [RESOURCES.LEGAL_ENTITY_DOCUMENT]: 'Documentos da pessoa jurídica',
  [RESOURCES.MEMBER]: 'Membros',
  [RESOURCES.MEMBER_PROFILE]: 'Perfil do membro',
  [RESOURCES.MEMBER_OWNERSHIP]: 'Gestão de proprietários',
  [RESOURCES.MEMBER_SCOPE]: 'Escopo de acesso do membro',
  [RESOURCES.ORGANIZATION_PROFILE]: 'Perfil da empresarial',
  [RESOURCES.ADDRESS]: 'Endereços',
  [RESOURCES.APPOINTMENT]: 'Agendamentos',
  [RESOURCES.SERVICE]: 'Serviços',
  [RESOURCES.CUSTOMER]: 'Clientes',
  [RESOURCES.ESTABLISHMENT]: 'Estabelecimentos',
  [RESOURCES.OPENING_HOURS]: 'Horários de funcionamento',
}

export const mapLabelActions = (actions: string[]) => {
  const mapLabelAction: Record<string, string> = {
    create: 'Cadastrar',
    read: 'Visualizar',
    update: 'Atualizar',
    delete: 'Excluir',
    cancel: 'Cancelar',
    conclude: 'Concluir',
  }
  const labeledActions = actions.map(
    (action) => mapLabelAction[action] ?? action,
  )

  return labeledActions
}
