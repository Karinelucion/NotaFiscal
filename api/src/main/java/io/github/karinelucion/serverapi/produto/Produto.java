package io.github.karinelucion.serverapi.produto;

import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.ItemNotaFiscal;
import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "produto")
@SequenceGenerator(name = "seq_produto", sequenceName = "seq_produto", allocationSize = 1)
public class Produto {
    @Id
    @GeneratedValue(generator = "seq_produto", strategy = GenerationType.SEQUENCE)
    @Column(name = "produtoid")
    private long id;

    @NotNull
    @Column(name = "descricao")
    @Size(min = 3, max = 254)
    private String descricao;

    @Column(name = "preco")
    private Float preco;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SituacaoProdutoEnum situacao;

}
