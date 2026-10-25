## Mantenha o mesmo padrão

Análise a pasta `invitations` e procure por queries faça a analise e aplique dentro de `subscriptions`;
Dentro de `invitations` faça uma nova analise execute as correções

- Separe todas logica dentro de um custom hook
- Não utilize (prop-drilling)
- Siga a risca o CLEAN CODE e deixe nomenclatura descritivas mantendo o inglês
- Remova a (SubscriptionRequest) e utilize sempre o padrão do projeto utilizando o `http-dependencies.ts`
- Todos o enums converta seguindo o exemplo `status-invitations.type.ts`
