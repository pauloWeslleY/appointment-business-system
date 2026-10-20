import {
  BuildingComplex,
  CalendarFoldIcon,
  Scissors,
  Store,
  User,
  Users,
} from 'lucide-react'

export const summayPlans = [
  {
    icon: BuildingComplex,
    title: '1 organização',
    description: 'Gerencie todo o seu negócio em um só lugar.',
  },
  {
    icon: Store,
    title: 'Até 3 estabelecimentos',
    description: 'Ideal para quem tem uma ou mais unidades.',
  },
  {
    icon: Users,
    title: '10 profissionais',
    description: 'Cadastre sua equipe e organize as agendas.',
  },
  {
    icon: Scissors,
    title: 'Serviços ilimitados',
    description: 'Defina seus serviços e tempos de atendimento.',
  },
  {
    icon: CalendarFoldIcon,
    title: 'Agendamentos ilimitados',
    description: 'Receba quantos agendamentos quiser, sem limites.',
  },
  {
    icon: User,
    title: 'Clientes ilimitados',
    description: 'Cadastre e gerencie todos os seus clientes.',
  },
]

const itemsSummaryPlans = [
  '1 organização',
  'Até 3 estabelecimentos',
  '10 profissionais',
  'Serviços ilimitados',
  'Agendamentos ilimitados',
  'Clientes ilimitados',
]

export const plans = [
  {
    title: 'Plano Básico',
    type: 'monthly',
    price: 35,
    items: itemsSummaryPlans,
  },
  {
    title: 'Plano Básico',
    type: 'annual',
    price: 350,
    items: itemsSummaryPlans,
  },
]
