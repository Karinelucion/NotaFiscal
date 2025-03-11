package io.github.karinelucion.serverapi.produto;

import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/produto")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProdutoService {
    private ProdutoResource resource;

    @Inject
    public ProdutoService(ProdutoResource resource){
        this.resource = resource;
    }

    @POST
    public Response criar(ProdutoRequest produtoRequest){
        return resource.criar(produtoRequest);
    }

    @GET
    public Response listarTodosProdutos(){
        return Response.ok(resource.listarTodosProdutos()).build();
    }

    @GET
    @Path("{id}")
    public Response listarPordutoPorId(@PathParam("id") Long id){
        return Response.ok(resource.buscarProdutoPorId(id)).build();
    }

    @DELETE
    @Path("{id}")
    public Response deletarProduto(@PathParam("id") Long id){
        return resource.deletarProduto(id);
    }

    @PUT
    @Path("{id}")
    public Response atualizarProduto(@PathParam("id") Long id, ProdutoRequest produtoRequest){
        return resource.atualizarProduto(id, produtoRequest);
    }

    @GET
    @Path("/pesquisar")
    public Response buscarProdutoFiltro(@QueryParam("descricao") String descricao){
        return Response.ok(resource.buscarProdutoFiltro(descricao)).build();
    }

}
