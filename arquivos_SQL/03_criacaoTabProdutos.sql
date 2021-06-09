CREATE TABLE `produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `qtdestoque` INT NOT NULL,
  `disponivel` VARCHAR(1) NOT NULL,
  `emdestaque` VARCHAR(1) NOT NULL,
  `deptid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_produto_dept FOREIGN KEY (deptid) REFERENCES Departamentos(id)
);