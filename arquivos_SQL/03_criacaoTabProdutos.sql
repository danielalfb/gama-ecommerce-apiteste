CREATE TABLE `Produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `preco` decimal(7,2) DEFAULT NULL,
  `qtdestoque` int DEFAULT NULL,
  `disponivel` int NOT NULL,
  `emdestaque` int NOT NULL,
  `deptid` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_deptid FOREIGN KEY (deptid) REFERENCES Departamentos(id)
);