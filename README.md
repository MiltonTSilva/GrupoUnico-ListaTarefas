# Sistema de gerenciamento de tarefas

## Documentação de Desenvolvimento

- Visão Geral

  Este projeto é uma aplicação de gerenciamento de tarefas desenvolvida em C#. Ele permite criar, listar, atualizar e deletar tarefas, além de implementar regras de negócio básicas, como validação de dados de entrada e tratamento de erros.

- Funcionalidades

1. Criar Tarefa

   Permite criar uma nova tarefa com os seguintes atributos:

   - Título: O título da tarefa.
   - Descrição: Uma descrição detalhada da tarefa.
   - Data de Vencimento: A data em que a tarefa deve ser concluída.

2. Listar Tarefas

   Exibe todas as tarefas criadas.

3. Atualizar Status da Tarefa

   Permite atualizar o status de uma tarefa para “Pendente” ou “Concluída”.

4. Deletar Tarefa

   Permite deletar uma tarefa existente.

# Regras de Negócio

## Validação de Dados de Entrada

- Título: Obrigatório e não pode ser vazio.
- Data de Vencimento: Deve ser uma data futura.

## Tratamento de Erros

- Lançar exceções apropriadas para entradas inválidas.
- Capturar e logar exceções para análise posterior.

# Configurção BackEnd

## Banco de Dados

    - SQL Server
    - ORM Entity Framework versão 8.0.8

    - Para recriar o banco de dados e aplicar as migrations, siga os passos abaixo:

        1. Certifique-se de que o .NET SDK está instalado
            Caso não esteja, baixar a versão mais recente do site oficial do .NET https://dotnet.microsoft.com/pt-br/download

        2. Clone o repositório do projeto

            Clone o repositório do projeto na nova máquina usando Git:

            git clone https://github.com/MiltonTSilva/GrupoUnico-ListaTarefas.git

        3. Restaure as dependências do projeto

            No diretório do projeto, restaure as dependências do projeto usando dotnet restore

        4. Configure a string de conexão

            Verifique se a string de conexão com o banco de dados está correta no arquivo appsettings.json.

        5. Aplicar as migrations e atualizar o banco de dados

            - Para instalar o dotnet ef, que é a ferramenta de linha de comando do Entity Framework Core caso não tenha use:
                dotnet tool install --global dotnet-ef

            - Use o comando dotnet ef para aplicar as migrations e atualizar o banco de dados:
                dotnet ef database update

            Este comando aplicará todas as migrations pendentes e criará o banco de dados com a estrutura definida.

            - Pacotes utilizados para o uso do banco de dados Sql Server

        1. Microsoft.EntityFrameworkCore.SqlServer

            Este pacote permite que o Entity Framework Core se conecte ao SQL Server.

        2. Microsoft.EntityFrameworkCore.Tools

            Este pacote fornece ferramentas adicionais para trabalhar com o Entity Framework Core, como comandos de migração.

        3. Microsoft.Extensions.Configuration

        Este pacote é útil para gerenciar configurações, como strings de conexão.

        4. Microsoft.Extensions.Configuration.Json

            Este pacote permite carregar configurações de arquivos JSON, como appsettings.json.

        5. Microsoft.Extensions.DependencyInjection

            Este pacote é usado para configurar a injeção de dependência no seu projeto.

## Alteração de porta da api

Caso seja necessário alterar a porta no arquivo appsettings.Development.json

- Exemplo: apiURL: Atual "OrigemAngular": "http://localhost:4200" para "OrigemAngular": "http://localhost:4250"

# Configurção FrontEnd

## Alteração de porta da web

Caso seja necessário alterar a porta no arquivo environment.development.ts

- Exemplo: apiURL: Atual 'http://localhost:5111' para apiURL: 'http://localhost:5222'
