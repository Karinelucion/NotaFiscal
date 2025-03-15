CREATE SEQUENCE seq_fornecedor;

CREATE TABLE fornecedor (
    fornecedorid BIGINT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    situacao VARCHAR(10) NOT NULL,
    databaixa DATE,
    razaosocial VARCHAR(100) NOT NULL
);