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
    'SELECT produtos.*, departamentos.nome as nomedodept FROM `gama-restapi`.produtos JOIN `gama-restapi`.departamentos on produtos.deptid = departamentos.id',
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
  const qry =
    'INSERT INTO `gama-restapi`.produtos (nome, preco, qtdestoque, disponivel, emdestaque, deptid) VALUES (?,?,?,?,?,?)';

  if (!nome || !qtdestoque || !disponivel || !emdestaque || !deptid) {
    return res
      .status(400)
      .json({ err: 'Preenchimento incorreto, cheque os campos.' });
  } else if (produto.preco === 0 || !produto.preco) {
    return res.status(400).json({ err: 'O preço do produto não pode ser 0.' });
  } else {
    connection.query(qry, values, (err, rows, fields) => {
      if (err) throw err;
      return res
        .status(201)
        .json({ message: 'Produto cadastrado com sucesso.' });
    });
  }
});

router.put('/produtos/:produtoId', (req, res) => {
  const produto = req.body;
  const values = [
    produto.nome,
    produto.preco,
    produto.qtdestoque,
    produto.disponivel,
    produto.emdestaque,
    produto.deptid,
    req.params.produtoId,
  ];

  const { nome, qtdestoque, disponivel, emdestaque, deptid } = produto;
  const qry =
    'UPDATE `gama-restapi`.`produtos` SET nome = ?, preco = ?, qtdestoque = ?, disponivel = ?, emdestaque = ?, deptid = ? WHERE id = ?';

  if (!nome || !qtdestoque || !disponivel || !emdestaque || !deptid) {
    return res
      .status(400)
      .json({ err: 'Preenchimento incorreto, cheque os campos.' });
  } else if (produto.preco === 0 || !produto.preco) {
    return res.status(400).json({ err: 'O preço do produto não pode ser 0.' });
  } else {
    connection.query(qry, values, (err, rows, fields) => {
      if (rows.id !== req.params.produtoId)
        return res.status(404).json({ message: 'Produto não encontrado.' });
      if (err) throw err;
      return res.status(200).json({ message: 'Produto editado com sucesso.' });
    });
  }
});

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
    'SELECT departamentos.id as deptid, departamentos.nome as deptnome, produtos.id as produtoid, produtos.nome as produtonome FROM `gama-restapi`.departamentos INNER JOIN `gama-restapi`.produtos on departamentos.id = produtos.deptid WHERE departamentos.id = ?',
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
