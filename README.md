# LMS server

## Como usar

### Em modo de desenvolvimento:
1) Crie o arquivo `.env` na raiz do projeto à partir do arquivo `.env_template`
2) Altere as variáveis do arquivo `.env` para as configurações do seu servidor
3) Execute os comandos abaixo:
```sh
npm install
npm run live
```
3) O projeto estará rodando em modo de live reload em `http://localhost:SERVER_PORT`

### Em produção:
1) Crie o arquivo `.env` na raiz do projeto à partir do arquivo `.env_template`
2) Altere as variáveis do arquivo `.env` para as configurações do seu servidor
3) Execute os comandos abaixo:
```sh
npm install
npm start
```
3) O projeto estará rodando em `http://localhost:SERVER_PORT`

Obs.: Na raiz do projeto existe um arquivo de backup do Postman para auxiliar os testes de rotas (`postman_dump.json`)
