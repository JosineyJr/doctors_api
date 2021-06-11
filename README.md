# Teste back-end

**Stock control api**

- [Teste back-end](#teste-back-end)
  - [Execução local](#execução-local)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios](#estrutura-de-diretórios)
    - [Documentação](#documentação)
    - [Testes](#testes)
      - [Executando os testes](#executando-os-testes)
      - [Resultado](#resultado)

---

## Execução local

### Pré-requisitos

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/), [Docker](https://docs.docker.com/get-docker/) e [Docker-Compose](https://docs.docker.com/compose/install/) instalados.

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/JosineyJr/backend_test && cd backend_test
```

**2** - Inicie a aplicação:

```sh
make start-app
```

> O comando `start-app` executa o serviço `server` do [docker-compose](./docker-compose.yml), que baixa a imagem do _postgres_, executa as migrations, builda o dockerfile do projeto e inicia a aplicação na porta 3031.
>
> Caso queira remover a aplicação execute `make destroy`.

## Sobre o projeto

### Estrutura de diretórios

```
src/
 ├─ config/
 |   └─ validations.ts
 ├─ modules/
 |   ├─ cep/
 |   |   ├─ dtos/
 |   |   ├─ infra/
 |   |   |  ├─ http/
 |   |   |  |  ├─ controllers/
 |   |   |  |  └─ routes/
 |   |   |  └─ typeorm/
 |   |   |  |  ├─ entities/
 |   |   |  |  └─ repositories/
 |   |   ├─ providers/
 |   |   ├─ repositories/
 |   |   |  |  └─ fakes/
 |   |   └─ services/
 |   |      |  └─ test/
 |   ├─ doctors/
 |   |   ├─ dtos/
 |   |   ├─ infra/
 |   |   |  ├─ http/
 |   |   |  |  ├─ controllers/
 |   |   |  |  └─ routes/
 |   |   |  └─ typeorm/
 |   |   |  |  ├─ entities/
 |   |   |  |  └─ repositories/
 |   |   ├─ repositories/
 |   |   |  |  └─ fakes/
 |   |   └─ services/
 |   |      |  └─ test/
 |   ├─ specialties/
 |   |   ├─ dtos/
 |   |   ├─ infra/
 |   |   |  ├─ http/
 |   |   |  |  ├─ controllers/
 |   |   |  |  └─ routes/
 |   |   |  └─ typeorm/
 |   |   |  |  ├─ entities/
 |   |   |  |  └─ repositories/
 |   |   ├─ repositories/
 |   |   |  |  └─ fakes/
 |   |   └─ services/
 |   |      |  └─ test/
 ├─ shared/
 |   ├─ container/
 |   ├─ errors/
 |   └─ infra/
 |       ├─ http/
 |       |  └─ routes/
 |       └─ typeorm/
 |          └─ migrations/
 └─ package.json
```

- **types**: Dir com alteração da interface Request, para armazenar o id do usuário logado
- **config**: Dir com a configuração de autenticação com JWT.
- **modules**: Dir com a implementação de todos os módulos da aplicação separados entre si.
- **shared**: Dir com a implementação de todas as rotas da api e tudo o que é compartilhado entre os módulos.
- **test**: Dir com todos os testes unitários.

### Documentação

Após iniciar a aplicação, a documentação de toda a api estará disponível a partir do endereço <http://localhost:3033/docs-api>.

### Testes

Os testes foram divididos em unitários e integração a fim de garantir a maior cobertura de código no máximo de camadas possíveis. Os testes foram feitos utilzando o [Jest](https://www.npmjs.com/package/jest) e [Faker](https://www.npmjs.com/package/faker)

#### Executando os testes

Para executar os testes unitários e de integração execute o seguinte comando:

```sh
make run-tests
```

#### Resultado

O resultado dos testes são apresentados no terminal já com a informação de code coverage

<img src=https://github.com/JosineyJr/backend_test/blob/main/testCoverage.png height="500">
