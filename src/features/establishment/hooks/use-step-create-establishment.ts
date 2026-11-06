import { parseAsInteger, useQueryState } from 'nuqs'

import { toaster } from '@/components/ui/toaster'

import { storageEstablishment } from '../helpers/storage-establishment'

const establishment = storageEstablishment.get()

export function useStepCreateEstablishment() {
  const [stepCreateEstablishment, setStepCreateEstablishment] = useQueryState(
    'step',
    parseAsInteger.withDefault(0),
  )

  const onChangeStepCreateEstablishment = (step: number) => {
    if (!establishment?.created) {
      toaster.warning({
        title: 'Para prosseguir',
        description: 'Você precisa concluir o cadastro do estabelecimento.',
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
    stepCreateEstablishment,
    nextStepCreateEstablishment,
    prevStepCreateEstablishment,
    onChangeStepCreateEstablishment,
  }
}
