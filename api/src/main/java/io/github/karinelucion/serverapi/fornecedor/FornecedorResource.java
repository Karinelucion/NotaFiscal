package io.github.karinelucion.serverapi.fornecedor;

import javax.enterprise.context.RequestScoped;
import io.github.karinelucion.serverapi.fornecedor.dto.FornecedorRequest;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.fornecedor.enums.SituacaoFornecedorEnum;
import io.github.karinelucion.serverapi.fornecedor.validacoes.ValidacaoFornecedor;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
public class FornecedorResource {
    private FornecedorRepository repository;
    private final ValidacaoFornecedor validacaoFornecedor;


    @Inject
    public FornecedorResource(FornecedorRepository repository, ValidacaoFornecedor validacaoFornecedor){
        this.repository = repository;
        this.validacaoFornecedor = validacaoFornecedor;
    }

    @Transactional
    public Response criar(FornecedorRequest fornecedorRequest){
        Fornecedor fornecedor = new Fornecedor();
        ResponseError responseError = validacaoFornecedor.validarPersistenciaFornecedor(fornecedorRequest, fornecedor.getId());


        if (responseError != null) {
            return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

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
        return repository.buscarPorSituacaoAtivo(SituacaoFornecedorEnum.ATIVO);
    }

    @Transactional
    public Response deletarFornecedor(Long id){
        Fornecedor fornecedor = repository.findById(id);
        if (fornecedor != null) {
            ResponseError responseError = validacaoFornecedor.validarExclusaoFornecedor(id);

            if (responseError != null) {
                return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
            }

            try {
                repository.delete(fornecedor);
                return Response.noContent().build();
            } catch (Exception e) {
                e.printStackTrace();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }

        return Response.status(Response.Status.NOT_FOUND).build();

    }

    @Transactional
    public Response atualizarFornecedor(Long id, FornecedorRequest fornecedorRequest){
        ResponseError responseError = validacaoFornecedor.validarPersistenciaFornecedor(fornecedorRequest, id);
        if (responseError != null) {
            return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
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
