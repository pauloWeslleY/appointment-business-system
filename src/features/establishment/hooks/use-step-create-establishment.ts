import { parseAsInteger, useQueryState } from 'nuqs'

import { toaster } from '@/components/ui/toaster'

import { storageEstablishment } from '../helpers/storage-establishment'

export function useStepCreateEstablishment() {
  const [stepCreateEstablishment, setStepCreateEstablishment] = useQueryState(
    'step',
    parseAsInteger.withDefault(0),
  )
  const query = new URLSearchParams(window.location.search)
  const hasCreatedAddress = query.get('address_create')
  const hasCreatedOpeningHours = query.get('opening_hours_create')
  const createdEstablishment = storageEstablishment.get()

  const onChangeStepCreateEstablishment = (step: number) => {
    if (!createdEstablishment?.created) {
      toaster.warning({
        title: 'Para prosseguir',
        description: 'Você precisa concluir o cadastro do estabelecimento.',
      })
      return
    }

    if (!hasCreatedAddress) {
      toaster.warning({
        title: 'Para prosseguir',
        description: 'Você precisa cadastrar um endereço.',
      })
      return
    }

    if (!hasCreatedOpeningHours) {
      toaster.warning({
        title: 'Para prosseguir',
        description: 'Você precisa cadastrar o horário de funcionamento.',
      })
      return
    }

    setStepCreateEstablishment(step)
  }

  const nextStepCreateEstablishment = () => {
    setStepCreateEstablishment((prev) => prev + 1)
  }

  const prevStepCreateEstablishment = () => {
    setStepCreateEstablishment((prev) => prev - 1)
  }

  return {
    createdEstablishment,
    stepCreateEstablishment,
    nextStepCreateEstablishment,
    prevStepCreateEstablishment,
    onChangeStepCreateEstablishment,
  }
}
