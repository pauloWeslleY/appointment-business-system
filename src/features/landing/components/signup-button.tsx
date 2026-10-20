import { Button } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

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
      rounded="md"
      px="6"
      h="11"
      _hover={{ bg: 'navy.800', transform: 'translateY(-1px)' }}
    >
      <Link to="/register">
        {children}
        <ArrowRight size={16} />
      </Link>
    </Button>
  )
}
export default SignupButton
