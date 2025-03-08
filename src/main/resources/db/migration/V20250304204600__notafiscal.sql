CREATE SEQUENCE seq_notafiscal;

CREATE TABLE notafiscal (
    notafiscalid SERIAL PRIMARY KEY,
    numero VARCHAR(50) NOT NULL UNIQUE,
    datahora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valortotal DECIMAL(10,2) NOT NULL,
    enderecoid INT NOT NULL,
    fornecedorid INT NOT NULL,
    FOREIGN KEY (enderecoid) REFERENCES endereco(enderecoid) ON DELETE CASCADE,
    FOREIGN KEY (fornecedorid) REFERENCES fornecedor(fornecedorid) ON DELETE CASCADE
);