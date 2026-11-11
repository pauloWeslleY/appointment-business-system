import { Input, type InputProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

import { inputFieldStyles } from '@/theme/styles/global-styles'

type InputFieldProps = InputProps & ComponentProps<'input'>

const InputField = ({ ref, ...props }: InputFieldProps) => {
  return (
    <Input
      ref={ref}
      variant="subtle"
      size="sm"
      {...props}
      {...inputFieldStyles}
    />
  )
}

export default InputField
