package io.github.karinelucion.serverapi.produto.dto;

import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ProdutoRequest {
    @NotBlank(message = "A descricao é obrigatória")
    @Size(min = 3, max = 100, message = "O tamanho da descricao deve estar entre 3 e 100 caracteres")
    private String descricao;

    private Float preco;

    @NotNull(message = "A situação é obrigatória")
    private SituacaoProdutoEnum situacao;
}
