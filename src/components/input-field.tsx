import { Input, type InputProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

import { inputFieldStyles } from '@/theme/styles/global-styles'

type InputFieldProps = InputProps & ComponentProps<'input'>

const InputField = ({ ref, ...props }: InputFieldProps) => {
  return (
    <Input
      ref={ref}
      {...props}
      variant="subtle"
      size="sm"
      {...inputFieldStyles}
    />
  )
}

export default InputField
