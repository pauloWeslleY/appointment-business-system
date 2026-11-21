import { Input, type InputProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

import { inputFieldCss } from '@/theme/styles/global-styles'

type InputFieldProps = InputProps & ComponentProps<'input'>

const InputField = ({ ref, ...props }: InputFieldProps) => {
  return (
    <Input ref={ref} variant="subtle" size="sm" {...props} {...inputFieldCss} />
  )
}

export default InputField
