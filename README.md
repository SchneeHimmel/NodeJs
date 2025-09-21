## Desafio Node.js - API (Projeto de exemplo)

Repositório de exemplo com uma API construída em Node.js + Typescript usando Fastify e Drizzle ORM.

## Sumário
- **Descrição**: visão geral do projeto
- **Pré-requisitos**: software necessário
- **Instalação**: como instalar dependências
- **Scripts úteis**: comandos disponíveis em `package.json`
- **Banco de dados**: comandos Drizzle/seed/migrate
- **Execução**: rodar em ambiente de desenvolvimento
- **Testes**: como executar a suíte de testes
- **Endpoints**: exemplos básicos

## Descrição

API em Node.js com Fastify e TypeScript. Utiliza Drizzle ORM para migrações e acesso ao PostgreSQL. A autenticação é baseada em JWT e o projeto inclui rotas de exemplo para `login` e operações relacionadas a `courses`.

## Pré-requisitos

- Node.js (v18+ recomendado)
- npm ou pnpm
- PostgreSQL (ou container Docker com o banco)
- `drizzle-kit` (instalado como dependência de desenvolvimento já presente no `package.json`)

## Instalação

1. Clone o repositório e entre na pasta do projeto

```bash
git clone <repo-url>
cd NodeJs
```

2. Instale dependências

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com as variáveis necessárias (exemplo):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=uma_chave_secreta
PORT=3333
```

Adapte conforme seu ambiente.

## Scripts úteis (detectados em `package.json`)

- `npm run dev`: inicia o servidor em modo desenvolvimento (usa `ts-node`/watch)
- `npm run db:seed`: executa o seed do banco (`src/database/seed.ts`)
- `npm run db:generate`: gera arquivos do Drizzle (`drizzle-kit generate`)
- `npm run db:migrate`: aplica migrações com `drizzle-kit migrate`
- `npm run db:studio`: abre o `drizzle-kit studio` (interface local para o DB)
- `npm run test`: executa os testes com `vitest` (usa `.env.test`)

Exemplo de uso rápido:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

## Banco de dados

O projeto usa Drizzle ORM e contém scripts para migração e geração de esquemas. Se preferir usar Docker, há uma pasta `docker/` com um arquivo `setup.sql` (ajuste conforme necessário).

- Gerar artefatos: `npm run db:generate`
- Aplicar migrações: `npm run db:migrate`
- Executar seed: `npm run db:seed`

## Testes

Antes de rodar os testes, as migrações são aplicadas automaticamente usando as variáveis de ambiente em `.env.test`.

```bash
npm test
```

## Endpoints (exemplos)

As rotas estão em `src/routes`. Exemplos principais:

- `POST /login` : autentica usuário e retorna JWT
- `GET /courses` : lista cursos
- `GET /courses/:id` : obtém curso por ID
- `POST /courses` : cria um curso (provavelmente requer autenticação/role)

Use ferramentas como `curl` ou `httpie` para testar:

```bash
curl -X POST http://localhost:3333/login -d '{"email":"a@b.com","password":"123456"}' -H 'Content-Type: application/json'
```

## Observações

- Ajuste as variáveis de ambiente conforme o seu ambiente local.
- O projeto já inclui dependências de testes (`vitest`, `supertest`) e mocks/factories na pasta `src/tests/factories`.

## Licença

Este projeto está licenciado sob a licença `ISC`. Consulte o campo `license` no `package.json` para mais detalhes.

---
