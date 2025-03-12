package io.github.karinelucion.serverapi.fornecedor;

import javax.enterprise.context.RequestScoped;
import io.github.karinelucion.serverapi.fornecedor.dto.FornecedorRequest;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.produto.Produto;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.core.Response;
import java.util.Set;
import java.util.List;

@RequestScoped
public class FornecedorResource {
    private FornecedorRepository repository;
    private Validator validator;

    @Inject
    public FornecedorResource(FornecedorRepository repository, Validator validator){
        this.repository = repository;
        this.validator = validator;
    }

    @Transactional
    public Response criar(FornecedorRequest fornecedorRequest){
        Set<ConstraintViolation<FornecedorRequest>> violations = validator.validate(fornecedorRequest);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations)
                    .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setRazaosocial(fornecedorRequest.getRazaosocial());
        fornecedor.setEmail(fornecedorRequest.getEmail());
        fornecedor.setCnpj(fornecedorRequest.getCnpj());
        fornecedor.setTelefone(fornecedorRequest.getTelefone());
        fornecedor.setSituacao(fornecedorRequest.getSituacao());
        fornecedor.setDatabaixa(fornecedorRequest.getDatabaixa());

        repository.persist(fornecedor);

        return Response
                .status(Response.Status.CREATED.getStatusCode())
                .entity(fornecedor)
                .build();
    }

    public List<Fornecedor> listarTodosFornecedores(){
        return repository.findAll().list();
    }

    public Fornecedor buscarFornecedorPorId(Long id){
        return repository.findById(id);
    }

    public List<Fornecedor> buscarFornecedorFiltro(String razaosocial) {
        return repository.buscarPorRazaoSocial(razaosocial);
    }
    public List<Fornecedor> buscarFornecedorAtivo() {
        return repository.buscarPorSituacaoAtivo("ATIVO");
    }

    @Transactional
    public Response deletarFornecedor(Long id){
        Fornecedor fornecedor = repository.findById(id);

        if(fornecedor != null){
            repository.delete(fornecedor);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    public Response atualizarFornecedor(Long id, FornecedorRequest fornecedorRequest){
        Set<ConstraintViolation<FornecedorRequest>> violations = validator.validate(fornecedorRequest);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations)
                    .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        Fornecedor fornecedor = repository.findById(id);

        if(fornecedor != null){
            fornecedor.setRazaosocial(fornecedorRequest.getRazaosocial());
            fornecedor.setEmail(fornecedorRequest.getEmail());
            fornecedor.setCnpj(fornecedorRequest.getCnpj());
            fornecedor.setTelefone(fornecedorRequest.getTelefone());
            fornecedor.setSituacao(fornecedorRequest.getSituacao());
            fornecedor.setDatabaixa(fornecedorRequest.getDatabaixa());

            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
