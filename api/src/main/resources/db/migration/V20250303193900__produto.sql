CREATE SEQUENCE seq_produto;

CREATE TABLE produto (
    produtoid BIGINT PRIMARY KEY,
    descricao VARCHAR(254) NOT NULL,
    situacao VARCHAR(10) NOT NULL,
    preco DECIMAL(10,2)
);