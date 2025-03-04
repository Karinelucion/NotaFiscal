package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.fornecedor.enums.SituacaoFornecedorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "fornecedor")
@SequenceGenerator(name = "seq_fornecedor", sequenceName = "seq_fornecedor", allocationSize = 1)
public class Fornecedor {
    @Id
    @GeneratedValue(generator = "seq_fornecedor", strategy = GenerationType.SEQUENCE)
    @Column(name = "fornecedorid")
    private long id;

    @NotNull
    @Column(name = "razaosocial")
    @Size(min = 3, max = 100)
    private String razaosocial;

    @NotNull
    @Column(name = "email", unique = true)
    @Size(min = 3, max = 100)
    private String email;

    @Column(name = "telefone")
    @Size(min = 3, max = 20)
    private String telefone;

    @NotNull
    @Column(name = "cnpj", unique = true)
    @Size(min = 3, max = 18)
    private String cnpj;

    @NotNull
    @Column(name = "situacao")
    private SituacaoFornecedorEnum situacao;

    @Column(name = "databaixa")
    private LocalDate databaixa;
}
