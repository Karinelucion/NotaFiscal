package io.github.karinelucion.serverapi.notafiscal.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.karinelucion.serverapi.endereco.Endereco;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalRequest;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalResponse;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class NotaFiscalResponse {
    private long id;

    @NotBlank(message = "O numero é obrigatório")
    @Size(min = 1, max = 50, message = ("O tamanho do numero deve estar entre 1 e 50 caracteres"))
    private String numero;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @NotNull(message = "A datahora é obrigatória")
    private LocalDateTime datahora;

    @NotNull(message = "O valor total da nota é obrigatório")
    private Float valortotalnota;

    @NotNull(message = "O endereco é obrigatório")
    private Endereco endereco;

    @NotNull(message = "O fornecedor é obrigatório")
    private Fornecedor fornecedor;

    private List<ItemNotaFiscalResponse> itens;
}
