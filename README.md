# GAMA ACADEMY E-COMMERCE - REST API

API construída como mockup para a integração de um sistema de gerenciamento de e-commerce.

## Dependências

Esta aplicação tem como dependência:

- ExpressJS
- Nodemon
- MySQL 2

## Clonando o repositório

No cmd, navegue até o diretório em que deseja clonar o repositório.

Dentro do diretório, utilize o comando:

```
$ git clone https://github.com/danielalfb/gama-ecommerce-api.git
```

## Instalando as dependências

    npm install

## Executando a aplicação

    npm run dev

# REST API

A REST API construída esta especificada abaixo.

## **Host e porta**

<http://localhost:3000/>

## **Instruções para teste**

1.  Clone o repositório;
2.  Abra o MySQL Workbench;
3.  Entre em sua conexão;
4.  Rode os seguintes scripts obrigatoriamente na seguinte ordem:

    a. [01 Criação Schema](arquivos_SQL/01_criacaoSchema.sql)

    b. [02 Criação Tab_Departamentos](arquivos_SQL/02_criacaoTabDepartamentos.sql)

    c. [03 Criação Tab_Produtos](arquivos_SQL/03_criacaoTabProdutos.sql)

    d. [04 Inserção dos Departamentos](arquivos_SQL/04_insercaoDepartamentos.sql)

    e. [05 Inserção dos Produtos](arquivos_SQL/04_insercaoProdutos.sql)

5.  Abra o arquivo [_dbconfig_](src/config/dbconfig.js) e substitua por suas informações de conexão, como no exemplo abaixo:

    ```js
    module.exports = {
      host: 'localhost',
      user: 'SEU_USER',
      password: 'SUA_SENHA',
      db: 'gama-restapi',
    };
    ```

6.  Rode o comando de execução e a mensagem "Conectado a base de dados" aparecerá no console.

### **Divirta-se!**

---

## **Métodos**

### **Método 1: GET**

Retorna a lista de todos os produtos existentes.

### **ENDPOINT**

`/produtos`

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      "id": 1,
      "nome": "ADAPTADOR BLUETOOH USB RECEPTOR DE AUDIO P2",
      "preco": 5,
      "qtdestoque": 10,
      "disponivel": "1",
      "emdestaque": "1",
      "deptid": 1,
      "nomedodept": "Adaptadores"
    },
    {
      "id": 2,
      "nome": "ALICATE PARA CRIMPAR TL-315 3 EM 1",
      "preco": 15,
      "qtdestoque": 16,
      "disponivel": "1",
      "emdestaque": "1",
      "deptid": 2,
      "nomedodept": "Ferramentas"
    },
    {
      "id": 3,
      "nome": "CAMERA WEBCAM LOGITECH C270 HD 960-000694",
      "preco": 41,
      "qtdestoque": 27,
      "disponivel": "1",
      "emdestaque": "0",
      "deptid": 3,
      "nomedodept": "Eletronicos"
    },
    {
      "id": 4,
      "nome": "ASPIRADOR NAPPO NLAR-063 ROBOT WIFI 350ML PRETO",
      "preco": 87,
      "qtdestoque": 2,
      "disponivel": "1",
      "emdestaque": "0",
      "deptid": 4,
      "nomedodept": "Casa"
    }
  ]
  ```

### **Resposta de erro**

Dispara caso a tabela de Produtos esteja vazia.

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "err": "Nenhum produto cadastrado."
  }
  ```

---

### **Método 2: GET**

Retorna os detalhes de 1 único produto.

### **ENDPOINT**

`/produtos/{id}`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

Nenhum

### **Resposta de sucesso**

- Requisição:

  `/produtos/1`

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      "id": 1,
      "nome": "ADAPTADOR BLUETOOH USB RECEPTOR DE AUDIO P2",
      "preco": 5,
      "qtdestoque": 10,
      "disponivel": "1",
      "emdestaque": "1",
      "deptid": 1,
      "nomedodept": "Adaptadores"
    }
  ]
  ```

### **Resposta de erro**

- Requisição:

  `/produtos/10`

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "err": "Produto não encontrado."
  }
  ```

---

### **Método 3: POST**

Recebe um JSON com dados de um produto e o inclui na base de dados.

### **ENDPOINT**

`/produto`

### **Parâmetro de requisição na URL**

Nenhum

