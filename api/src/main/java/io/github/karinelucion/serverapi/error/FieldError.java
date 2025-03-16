package io.github.karinelucion.serverapi.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FieldError {
    private String campo;
    private String mensagem;

    public FieldError(String campo, String mensagem) {
        this.campo = campo;
        this.mensagem = mensagem;
    }

}
