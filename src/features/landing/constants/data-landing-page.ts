import {
  CalendarCheck,
  ChartNoAxesCombined,
  ClipboardList,
  Heart,
  LockKeyhole,
  UserRound,
  Zap,
} from 'lucide-react'

const landingWhatsAppBaseUrl = 'https://wa.me/5511958908360'

export const landingWhatsAppHref = `${landingWhatsAppBaseUrl}?text=${encodeURIComponent('Olá! Gostaria de mais informações.')}`
export const landingSetupHelpWhatsAppHref = `${landingWhatsAppBaseUrl}?text=${encodeURIComponent('Olá! Quero ajuda para configurar a agenda na Agendros. Meu negócio é ___ e fica em ___.')}`

export const backToTopScrollThreshold = 480

export const benefits = [
  {
    icon: Zap,
    title: 'Receba pedidos de agendamento online',
    text: 'Compartilhe seu link para que os clientes vejam os horários disponíveis.',
  },
  {
    icon: Heart,
    title: 'Consulte o histórico do cliente',
    text: 'Veja os atendimentos anteriores antes da próxima visita.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Acompanhe os resultados',
    text: 'Consulte os indicadores do negócio no painel.',
  },
  {
    icon: LockKeyhole,
    title: 'Solicite sinal nas reservas',
    text: 'Mostre aos clientes os dados de pagamento cadastrados pelo seu estabelecimento.',
  },
]

export const steps = [
  {
    icon: UserRound,
    title: 'Crie a conta e ative o teste',
    text: 'Confirme seu e-mail, configure seu negócio e inicie o teste em Assinatura.',
  },
  {
    icon: ClipboardList,
    title: 'Configure sua agenda',
    text: 'Cadastre sua equipe, serviços e horários.',
  },
  {
    icon: CalendarCheck,
    title: 'Comece a agendar',
    text: 'Envie seu link aos clientes ou marque horários pelo painel.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Acompanhe seu negócio',
    text: 'Consulte a agenda da equipe e o histórico dos clientes.',
  },
]

export const testimonials = [
  {
    name: 'Camila Oliveira',
    role: 'Cabeleireira · São Paulo/SP',
    initials: 'CO',
    quote:
      'O sistema facilitou muito a minha rotina. Consigo organizar todos os agendamentos e meus clientes adoram a praticidade.',
  },
  {
    name: 'Rafael Souza',
    role: 'Barbeiro · Campinas/SP',
    initials: 'RS',
    quote:
      'Com o System Appointment aumentei meus atendimentos e tenho um controle muito melhor da minha agenda.',
  },
  {
    name: 'Juliana Mendes',
    role: 'Esteticista · Rio de Janeiro/RJ',
    initials: 'JM',
    quote:
      'A plataforma é intuitiva, completa e o suporte é excelente. Recomendo para todos os profissionais da área.',
  },
]

export const questions = [
  {
    title: 'Como começo o teste grátis?',
    answer:
      'Crie sua conta, confirme seu e-mail e configure seu negócio. Em Assinatura, selecione “Iniciar teste gratuito”. O teste dura 7 dias e não exige cartão.',
  },
  {
    title: 'Posso cancelar quando quiser?',
    answer:
      'Sim. Você pode cancelar a renovação quando quiser. O acesso continua até o fim do período pago.',
  },
  {
    title: 'O sistema funciona em celular?',
    answer:
      'Sim. Acesse sua agenda pelo navegador do celular, tablet ou computador.',
  },
  {
    title: 'É possível ter mais de um estabelecimento?',
    answer:
      'Sim. Você pode cadastrar até 3 estabelecimentos em uma única organização. O limite é o mesmo no pagamento mensal e no anual.',
  },
  {
    title: 'Como funciona o sinal de um agendamento?',
    answer:
      'Se o estabelecimento solicitar sinal, a Agendros exibe o link e o QR Code cadastrados. O cliente paga diretamente ao estabelecimento ou ao provedor indicado, e o estabelecimento confere o recebimento.',
  },
  {
    title: 'O que acontece quando o teste acaba?',
    answer:
      'Você pode escolher o pagamento mensal ou anual para continuar usando a Agendros. O teste não gera cobrança automática.',
  },
  {
    title: 'Meu cliente precisa instalar um aplicativo?',
    answer:
      'Ele abre a página pelo navegador do celular ou computador. Para enviar a solicitação de agendamento, ele entra na conta de cliente da Agendros.',
  },
  {
    title: 'Posso continuar marcando horários pelo painel?',
    answer:
      'Sim. Na área de Agendamentos do estabelecimento, selecione o cliente, o serviço, a data e um horário disponível para marcar o atendimento.',
  },
  {
    title: 'O que preciso configurar antes de compartilhar meu link?',
    answer:
      'Cadastre os serviços e profissionais do estabelecimento, confira os horários de atendimento e configure o endereço da página. Depois, copie o link e compartilhe com seus clientes.',
  },
]

export const navigation = [
  ['Recursos', '#recursos'],
  ['Planos', '#planos'],
  ['Dúvidas', '#duvidas'],
]

export const reference = '/Landing Page SaaS de Agendamentos Moderno.png'
