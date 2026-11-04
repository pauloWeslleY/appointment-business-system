import { parseAsInteger, useQueryState } from 'nuqs'

export function useStepCreateEstablishment() {
  const [stepCreateEstablishment, setStepCreateEstablishment] = useQueryState(
    'step',
    parseAsInteger.withDefault(0),
  )

  const onChangeStepCreateEstablishment = (step: number) => {
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
