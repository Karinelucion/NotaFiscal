package io.github.karinelucion.serverapi.fornecedor.validacoes;

import io.github.karinelucion.serverapi.error.FieldError;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.fornecedor.FornecedorRepository;
import io.github.karinelucion.serverapi.fornecedor.dto.FornecedorRequest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@RequestScoped
public class ValidacaoFornecedor {

    private final FornecedorRepository fornecedorRepository;

    private Validator validator;


    @Inject
    public ValidacaoFornecedor(FornecedorRepository fornecedorRepository, Validator validator) {
        this.fornecedorRepository = fornecedorRepository;
        this.validator = validator;
    }

    public ResponseError validarExclusaoFornecedor(Long fornecedorId) {
        boolean fornecedorReferenciado = fornecedorRepository.verificarFornecedorReferenciadoEmNotaFiscal(fornecedorId);

        if (fornecedorReferenciado) {
            FieldError fieldError = new FieldError(
                    "produto",
                    "Não é possível excluir um fornecedor que já foi utilizado em outro registro. Se necessário, você pode alterar a situacão do fornecedor."
            );
            return new ResponseError("Erro de exclusão", List.of(fieldError));
        }

        return null;
    }

    public ResponseError validarPersistenciaFornecedor(FornecedorRequest request, long fornecedorid) {
        Set<ConstraintViolation<FornecedorRequest>> violations = validator.validate(request);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations);
        }

        if(fornecedorRepository.existePorCnpj(request.getCnpj(), fornecedorid)){
            FieldError fieldError = new FieldError(
                    "fornecedor",
                    "O CNPJ informado já está vinculado ao cadastro de outro fornecedor"
            );
            return new ResponseError("Erro de validação", List.of(fieldError));
        }

        return null;
    }


}
