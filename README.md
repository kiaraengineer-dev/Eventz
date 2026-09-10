# 🎟️ Eventz

O Eventz é uma plataforma web para descoberta e gerenciamento de eventos. A aplicação permite visualizar eventos, realizar cadastro e login de usuários e criar, editar e excluir eventos próprios.

O projeto foi desenvolvido como um projeto pessoal, com foco em desenvolvimento Full Stack, integração entre frontend e backend, autenticação, banco de dados e testes automatizados.

---

##  Funcionalidades

### Usuários

* Cadastro de usuários
* Login com autenticação
* Autenticação utilizando JWT
* Consulta dos dados do usuário autenticado
* Proteção de rotas

### Eventos

* Listagem de eventos
* Visualização dos detalhes de um evento
* Criação de eventos
* Edição de eventos
* Exclusão de eventos
* Identificação de eventos criados no Eventz
* Controle de eventos associados ao usuário

### Interface

* Interface responsiva para desktop, tablet e celular
* Busca de eventos
* Filtro por categoria
* Cards de eventos
* Página de detalhes do evento
* Formulário de criação e edição
* Navegação utilizando React Router

### Testes

* Testes automatizados utilizando **Vitest**
* Testes de serviços
* Teste da tela de login
* Teste da criação de eventos
* Teste da página de detalhes do evento

Atualmente, o projeto possui **5 testes automatizados**, todos passando.

---

## Tecnologias utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* Vitest
* React Testing Library

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* JPA / Hibernate
* Maven

### Banco de dados

* PostgreSQL

### Ferramentas

* Visual Studio Code
* Eclipse
* Git
* GitHub
* pgAdmin
* Bruno

---

## Estrutura do projeto


Eventz/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   └── events/
│   │
│   ├── shared/
│   │   └── components/
│   │
│   └── test/
│
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── README.md


O backend possui uma estrutura baseada em:


backend/
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
└── service


---

##  Como executar o projeto 

### Frontend

Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd Eventz
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend será disponibilizado pelo Vite, normalmente em:

```text
http://localhost:5173
```

### Backend

Entre na pasta do backend e execute a aplicação Spring Boot utilizando sua IDE ou Maven.

O backend utiliza a porta:

```text
8080
```

A API fica disponível em:

```text
http://localhost:8080/api
```

---

## Banco de dados

O projeto utiliza **PostgreSQL**.

Exemplo de configuração do `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eventz
spring.datasource.username=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

É necessário possuir um banco chamado:

```text
eventz
```

---

## Autenticação

A autenticação da aplicação utiliza **JWT (JSON Web Token)**.

O fluxo básico é:

```text
Cadastro
   ↓
Login
   ↓
Backend valida usuário
   ↓
JWT é gerado
   ↓
Token armazenado no frontend
   ↓
Requisições autenticadas
```

As rotas protegidas utilizam o token para identificar o usuário autenticado.

---

##  Endpoints

### Autenticação

```text
POST /api/auth/login
POST /api/auth/register
```

### Usuário

```text
GET /api/users/me
```

### Eventos

```text
GET    /api/events
GET    /api/events/{id}
POST   /api/events
PUT    /api/events/{id}
DELETE /api/events/{id}
```

---

## Testes automatizados

Os testes são executados utilizando **Vitest**.

Para executar todos os testes:

```bash
npx vitest run
```

Resultado atual:

```text
Test Files  3 passed
Tests       5 passed
```

Os testes cobrem:

1. Busca de eventos pelo serviço
2. Criação de evento pelo serviço
3. Renderização e preenchimento da tela de login
4. Renderização do formulário de criação de evento
5. Carregamento e exibição dos detalhes de um evento

---

## Responsividade

O Eventz foi desenvolvido para funcionar em diferentes tamanhos de tela:

* Desktop
* Celular
* Tablet

A interface utiliza classes responsivas do Tailwind CSS para adaptar os componentes aos diferentes dispositivos.

---

## Objetivo 

O Eventz foi desenvolvido como projeto pessoal para aplicação prática de conceitos de Engenharia de Software e Desenvolvimento Full Stack.

Entre os principais conceitos aplicados estão:

* Desenvolvimento frontend
* Desenvolvimento backend
* APIs REST
* Banco de dados relacional
* Autenticação e autorização
* Integração frontend/backend
* Componentização
* Responsividade
* Testes automatizados
* Controle de versão com Git

---

## Melhorias futuras

Algumas funcionalidades ainda planejadas para versões futuras:

* Melhorar validações e mensagens do sistema
* Finalizar autorização para edição e exclusão apenas pelo criador do evento
* Implementar compra de ingressos
* Implementar integração com pagamento
* Integrar eventos externos do Ticketmaster e Sympla
* Finalizar algumas ações da página inicial que atualmente são apenas demonstrativas

---

##  Projeto

Eventz — Plataforma web de eventos desenvolvida como projeto pessoal.

Tecnologias principais:

**React + TypeScript + Spring Boot + PostgreSQL + JWT + Vitest**

