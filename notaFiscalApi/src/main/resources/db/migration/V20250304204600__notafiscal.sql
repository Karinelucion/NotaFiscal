CREATE SEQUENCE seq_notafiscal;
CREATE SEQUENCE seq_itemnotafiscal;


CREATE TABLE notafiscal (
    notafiscalid SERIAL PRIMARY KEY,
    numero VARCHAR(50) NOT NULL UNIQUE,
    datahora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valortotalnota DECIMAL(10,2) ,
    enderecoid INT NOT NULL,
    fornecedorid INT NOT NULL,
    FOREIGN KEY (enderecoid) REFERENCES endereco(enderecoid),
    FOREIGN KEY (fornecedorid) REFERENCES fornecedor(fornecedorid)
);

CREATE TABLE itemnotafiscal (
    itemnotafiscalid SERIAL PRIMARY KEY,
    valorunitario DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    valortotal DECIMAL(10,2),
    notafiscalid INT NOT NULL,
    produtoid INT NOT NULL,
    FOREIGN KEY (notafiscalid) REFERENCES notafiscal(notafiscalid),
    FOREIGN KEY (produtoid) REFERENCES produto(produtoid)
);