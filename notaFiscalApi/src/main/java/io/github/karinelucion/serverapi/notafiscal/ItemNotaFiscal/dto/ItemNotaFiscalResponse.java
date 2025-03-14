package io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto;

import io.github.karinelucion.serverapi.produto.Produto;
import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Data
public class ItemNotaFiscalResponse {

    @NotNull(message = "O valor unitario é obrigatório")
    private Float valorunitario;

    @NotNull(message = "A quantidade é obrigatório")
    private int quantidade;

    @NotNull(message = "O produto é obrigatório")
    private Produto produto;

    @Column(name = "valortotal")
    private Float valortotal;
}
