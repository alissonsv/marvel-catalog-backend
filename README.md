<div align="center">
  <img src="/docs/logo.png" width="200px"/>
  <h1>My Marvel Catalog (Backend)</h1>
</div>

Rest API em Express com as seguintes funções:  
- Cadastro de usuário
- Lista de Personagens e Revistas retiradas direto da API da Marvel
- Lista de Personagens e Revistas favoritos do usuário

## Pré-requisitos
- Node.JS 14.x
- Banco de dados PostgreSQL
- Adquira suas chaves na API da Marvel: [Marvel API](https://developer.marvel.com/)

## Instalação

Clone o repositório e instale as dependências:
``` bash
git clone https://github.com/alissonsv/marvel-catalog-backend/
cd marvel-catalog-backend/
npm install
```

Preencha os parâmetros dentro de `config/.env`:

Variável           | Descrição    
-------------------|-----------
PORT               | Porta onde irá rodar a aplicação
DB_DATABASE        | Nome da tabela no banco de dados
DB_USERNAME        | Nome do usuário no banco de dados
DB_PASSWORD        | Senha do usuário no banco de dados
DB_HOST            | Host onde está rodando o banco de dados
JWT_SECRET         | Senha para assinar o JWT
MARVEL_PUBLIC_KEY  | Chave pública da Marvel API
MARVEL_PRIVATE_KEY | Chave privada da Marvel API


Rode o sistema:
``` bash
# Inicia em modo de desenvolvimento
npm run dev

# Inicia em modo de produção
npm run start
```

## Tecnologias Utilizadas
- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Sequelize](https://sequelize.org/)