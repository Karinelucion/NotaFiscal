package io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal;

import io.github.karinelucion.serverapi.notafiscal.NotaFiscal;
import io.github.karinelucion.serverapi.produto.Produto;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@Entity
@Table(name = "itemnotafiscal")
@SequenceGenerator(name = "seq_itemnotafiscal", sequenceName = "seq_itemnotafiscal", allocationSize = 1)
public class ItemNotaFiscal {
    @Id
    @GeneratedValue(generator = "seq_itemnotafiscal", strategy = GenerationType.SEQUENCE)
    @Column(name = "itemnotafiscalid")
    private long id;

    @NotNull
    @Column(name = "valorunitario")
    private Float valorunitario;

    @NotNull
    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "valortotal")
    private Float valortotal;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "produtoid")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "notafiscalid")
    private NotaFiscal notaFiscal;

}
