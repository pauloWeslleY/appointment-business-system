import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryState } from 'nuqs'

export function useStepRegister() {
  const search = useSearch({ from: '/_auth/register/' })

  const [stepRegister, setStepRegister] = useQueryState(
    'step',
    parseAsInteger.withDefault(Number(search?.step ?? 0)),
  )

  function setStepRegisterWithValidation(step: number) {
    if (step < 0) {
      setStepRegister(0)
    }

    if (step > 2) {
      setStepRegister(2)
    }

    setStepRegister(step)
  }

  return {
    stepRegister,
    setStepRegisterWithValidation,
  }
}
