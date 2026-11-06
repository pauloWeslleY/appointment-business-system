import { Badge, Box, Button, Card, DataList } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import { mapLabelMemberAccessScope } from '@/features/members/types/member-access-scope.type'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { cardSectionCss } from '@/theme/styles/global-styles'

interface MeAccessProps {
  access: GetMeContextResponse
}

const MeAccess = ({ access }: MeAccessProps) => {
  const memberCurrentRole = mapLabelMemberRole(access.role)

  return (
    <Card.Root variant="outline" {...cardSectionCss} h="fit">
      <Card.Header
        display="flex"
        flexDir="row"
        alignItems="center"
        px="0"
        pt="0"
        mb="2"
      >
        <Card.Title>Meu Acesso</Card.Title>
      </Card.Header>

      <Card.Body px="0">
        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel>Papel</DataList.ItemLabel>
            <DataList.ItemValue>
              <Badge
                size="sm"
                variant="surface"
                colorPalette={memberCurrentRole.color}
              >
                {memberCurrentRole.label}
              </Badge>
            </DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>Escopo</DataList.ItemLabel>
            <DataList.ItemValue>
              <Box as="ul" listStyleType="none">
                <li>Estabelecimentos: {access.establishments.length}</li>
                <li>
                  Acesso: {mapLabelMemberAccessScope(access.scope.accessScope)}
                </li>
              </Box>
            </DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>Permissões</DataList.ItemLabel>
            <DataList.ItemValue>
              <Button
                asChild
                size="xs"
                rounded="lg"
                variant="surface"
                colorPalette="emerald"
              >
                <Link to="/account" search={{ menu: 'permissions' }}>
                  Gerenciar Permissões
                </Link>
              </Button>
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  )
}

export default MeAccess
