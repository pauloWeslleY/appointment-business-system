interface FrequentlyAskedQuestionGroup {
  id: string
  title: string
  questions: {
    id: string
    title: string
    answer: string
  }[]
}

export const frequentlyAskedQuestionGroups = [
  {
    id: 'getting-started',
    title: 'Primeiros passos',
    questions: [
      {
        id: 'initial-setup',
        title: 'Por onde começo a configurar o sistema?',
        answer:
          'Cadastre o perfil empresarial e, em Estabelecimentos, crie sua unidade. Complete o endereço e os horários de funcionamento. Depois, entre no painel do estabelecimento para cadastrar serviços, profissionais e clientes antes de organizar a agenda.',
      },
      {
        id: 'multiple-establishments',
        title: 'Posso gerenciar mais de um estabelecimento?',
        answer:
          'Você pode cadastrar unidades conforme os limites da sua assinatura. Consulte Assinatura para conferir os recursos do seu plano. Cada estabelecimento tem seus próprios serviços, profissionais, horários e agendamentos.',
      },
      {
        id: 'switch-establishment',
        title: 'Como entro no painel de outro estabelecimento?',
        answer:
          'Na lista de Estabelecimentos, use Ir para estabelecimento na unidade desejada. Dentro do painel, você também pode usar o seletor de estabelecimentos no cabeçalho, quando houver outras unidades disponíveis para seu acesso.',
      },
      {
        id: 'mobile-access',
        title: 'O sistema funciona no celular e no tablet?',
        answer:
          'Sim. Acesse pelo navegador do celular, tablet ou computador. Em telas menores, abra o botão de menu no cabeçalho para navegar pelas áreas do sistema.',
      },
    ],
  },
  {
    id: 'appointments',
    title: 'Agenda e clientes',
    questions: [
      {
        id: 'create-appointment',
        title: 'Como crio um agendamento?',
        answer:
          'Entre no painel do estabelecimento e abra Agendamentos. Inicie um novo agendamento, selecione o cliente e o serviço, informe a data e escolha um horário disponível. Se necessário, selecione o profissional e adicione observações antes de salvar.',
      },
      {
        id: 'required-customer',
        title: 'Posso criar um agendamento sem selecionar um cliente?',
        answer:
          'Não. O agendamento precisa estar vinculado a um cliente. Cadastre a pessoa na área Clientes do estabelecimento e depois selecione esse cadastro no formulário do agendamento.',
      },
      {
        id: 'unavailable-times',
        title: 'Por que não aparecem horários disponíveis?',
        answer:
          'Confira a data selecionada, os horários de funcionamento da unidade, o serviço e o profissional, quando informado. A duração do serviço e os agendamentos já existentes também podem afetar a disponibilidade. Verifique se a configuração permite atender no período desejado.',
      },
      {
        id: 'cancel-appointment',
        title: 'Como cancelo um agendamento?',
        answer:
          'Em Agendamentos, abra as ações do atendimento e altere o status para cancelado. Informe o motivo solicitado e confirme a alteração. As ações disponíveis dependem do status atual e das suas permissões.',
      },
      {
        id: 'customer-information',
        title: 'Onde consulto e atualizo os dados de um cliente?',
        answer:
          'Abra Clientes no painel do estabelecimento, encontre o cadastro e consulte as ações disponíveis. A edição dos dados depende das permissões concedidas ao seu usuário.',
      },
      {
        id: 'deposit-confirmation',
        title: 'Como sei se um agendamento exige pagamento de sinal?',
        answer:
          'Confira as condições apresentadas no fluxo de agendamento e as configurações disponíveis para o estabelecimento. A exigência de sinal depende dos recursos habilitados. Consulte a situação registrada no sistema antes de considerar um pagamento confirmado.',
      },
    ],
  },
  {
    id: 'establishment',
    title: 'Serviços e funcionamento',
    questions: [
      {
        id: 'create-service',
        title: 'Como cadastro os serviços oferecidos?',
        answer:
          'No painel do estabelecimento, abra Serviços e use a opção de novo serviço. Preencha as informações solicitadas, incluindo duração e valor, e salve. Mantenha esses dados atualizados para organizar a disponibilidade e os atendimentos.',
      },
      {
        id: 'create-professional',
        title: 'Como cadastro um profissional?',
        answer:
          'Acesse Profissionais dentro do estabelecimento e escolha Novo profissional. Preencha os dados do formulário e salve. O cadastro de um profissional e o acesso de um usuário à equipe são configurações distintas.',
      },
      {
        id: 'opening-hours',
        title: 'Onde configuro os horários de funcionamento?',
        answer:
          'Abra Horários no painel do estabelecimento para configurar os dias e períodos de atendimento. Confira também o fuso horário no cadastro da unidade, pois ele influencia a interpretação dos horários.',
      },
      {
        id: 'update-establishment',
        title:
          'Como altero os dados, o endereço e a identidade visual da unidade?',
        answer:
          'Use Editar na lista de Estabelecimentos ou acesse Configurações dentro da unidade. As seções disponíveis permitem atualizar os dados, o endereço, as imagens, os links e as cores. As cores cadastradas para o estabelecimento não substituem o tema padrão do painel administrativo.',
      },
    ],
  },
  {
    id: 'team',
    title: 'Equipe e permissões',
    questions: [
      {
        id: 'invite-member',
        title: 'Como convido alguém para acessar o sistema?',
        answer:
          'Se seu acesso permitir, abra Equipe e acessos e vá à área de Convites. Envie o convite usando os dados solicitados. A pessoa deve acessar o convite e entrar na conta para analisar e aceitar a participação na organização.',
      },
      {
        id: 'missing-permissions',
        title: 'Por que não vejo um menu ou não consigo editar uma informação?',
        answer:
          'Os recursos disponíveis dependem das suas permissões, da organização e do estabelecimento selecionados. Peça ao responsável pela organização para conferir seu acesso. Algumas funcionalidades também dependem do plano e da situação da assinatura.',
      },
      {
        id: 'organization-data',
        title:
          'Por que os dados mudam quando troco de empresa ou estabelecimento?',
        answer:
          'O sistema organiza as informações por organização e por unidade. Ao trocar a seleção, você passa a consultar os dados daquele contexto. Confira a empresa e o estabelecimento ativos antes de cadastrar ou alterar informações.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Conta e segurança',
    questions: [
      {
        id: 'change-password',
        title: 'Como altero minha senha estando conectado?',
        answer:
          'Abra Conta e encontre a seção Alterar senha. Informe a senha atual, escolha uma nova senha com pelo menos 10 caracteres e repita a nova senha para confirmar. Você também pode optar por encerrar sessões em outros dispositivos.',
      },
      {
        id: 'forgot-password',
        title: 'Esqueci minha senha. Como recupero o acesso?',
        answer:
          'Na tela de login, use a opção de recuperação de senha e informe o e-mail da sua conta. Siga as instruções recebidas para criar uma nova senha. Confira também a pasta de spam e se o endereço informado está correto.',
      },
      {
        id: 'profile-information',
        title: 'Onde atualizo meus dados pessoais?',
        answer:
          'Acesse Conta para consultar e atualizar as informações do seu usuário. Os dados da empresa ficam em Perfil empresarial e os dados de cada unidade ficam no cadastro do estabelecimento.',
      },
    ],
  },
  {
    id: 'subscription',
    title: 'Planos e assinatura',
    questions: [
      {
        id: 'trial-period',
        title: 'Como consulto meu período de teste e meu plano?',
        answer:
          'Na área Assinatura, confira o plano, a situação do acesso e as datas apresentadas para a organização selecionada. Quando houver um período de teste, use as informações dessa tela para acompanhar sua validade e as opções disponíveis.',
      },
      {
        id: 'subscription-limits',
        title: 'Onde vejo os limites e as opções de plano?',
        answer:
          'Abra Assinatura para consultar os recursos e as opções disponíveis para sua organização. Confira os limites antes de contratar ou alterar o plano. Essa área pode estar disponível apenas para usuários autorizados a gerenciar a assinatura.',
      },
      {
        id: 'cancel-subscription',
        title: 'Posso cancelar a renovação da assinatura?',
        answer:
          'Quando a opção estiver disponível em Assinatura, solicite e confirme o cancelamento da próxima renovação. O acesso continua até o fim do período pago informado no sistema. O cancelamento não gera reembolso proporcional automático.',
      },
      {
        id: 'checkout-status',
        title:
          'Voltei da tela de pagamento, mas o plano ainda não foi atualizado. O que faço?',
        answer:
          'Confira a situação na área Assinatura e aguarde a confirmação do pagamento pelo sistema. O retorno da tela de pagamento, por si só, não confirma a contratação. Antes de tentar pagar novamente, verifique a situação da operação para evitar uma nova tentativa desnecessária.',
      },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrações e acesso',
    questions: [
      {
        id: 'connect-google-calendar',
        title: 'Como conecto o Google Calendário?',
        answer:
          'Em Configurações, encontre Integrações e a lista de estabelecimentos. Use a ação de conexão da unidade desejada, escolha a conta Google e conclua a autorização. Depois, confira se a situação aparece como Conectado no sistema.',
      },
      {
        id: 'disconnect-google-calendar',
        title: 'Posso desconectar o Google Calendário?',
        answer:
          'Sim. Na lista de integrações em Configurações, use a ação de desconectar do estabelecimento e confirme. A conexão é configurada por unidade; confira se selecionou o estabelecimento correto.',
      },
      {
        id: 'loading-problem',
        title: 'O sistema está demorando para carregar. O que posso conferir?',
        answer:
          'Confira sua conexão e tente atualizar a página. Se o problema continuar, anote a tela e a ação que estava realizando para informar ao responsável pelo sistema. Evite enviar senhas ou dados de pagamento ao relatar o problema e confira se uma operação foi concluída antes de repeti-la.',
      },
    ],
  },
] satisfies FrequentlyAskedQuestionGroup[]
