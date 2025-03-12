package io.github.karinelucion.serverapi.fornecedor.dto;

import io.github.karinelucion.serverapi.fornecedor.enums.SituacaoFornecedorEnum;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class FornecedorRequest {
    @NotBlank(message = "A razaosocial é obrigatória")
    private String razaosocial;

    @NotBlank(message = "O email é obrigatório")
    @Size(min = 3, max = 100, message = ("O tamanho do email deve estar entre 3 e 100 caracteres"))
    private String email;

    private String telefone;

    @NotBlank(message = "O cnpj é obrigatório")
    @Size(min = 3, max = 18, message = ("O tamanho do cnpj deve estar entre 3 e 18 caracteres"))
    private String cnpj;

    @NotNull(message = "A situação é obrigatória")
    private SituacaoFornecedorEnum situacao;

    private LocalDate databaixa;
}
