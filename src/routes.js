import { Router } from 'express';
const router = new Router();

import mysql from 'mysql2';
import dbconfig from './config/dbconfig';

var connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.bd,
});

connection.connect();

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado à base de dados.');
});

router.get('/produtos', (req, res) => {
  connection.query(
    'SELECT * FROM `gama-restapi`.produtos',
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
});

router.get('/produtos/:produtoId', (req, res) => {
  connection.query(
    'SELECT produtos.*, departamentos.nome as nomedodept  FROM `gama-restapi`.produtos INNER JOIN `gama-restapi`.departamentos on produtos.deptid = departamentos.id WHERE produtos.id = ?',
    [req.params.produtoId],
    (err, rows, fields) => {
      if (err) throw err;
      if (rows.length <= 0) {
        return res.status(404).json({ err: 'Produto não encontrado.' });
      }
      return res.status(200).json(rows);
    },
  );
});

router.post('/produtos', (req, res) => {
  const produto = req.body;
  const values = [
    produto.nome,
    produto.preco,
    produto.qtdestoque,
    produto.disponivel,
    produto.emdestaque,
    produto.deptid,
  ];

  const { nome, qtdestoque, disponivel, emdestaque, deptid } = produto;

  if (!nome || !qtdestoque || !disponivel || !emdestaque || !deptid) {
    return res
      .status(400)
      .json({ err: 'Preenchimento incorreto, cheque os campos.' });
  } else if (produto.preco === 0 || !produto.preco) {
    return res.status(400).json({ err: 'O preço do produto não pode ser 0.' });
  } else {
    const qry =
      'INSERT INTO `gama-restapi`.produtos (nome, preco, qtdestoque, disponivel, emdestaque, deptid) VALUES (?,?,?,?,?,?)';

    connection.query(qry, values, (err, rows, fields) => {
      return res
        .status(200)
        .json({ message: 'Produto cadastrado com sucesso.' });
    });
  }
});

// router.post('/produtos', (req, res) => {
//   const produto = {
//     id: produtos.length + 1,
//     nome: req.body.nome,
//     preco: req.body.preco,
//     qtd_estoque: req.body.qtd_estoque,
//     disponivel: req.body.disponivel,
//     em_destaque: req.body.em_destaque,
//     id_dept: req.body.id_dept,
//     nome_dept: req.body.nome_dept,
//   };

//   const { nome, qtd_estoque, disponivel, em_destaque, id_dept, nome_dept } =
//     produto;

//   if (
//     !nome ||
//     !qtd_estoque ||
//     !disponivel ||
//     !em_destaque ||
//     !id_dept ||
//     !nome_dept
//   ) {
//     return res
//       .status(400)
//       .json({ err: 'Preenchimento incorreto, cheque os campos.' });
//   } else if (produto.preco === 0 || !produto.preco) {
//     return res.status(400).json({ err: 'O preço do produto não pode ser 0.' });
//   } else {
//     produtos.push(produto);
//     return res.status(200).json(produto);
//   }
// });

// router.put('/produtos/:produtoId', (req, res) => {
//   const produto = produtos.find((p) => p.id === parseInt(req.params.produtoId));

//   if (!produto) {
//     return res.status(404).json({ err: 'Produto não existe.' });
//   }

//   produto.nome = req.body.nome;
//   produto.preco = req.body.preco;
//   produto.qtd_estoque = req.body.qtd_estoque;
//   produto.disponivel = req.body.disponivel;
//   produto.em_destaque = req.body.em_destaque;
//   produto.id_dept = req.body.id_dept;
//   produto.nome_dept = req.body.nome_dept;

//   const { nome, qtd_estoque, disponivel, em_destaque, id_dept, nome_dept } =
//     produto;

//   if (
//     !nome ||
//     !qtd_estoque ||
//     !disponivel ||
//     !em_destaque ||
//     !id_dept ||
//     !nome_dept
//   ) {
//     return res
//       .status(400)
//       .json({ err: 'Preenchimento incorreto, cheque os campos.' });
//   } else if (produto.preco === 0 || !produto.preco) {
//     return res.status(400).json({ err: 'O preço do produto não pode ser 0.' });
//   } else {
//     produtos.push(produto);
//     return res.status(200).json(produto);
//   }
// });

router.get('/departamentos', (req, res) => {
  connection.query(
    'SELECT * FROM `gama-restapi`.departamentos',
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
});

router.get('/departamentos/:departamentoId', (req, res) => {
  connection.query(
    'SELECT * FROM `gama-restapi`.produtos WHERE id = ?',
    [req.params.departamentoId],
    (err, rows, fields) => {
      if (err) throw err;
      if (rows.length <= 0) {
        return res.status(404).json({ err: 'Departamento não encontrado.' });
      }
      return res.status(200).json(rows);
    },
  );
});

export default router;
