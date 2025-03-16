package io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto;

import io.github.karinelucion.serverapi.produto.Produto;
import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class ItemNotaFiscalRequest {

    @NotNull(message = "O valor unitario é obrigatório")
    private Float valorunitario;

    @NotNull(message = "A quantidade é obrigatório")
    private int quantidade;

    @NotNull(message = "O produto é obrigatório")
    private Produto produto;
}
