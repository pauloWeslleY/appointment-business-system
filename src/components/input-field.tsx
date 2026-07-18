import { Input, type InputProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

type InputFieldProps = InputProps & ComponentProps<'input'>

const InputField = ({ ref, ...props }: InputFieldProps) => {
  return (
    <Input
      ref={ref}
      {...props}
      variant="subtle"
      size="sm"
      rounded="xl"
      bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
    />
  )
}

export default InputField
