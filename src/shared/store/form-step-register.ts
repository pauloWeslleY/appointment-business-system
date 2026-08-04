import { create } from 'zustand'

type FormStepRegisterState = {
  step: number
  setStep: (newStep: number) => void
}

export const useFormStepRegister = create<FormStepRegisterState>((set) => ({
  step: 0,
  setStep: (newStep: number) => set({ step: newStep }),
}))
