# README

# Índice

1. [Introdução](#introduction)
2. [Problema](#problem)
    1. [Condições de Validação da Senha](#validation_conditions)
    2. [Condições Assumidas](#admited_conditions)
3. [Solução](#solution)

# Introdução <a name="introduction"></a>

Este repositório é a solução do problema ITI Backend Challenge. A linguagem utilizada para a solução foi NodeJS com Typescript.

# Problema <a name="problem"></a>

Construa uma aplicação que exponha uma api web que valide se uma senha é válida.

Input: Uma senha (string).

Output: Um boolean indicando se a senha é válida.

## Condições de Validação da Senha <a name="validation_conditions"></a>

- Nove ou mais caracteres
- Ao menos 1 dígito
- Ao menos 1 letra minúscula
- Ao menos 1 letra maiúscula
- Ao menos 1 caractere especial
    - Considere como especial os seguintes caracteres: !@#$%^&*()-+
- Não possuir caracteres repetidos dentro do conjunto

## Condições Assumidas <a name="admited_conditions"></a>

- Caso a senha possua algum caractere especial fora da lista citada, ela é considerada uma senha inválida.

Essa condição assumida foi motivada pelo fato da biblioteca Validator.js utilizar uma lista maior de caracteres especiais, portanto seria necessária uma regra de negócio externa que filtrasse a senha antes de passá-la pelas condições da biblioteca.

# Solução <a name="solution"></a>

A partir do problema dado foi feita uma primeira versão do sistema que realizava algumas validações com RegEx e a biblioteca Validator.js e passava nas situações testadas a mão. Esta solução foi exposta via API através do framework Express.

A opção de utilizar uma biblioteca externa se deu pelo fato de ser amplamente utilizada pela comunidade e open-source, tendo sua solução já sido testada, tendo apenas que passar as condições de validação como opção para tal biblioteca.

A partir desta solução um diagrama de dependências foi criado baseado em Arquitetura Limpa, separando as regras de negócio de frameworks externos.

Dado que a primeira versão foi assumida como certa, a próxima etapa para refatoração em Arquitetura Limpa foi toda baseada em Desenvolvimento Guiado por Testes, buscando o desacoplamento da solução de forma íntegra.

# Instruções de Uso

## Instalação

Para instalação desta solução basta fazer:

```bash
git clone https://github.com/a-nunes/iti-backend-challenge
cd iti-backend-challenge
npm install
npm run build
npm start
```

## Utilização

Faça uma requisição POST para [http://localhost:3000/api/validation](http://localhost:3000/api/validation) com um JSON da seguinte forma:

```json
{
 "password": "AbTp9!fok"
}
```

As respostas retornadas pelo sistema podem ser:

1. Status 200 OK - Resposta: ***true*** ou ***false***
2. Status 400 Bad Request - Resposta: um JSON com a propriedade error e a mensagem de erro.

## Executando os testes

Para executar os testes unitários e de integração, basta executar o seguinte comando:

```bash
npm run test
```

Para executar os testes de mutação, basta executar o seguinte comando:

```bash
npx stryker run
```

# Foram utilizados no Projeto

## Design Patterns

- Factory
- Adapter
- Singleton
- Command
- Dependency Injection

## Metodologias e Designs

- TDD
- Clean Architecture
- Refactoring
- Conventional Commits
- Modular Design
- Dependency Diagrams
- Use Cases

## Bibliotecas e Ferramentas

- NPM
- Typescript
- Git
- Jest
- Ts-Jest
- Jest-Mock-Extended
- Express
- Cors
- Supertest
- Husky
- Lint Staged
- Eslint
- Standard Javascript Style
- Rimraf
- Module-Alias
- DotEnv
- Ts-Node-Dev

## Features de Testes

- Testes Unitários
- Testes de Integração
- Testes de Mutação
- Cobertura de Testes
- Mocks
- Fakes