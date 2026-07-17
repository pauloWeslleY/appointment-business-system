import {
  Box,
  Button,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'

import { useGetOwnerById } from '../hooks/use-get-owner-by-id'

interface OwnerLayoutProps {
  children: React.ReactNode
}

const OwnerLayoutContainer = ({ children }: OwnerLayoutProps) => {
  const { data: owner, isLoading: isOwnerLoading } = useGetOwnerById()
  const navigate = useNavigate()

  if (isOwnerLoading) {
    return (
      <Stack gap="4" w="full" p="2">
        <HStack width="full">
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={2} />
        </HStack>
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
      </Stack>
    )
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between">
        <HStack align="center">
          <Header.Button />
          <Header.Title lineHeight={0}>Proprietário</Header.Title>
        </HStack>

        {!owner && (
          <Button
            rounded="xl"
            size="sm"
            onClick={() => navigate({ to: '/owner/new' })}
          >
            <Icon as={UserSquare2} boxSize="5" />
            Cadastrar proprietário
          </Button>
        )}
      </Header.Root>

      {children}
    </Box>
  )
}

export default OwnerLayoutContainer
