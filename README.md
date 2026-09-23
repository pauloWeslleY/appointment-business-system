# Appointment Business System

Aplicação web para centralizar a gestão de estabelecimentos que trabalham com atendimento agendado, como salões, barbearias, clínicas, estúdios e outros prestadores de serviços.

## Sobre o projeto

Administrar um negócio baseado em horários envolve informações que normalmente ficam espalhadas entre agendas, planilhas e aplicativos de mensagens. Isso dificulta o acompanhamento dos atendimentos, da equipe, dos clientes e do desempenho do estabelecimento.

O **Appointment Business System** reúne essas operações em um único painel. A aplicação permite que proprietários cadastrem seus estabelecimentos e acompanhem os principais dados da operação, reduzindo o trabalho manual e oferecendo uma visão mais clara do negócio.

Este repositório contém o frontend do sistema e consome uma API externa para autenticação, persistência dos dados e armazenamento de arquivos.

## O que o sistema busca solucionar

- Centralizar os agendamentos e seus diferentes status.
- Facilitar o cadastro e a manutenção dos serviços oferecidos.
- Organizar as informações de clientes e colaboradores.
- Permitir a gestão de um ou mais estabelecimentos pelo proprietário.
- Disponibilizar indicadores de receita, atendimentos, clientes e serviços.
- Reunir avaliações dos clientes para apoiar a melhoria do atendimento.
- Reduzir a dependência de controles manuais e informações descentralizadas.

## Funcionalidades

- Autenticação e gerenciamento do perfil do usuário.
- Cadastro e edição de estabelecimentos, endereços, telefones e horários de funcionamento.
- Upload de imagens do estabelecimento.
- Cadastro, edição, ativação e desativação de serviços.
- Gestão de agendamentos, com filtros, paginação, detalhes e atualização de status.
- Gestão de clientes e colaboradores.
- Visualização das avaliações recebidas.
- Dashboard com estatísticas, receita, agendamentos diários, principais clientes e serviços.
- Busca, filtros e paginação integrados aos parâmetros da URL.
- Interface responsiva com suporte aos modos claro e escuro.

## Tecnologias utilizadas

### Base da aplicação

- **React 19** — construção da interface baseada em componentes.
- **TypeScript** — tipagem estática e maior segurança durante o desenvolvimento.
- **Vite** — servidor de desenvolvimento e geração do build de produção.

### Interface

- **Chakra UI** — componentes visuais, responsividade e sistema de temas.
- **Emotion** — estilização utilizada pelo Chakra UI.
- **Lucide React** e **React Icons** — ícones da interface.
- **Recharts** e **Chakra UI Charts** — gráficos e indicadores do dashboard.
- **next-themes** — controle do tema claro e escuro.

### Dados, rotas e estado

- **TanStack Router** — roteamento tipado e rotas baseadas em arquivos.
- **TanStack Query** — consultas, cache e sincronização dos dados da API.
- **Axios** — comunicação HTTP com o backend.
- **Zustand** — estado global da interface.
- **nuqs** — sincronização de filtros e paginação com a URL.

### Formulários e validação

- **React Hook Form** — gerenciamento de formulários.
- **Zod** — criação dos schemas e validação dos dados.
- **@hookform/resolvers** — integração entre React Hook Form e Zod.

### Recursos adicionais

- **Better Auth** — cliente de autenticação com Magic Link e código por e-mail.
- **Day.js** — manipulação e formatação de datas.
- **ViaCEP** — preenchimento de endereço a partir do CEP.
- **ESLint** e **Prettier** — qualidade e padronização do código.

## Estrutura do projeto

```text
src/
├── components/       # Componentes compartilhados da interface
├── features/         # Módulos de negócio organizados por domínio
├── lib/              # Integrações com autenticação e cliente HTTP
├── pages/            # Rotas da aplicação
├── shared/           # Tipos, hooks, serviços, stores e utilitários comuns
└── theme/            # Tema, tokens e estilos globais
```

Os módulos dentro de `features` concentram componentes, páginas, hooks, schemas, serviços e tipos relacionados a cada domínio, como agendamentos, estabelecimentos, serviços, clientes e colaboradores.

## Pré-requisitos

Antes de iniciar, tenha instalado:

- Node.js em uma versão compatível com o Vite 8.
- npm.
- Uma instância da API do projeto disponível.

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto e informe a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

As requisições são realizadas com credenciais. Portanto, o backend deve estar configurado para aceitar a origem do frontend e os cookies de autenticação.

## Instalação e execução

Clone o repositório, acesse sua pasta e instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera os tipos do tema, valida o TypeScript e cria o build de produção. |
| `npm run preview` | Executa localmente uma prévia do build. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run routes:generate` | Gera a árvore de rotas do TanStack Router. |
| `npm run routes:watch` | Atualiza a árvore de rotas durante o desenvolvimento. |
| `npm run theme:build` | Gera os tipos personalizados do tema Chakra UI. |

## Build de produção

```bash
npm run build
```

Os arquivos finais serão gerados no diretório `dist`.
