import { parseAsInteger, useQueryState } from 'nuqs'

import { toaster } from '@/components/ui/toaster'

import { storageEstablishment } from '../helpers/storage-establishment'

export function useStepCreateEstablishment() {
  const [stepCreateEstablishment, setStepCreateEstablishment] = useQueryState(
    'step',
    parseAsInteger.withDefault(0),
  )

  // Lido a cada renderização: o estabelecimento é gravado no storage durante o
  // primeiro passo, depois que este módulo já foi carregado.
  const createdEstablishment = storageEstablishment.get()

  const onChangeStepCreateEstablishment = (step: number) => {
    if (!createdEstablishment?.created) {
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
    createdEstablishment,
    stepCreateEstablishment,
    nextStepCreateEstablishment,
    prevStepCreateEstablishment,
    onChangeStepCreateEstablishment,
  }
}
