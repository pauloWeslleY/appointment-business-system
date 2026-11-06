import { parseAsInteger, useQueryState } from 'nuqs'

import { toaster } from '@/components/ui/toaster'

import type { StorageCreateEstablishmentProps } from '../helpers/storage-establishment'

export function useStepCreateEstablishment(
  establishment: Pick<StorageCreateEstablishmentProps, 'created'> | null,
) {
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
