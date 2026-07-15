import { Input, type InputProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

type InputFieldProps = InputProps & ComponentProps<'input'>

const InputField = ({ ref, ...props }: InputFieldProps) => {
  return (
    <Input
      ref={ref}
      {...props}
      size="sm"
      rounded="xl"
      variant="subtle"
      bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
    />
  )
}

export default InputField
