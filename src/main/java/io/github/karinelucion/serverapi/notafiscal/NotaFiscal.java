package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.endereco.Endereco;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.ItemNotaFiscal;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "notafiscal")
@SequenceGenerator(name = "seq_notafiscal", sequenceName = "seq_notafiscal", allocationSize = 1)
public class NotaFiscal {
    @Id
    @GeneratedValue(generator = "seq_notafiscal", strategy = GenerationType.SEQUENCE)
    @Column(name = "notafiscalid")
    private long id;

    @NotNull
    @Column(name = "numero", unique = true)
    @Size(min = 1, max = 50)
    private String numero;

    @NotNull
    @Column(name = "datahora")
    private LocalDateTime datahora;

    @NotNull
    @Column(name = "valortotal")
    private Float valortotal;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "enderecoid")
    private Endereco endereco;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "fornecedorid")
    private Fornecedor fornecedor;

    @OneToMany(mappedBy = "notaFiscal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemNotaFiscal> itens = new ArrayList<>();
}
