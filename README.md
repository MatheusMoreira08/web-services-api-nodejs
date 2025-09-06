# Web Services API com Node.js

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

API RESTful desenvolvida com Node.js para **gerenciamento de usuários e autenticação com JWT**.
O projeto inclui **controle de sessão com Redis**, onde tokens inválidos são armazenados em uma blacklist, garantindo **logout seguro** e maior robustez no fluxo de autenticação.

---

## 📋 Índice

* [Sobre o Projeto](#-sobre-o-projeto)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Como Executar](#-como-executar)
* [Endpoints da API](#-endpoints-da-api)
* [Licença](#-licença)

---

## 📖 Sobre o Projeto

Este projeto implementa uma **API de autenticação e gerenciamento de usuários**, seguindo boas práticas e padrões REST.

O foco principal é o **fluxo de autenticação com JWT** e o **gerenciamento de sessão com Redis**, permitindo:

* Registro de novos usuários
* Login com credenciais válidas
* Acesso a rotas protegidas via Bearer Token
* Logout com inclusão do token em uma blacklist no Redis

Dessa forma, mesmo tokens ainda válidos são rejeitados após logout, garantindo maior segurança.

---

## ✨ Funcionalidades

* ✅ **Registro de Usuário**

  * `POST /auth/register`
  * Validação de nome, e-mail e senha
  * Persistência no banco (PostgreSQL via Sequelize)

* ✅ **Login de Usuário**

  * `POST /auth/login`
  * Validação de credenciais
  * Geração de JWT assinado contendo `userId` e `email`

* ✅ **Proteção de Rotas**

  * Middleware `authMiddleware` que valida JWT
  * Checagem de tokens revogados no Redis
  * Bloqueio automático de requisições não autenticadas

* ✅ **Logout Seguro**

  * `POST /auth/logout`
  * Token atual vai para a **blacklist no Redis** com TTL = tempo restante de expiração
  * Próximas requisições com esse token são bloqueadas

* ✅ **Documentação via Swagger**

  * `/api-docs` com especificação dos endpoints:

    * `/auth/register`
    * `/auth/login`
    * `/auth/logout`
  * Indicação clara de que rotas protegidas exigem:

    ```
    Authorization: Bearer <jwt_token>
    ```

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express.js, TypeScript
* **Banco de Dados:** PostgreSQL (via Sequelize)
* **ORM:** Sequelize
* **Cache / Sessões:** Redis
* **Containerização:** Docker, Docker Compose
* **Autenticação:** JWT (jsonwebtoken), bcrypt.js
* **Validação:** class-validator
* **Documentação:** Swagger (swagger-ui-express)
* **Testes:** Jest

---

## 💻 Como Executar

### Pré-requisitos:

* [Node.js](https://nodejs.org/en/) (v18+)
* [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
* [Git](https://git-scm.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/MatheusMoreira08/web-services-api-nodejs.git
cd web-services-api-nodejs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração do Banco de Dados
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=exemplo_node
DATABASE_URL=postgresql://postgres:password@postgres:5432/exemplo_node

# Configuração do JWT
JWT_SECRET=minhaChaveSuperSecreta123
JWT_EXPIRES_IN=1h

# Configuração do Redis
REDIS_URL=redis://redis:6379

# Porta da Aplicação
PORT=3001
```

### 4. Suba os serviços com Docker

```bash
docker-compose up --build
```

Isso iniciará:

* PostgreSQL
* Redis
* API Node.js

### 5. Acesse a documentação Swagger

```
http://localhost:3001/api-docs
```

---

## 🔗 Endpoints da API

### Autenticação

* `POST /auth/register` → Registrar novo usuário
* `POST /auth/login` → Login e geração de token JWT
* `POST /auth/logout` → Logout seguro com Redis

### Rotas Protegidas

Qualquer rota que você criar poderá ser protegida pelo middleware de autenticação.
Para acessá-las, envie no header:

```
Authorization: Bearer <jwt_token>
```

Exemplo (futuro):

* `GET /users/me` → Retorna dados do usuário autenticado

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
Sinta-se à vontade para usar, estudar e contribuir.

---

## ✍️ Observações

* O projeto foi inspirado no material em PDF fornecido como guia inicial.
* Os arquivos `package.json` e `redis.yml` serviram como base para configuração.
* A implementação foi **evoluída** para permitir futuras extensões e novas funcionalidades.