### **Parâmetro de requisição no BODY**

```
{
  "nome": STRING,
  "preco": INT,
  "qtd_estoque": INT,
  "disponivel": "1" || "0",
  "em_destaque": "1" || "0",
  "id_dept": INT
}
```

### **Resposta de sucesso**

- Requisição:

  ```json
  {
    "nome": "SSD Kingston A400, 1TB",
    "preco": 699,
    "qtdestoque": 50,
    "disponivel": "1",
    "emdestaque": "1",
    "deptid": 1
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-201%20CREATED-brightgreen)

- Conteúdo:

  ```json
  {
    "message": "Produto cadastrado com sucesso."
  }
  ```

### **Respostas de erro**

- Requisição:

  ```json
  {
    "nome": "SSD Kingston A400, 1TB",
    "preco": 0,
    "qtdestoque": 50,
    "disponivel": "1",
    "emdestaque": "1",
    "deptid": 1
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "err": "O preço do produto não pode ser 0."
  }
  ```

  #### **_OU_**

- Requisição:

  ```json
  {
    "nome": "SSD Kingston A400, 1TB",
    "preco": 699,
    "disponivel": "1",
    "emdestaque": "1",
    "deptid": 1
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "err": "Preenchimento incorreto, cheque os campos."
  }
  ```

---

### **Método 4: PUT**

Recebe um JSON com dados de um produto, cujo ID é especificado na URL e atualiza seus dados na base de dados.

### **ENDPOINT**

`/produto/{id}`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

```
{
  "nome": STRING,
  "preco": INT,
  "qtd_estoque": INT,
  "disponivel": "1" || "0",
  "em_destaque": "1" || "0",
  "id_dept": INT
}
```

### **Resposta de sucesso**

- Requisição na URL:

  `/produtos/3`

- Requisição no BODY:

  ```json
  {
    "nome": "CAMERA WEBCAM LOGITECH C270 HD 960-000694",
    "preco": 39.9,
    "qtdestoque": 25,
    "disponivel": "1",
    "emdestaque": "1",
    "deptid": 3
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  {
    "message": "Produto editado com sucesso."
  }
  ```

### **Respostas de erro**

- Requisição na URL:

  `/produtos/10`

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "err": "Produto não encontrado."
  }
  ```

  #### **_OU_**

- Requisição na URL:

  `/produtos/3`

- Requisição no BODY:

  ```json
  {
    "nome": "CAMERA WEBCAM LOGITECH C270 HD 960-000694",
    "preco": 39.9,
    "qtdestoque": 25,
    "disponivel": "1",
    "emdestaque": "1"
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "err": "Preenchimento incorreto, cheque os campos."
  }
  ```

  #### **_OU_**

- Requisição na URL:

  `/produtos/3`

- Requisição no BODY:

  ```json
  {
    "nome": "CAMERA WEBCAM LOGITECH C270 HD 960-000694",
    "preco": 0,
    "qtdestoque": 25,
    "disponivel": "1",
    "emdestaque": "1",
    "deptid": 3
  }
  ```

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "err": "O preço do produto não pode ser 0."
  }
  ```

---

### **Método 5: GET**

Retorna a lista de todos os departamentos existentes.

### **ENDPOINT**

`/departamentos`

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      "id": 1,
      "nome": "Adaptadores"
    },
    {
      "id": 2,
      "nome": "Ferramentas"
    },
    {
      "id": 3,
      "nome": "Eletronicos"
    },
    {
      "id": 4,
      "nome": "Casa"
    }
  ]
  ```

### **Resposta de erro**

Dispara caso a tabela de Departamentos esteja vazia.

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "err": "Não existem departamentos cadastrados."
  }
  ```

---

### **Método 6: GET**

Retorna o departamento e a lista de produtos que estão associadas a ele.

### **ENDPOINT**

`/departamentos/{id}`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

Nenhum

### **Resposta de sucesso**

- Requisição:

  `/departamentos/2`

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      "deptid": 2,
      "deptnome": "Ferramentas",
      "produtoid": 2,
      "produtonome": "ALICATE PARA CRIMPAR TL-315 3 EM 1"
    }
  ]
  ```

### **Resposta de erro**

- Requisição:

  `/departamentos/12`

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "err": "Departamento não encontrado."
  }
  ```

---

### **Parabéns! Você compilou com sucesso! Obrigada pela participação!**
