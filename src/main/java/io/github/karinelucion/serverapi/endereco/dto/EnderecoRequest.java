package io.github.karinelucion.serverapi.endereco.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class EnderecoRequest {
    @NotNull(message = "O cep é obrigatório")
    @Size(max = 8, message = "O tamanho do cep deve ser menor ou igual a 8 caracteres")
    private String cep;

    @NotNull(message = "O logradouro é obrigatório")
    @Size(max = 255, message = "O tamanho do logradouro deve ser menor ou igual a 255 caracteres")
    private String logradouro;

    @Size(max = 255, message = "O tamanho do complemento deve ser menor ou igual a 255 caracteres")
    private String complemento;

    @Size(max = 100, message = "O tamanho do bairro deve ser menor ou igual a 100 caracteres")
    private String bairro;

    @Size(max = 100, message = "O tamanho da localidade deve ser menor ou igual a 100 caracteres")
    @NotNull(message = "A cidade é obrigatória")
    private String localidade;

    @Size(max = 2, message = "O tamanho do estado deve ser menor ou igual a 2 caracteres")
    @NotNull(message = "O estado é obrigatório")
    private String uf;

    @Size(max = 10, message = "O tamanho do numero deve ser menor ou igual a 10 caracteres")
    private String numero;
}
