package io.github.karinelucion.serverapi.produto;

import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.quarkus.hibernate.orm.panache.PanacheQuery;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Set;

@Path("/produto")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProdutoService {
    private ProdutoRepository repository;
    private Validator validator;

    @Inject
    public ProdutoService(ProdutoRepository repository, Validator validator){
        this.repository = repository;
        this.validator = validator;
    }

    @POST
    @Transactional
    public Response criar(ProdutoRequest produtoRequest){
        Set<ConstraintViolation<ProdutoRequest>> violations = validator.validate(produtoRequest);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations)
                    .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        Produto produto = new Produto();
        produto.setDescricao(produtoRequest.getDescricao());
        produto.setPreco(produtoRequest.getPreco());
        produto.setSituacao(produtoRequest.getSituacao());

        repository.persist(produto);

        return Response
                .status(Response.Status.CREATED.getStatusCode())
                .entity(produto)
                .build();
    }

    @GET
    public Response listarTodosProdutos(){
        PanacheQuery<Produto> query = repository.findAll();
        return Response.ok(query.list()).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response deletarProduto(@PathParam("id") Long id){
        Produto produto = repository.findById(id);

        if(produto != null){
            repository.delete(produto);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response atualizarProduto(@PathParam("id") Long id, ProdutoRequest produtoRequest){
        Produto produto = repository.findById(id);

        if(produto != null){
            produto.setDescricao(produtoRequest.getDescricao());
            produto.setPreco(produtoRequest.getPreco());
            produto.setSituacao(produtoRequest.getSituacao());

            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

}
