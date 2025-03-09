package io.github.karinelucion.serverapi.error;

import lombok.Data;

import javax.validation.ConstraintViolation;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ResponseError {
    public static final int UNPROCESSABLE_ENTITY_STATUS = 422;
    private String mensagem;
    private Collection<FieldError> erros;

    public ResponseError(String mensagem, Collection<FieldError> erros) {
        this.mensagem = mensagem;
        this.erros = erros;
    }

    public static <T> ResponseError validaCriacaoDoForm(Set<ConstraintViolation<T>> violacoes){
        List<FieldError> errors = violacoes
                .stream()
                .map(cv -> new FieldError(cv.getPropertyPath().toString(),
                        cv.getMessage()))
                .collect(Collectors.toList());

        String mensagem = "Erro de validacao";

        var responseError = new ResponseError(mensagem, errors);

        return responseError;
    }

    public Response comStatusCode(int code){
        return Response.status(code).entity(this).build();
    }
}
