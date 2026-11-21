import {
  BuildingComplex,
  CalendarFoldIcon,
  Scissors,
  Store,
  User,
  Users,
} from 'lucide-react'

export const planBenefits = [
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

export const monthlyPlanPrice = 35

export const plans = [
  {
    title: 'Pagamento mensal',
    type: 'monthly',
    price: monthlyPlanPrice,
  },
  {
    title: 'Pagamento anual',
    type: 'annual',
    price: 350,
  },
]
