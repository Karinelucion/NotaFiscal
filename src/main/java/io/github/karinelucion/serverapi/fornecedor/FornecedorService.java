package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.fornecedor.dto.FornecedorRequest;
import io.quarkus.hibernate.orm.panache.PanacheQuery;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Set;

@Path("/fornecedor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FornecedorService {
    private FornecedorRepository repository;
    private Validator validator;

    @Inject
    public FornecedorService(FornecedorRepository repository, Validator validator){
        this.repository = repository;
        this.validator = validator;
    }

    @POST
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

    @GET
    public Response listarTodosFornecedores(){
        PanacheQuery<Fornecedor> query = repository.findAll();
        return Response.ok(query.list()).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response deletarFornecedor(@PathParam("id") Long id){
        Fornecedor fornecedor = repository.findById(id);

        if(fornecedor != null){
            repository.delete(fornecedor);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response atualizarFornecedor(@PathParam("id") Long id, FornecedorRequest fornecedorRequest){
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
