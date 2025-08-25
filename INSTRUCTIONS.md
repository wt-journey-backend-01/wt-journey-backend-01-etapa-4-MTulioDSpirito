# Instruções para a API de Gerenciamento de Agentes e Casos

Este documento detalha o processo de configuração e execução da API, que agora inclui persistência de dados com PostgreSQL e um sistema de autenticação seguro com JWT.

## 1. Pré-requisitos
Certifique-se de que você tem o **Docker** e o **Node.js** com **npm** instalados em sua máquina.

## 2. Configuração Inicial

1.  **Variáveis de Ambiente:** Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis. Substitua a chave `JWT_SECRET` por uma string aleatória e segura.

    ```
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=delegacia_db
    NODE_ENV=development
    JWT_SECRET=sua_chave_secreta_aqui
    ```

2.  **Instalar Dependências:** Instale todos os pacotes necessários para o projeto.

    ```bash
    npm install
    ```

3.  **Subir o Banco de Dados:** Inicie o container do PostgreSQL usando o Docker Compose.

    ```bash
    docker compose up -d
    ```

## 3. Configurar o Banco de Dados

1.  **Executar Migrations:** Este comando irá criar todas as tabelas no seu banco de dados, incluindo as tabelas `agentes`, `casos` e `usuarios`.

    ```bash
    npx knex migrate:latest
    ```

2.  **Executar Seeds:** Popule as tabelas com dados iniciais de exemplo.

    ```bash
    npx knex seed:run
    ```

## 4. Iniciar a Aplicação

Inicie o servidor localmente.

```bash
npm start


ndpoints da API
A API agora possui rotas públicas para autenticação e rotas protegidas para gerenciar os dados.

Rotas de Autenticação (Públicas)
Esses endpoints não exigem um token JWT.

POST /auth/register

Descrição: Registra um novo usuário no sistema.

Body: {"nome": "...", "email": "...", "senha": "..."}

POST /auth/login

Descrição: Autentica um usuário e retorna um token JWT válido.

Body: {"email": "...", "senha": "..."}

Resposta: {"access_token": "token_gerado_aqui"}

Rotas Protegidas (Requerem Autenticação)
Esses endpoints exigem que o header Authorization: Bearer <token> seja enviado com um token JWT válido, obtido no login.

GET /agentes

Descrição: Lista todos os agentes.

GET /agentes/:id

Descrição: Retorna um agente específico pelo ID.

POST /agentes

Descrição: Cria um novo agente.

PUT /agentes/:id

Descrição: Atualiza completamente um agente.

DELETE /agentes/:id

Descrição: Deleta um agente.

GET /casos

Descrição: Lista todos os casos.

GET /casos/:id

Descrição: Retorna um caso específico pelo ID.

POST /casos

Descrição: Cria um novo caso.

PUT /casos/:id

Descrição: Atualiza completamente um caso.

DELETE /casos/:id

Descrição: Deleta um caso.

6. Como Testar as Rotas no Insomnia
Fluxo de Autenticação
Registrar: Envie uma requisição POST para http://localhost:3000/auth/register com um email e senha válidos.

Logar: Envie uma requisição POST para http://localhost:3000/auth/login com o email e a senha do usuário registrado.

Copiar o Token: Copie o access_token retornado na resposta.

Testar Rotas Protegidas
Definir Autorização: Para qualquer rota protegida (/agentes ou /casos), vá para a aba Auth e selecione o tipo Bearer Token.

Colar o Token: No campo Token, cole o access_token que você copiou no passo anterior.

Enviar Requisição: Agora você pode enviar requisições GET, POST, PUT ou DELETE para os endpoints protegidos. Se o token for válido, a API responderá normalmente.