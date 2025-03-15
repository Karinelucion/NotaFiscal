package io.github.karinelucion.serverapi.produto.validacoes;

import io.github.karinelucion.serverapi.error.FieldError;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.produto.ProdutoRepository;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ValidacaoProduto {

    private final ProdutoRepository produtoRepository;

    private Validator validator;


    @Inject
    public ValidacaoProduto(ProdutoRepository produtoRepository, Validator validator) {
        this.produtoRepository = produtoRepository;
        this.validator = validator;
    }

    public ResponseError validarExclusaoProduto(Long produtoId) {
        boolean produtoReferenciado = produtoRepository.verificarProdutoReferenciadoEmItemNotaFiscal(produtoId);

        if (produtoReferenciado) {
            FieldError fieldError = new FieldError(
                    "produto",
                    "Não é possível excluir um produto que já foi utilizado em outro registro. Se necessário, você pode inativar o produto."
            );
            return new ResponseError("Erro de exclusão", List.of(fieldError));
        }

        return null;
    }

    public ResponseError validarPersistenciaProduto(ProdutoRequest request) {
        Set<ConstraintViolation<ProdutoRequest>> violations = validator.validate(request);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations);
        }
        return null;
    }

}
