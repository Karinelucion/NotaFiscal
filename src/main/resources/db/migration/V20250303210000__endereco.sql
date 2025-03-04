CREATE SEQUENCE seq_endereco;

CREATE TABLE endereco (
    enderecoid BIGINT PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    numero VARCHAR(10)
);