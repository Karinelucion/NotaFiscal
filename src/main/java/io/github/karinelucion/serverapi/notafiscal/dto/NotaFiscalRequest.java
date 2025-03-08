package io.github.karinelucion.serverapi.notafiscal.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalRequest;
import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class NotaFiscalRequest {
    @NotBlank(message = "O numero é obrigatório")
    @Size(min = 1, max = 50, message = ("O tamanho do numero deve estar entre 1 e 50 caracteres"))
    private String numero;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @NotNull(message = "A datahora é obrigatória")
    private LocalDateTime datahora;

    @NotNull(message = "O valortotal é obrigatório")
    private Float valortotal;

    @NotNull(message = "O endereco é obrigatório")
    private String cep;

    @NotNull(message = "O fornecedor é obrigatório")
    private long fornecedorid;

    @JsonIgnore
    private List<ItemNotaFiscalRequest> itens;
}
