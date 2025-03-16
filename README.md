# Sistema de Notas fiscais
Este é um sistema de gerenciamento de produtos, fornecedores e entrada de notas fiscais desenvolvido com as seguintes tecnologias:
- Front-End: Angular 13 + PrimeNG 
- Back-End: Java 11 + Quarkus
- Banco de Dados: PostgreSQL
- Documentação da API: Swagger

## Funcionalidades
- CRUD de Produto
- CRUD de Fornecedor
- CRUD de Nota Fiscal

## Como Rodar o Projeto
### 1. Pré-requisitos
- Java 11
- Node.js
- Angular CLI 13
- PostgresSql

### 2. Configuração do Banco de Dados
Altere a URL de conexão com o banco de dados no arquivo application.properties do Quarkus para refletir as configurações de seu banco de dados PostgreSQL.
```
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=youruser
quarkus.datasource.password=yourpassword
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/yourdatabase
```

### 3. Executando o Back-End (Quarkus)
Navegue até o diretório do back-end e execute o comando:
```
./mvnw compile quarkus:dev
```
Isso iniciará o servidor Quarkus em modo de desenvolvimento.

### 4. Executando o Front-End (Angular)
Navegue até o diretório do front-end e instale as dependências:
```
npm install
```
Em seguida, inicie o servidor de desenvolvimento Angular:
```
ng s --o
```
O front-end estará disponível em http://localhost:4200.

### 5. Acessando a Documentação da API
A documentação Swagger da API estará disponível em:
```
[http://localhost:8080/swagger-ui](http://localhost:8080/q/swagger-ui/)
```
