import { Button } from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'

import { getAdminHref } from '@/shared/config/site-domains'

const SignupButton = ({
  children = 'Começar agora',
}: {
  children?: React.ReactNode
}) => {
  return (
    <Button
      asChild
      bg="brand.navy"
      color="white"
      rounded="lg"
      px="6"
      h="11"
      _hover={{ bg: 'navy.800', transform: 'translateY(-1px)' }}
    >
      <a href={getAdminHref('/register')}>
        {children}
        <ArrowRight size={16} />
      </a>
    </Button>
  )
}

export default SignupButton
