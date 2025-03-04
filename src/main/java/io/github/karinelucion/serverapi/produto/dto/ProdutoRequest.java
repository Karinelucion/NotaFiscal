package io.github.karinelucion.serverapi.produto.dto;

import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProdutoRequest {
    @NotBlank(message = "A descricao é obrigatória")
    private String descricao;

    private Float preco;

    @NotNull(message = "A situação é obrigatória")
    private SituacaoProdutoEnum situacao;
}
