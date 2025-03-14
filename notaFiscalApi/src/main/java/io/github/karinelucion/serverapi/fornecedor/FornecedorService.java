package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.fornecedor.dto.FornecedorRequest;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/fornecedor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FornecedorService {
    private FornecedorResource resource;

    @Inject
    public FornecedorService(FornecedorResource resource){
        this.resource = resource;
    }

    @POST
    public Response criar(FornecedorRequest fornecedorRequest){
        return resource.criar(fornecedorRequest);
    }

    @GET
    public Response listarTodosFornecedores(){
        return Response.ok(resource.listarTodosFornecedores()).build();
    }

    @DELETE
    @Path("{id}")
    public Response deletarFornecedor(@PathParam("id") Long id){
        return resource.deletarFornecedor(id);
    }

    @PUT
    @Path("{id}")
    public Response atualizarFornecedor(@PathParam("id") Long id, FornecedorRequest fornecedorRequest){
        return resource.atualizarFornecedor(id, fornecedorRequest);
    }

    @GET
    @Path("{id}")
    public Response listarFornecedorPorId(@PathParam("id") Long id){
        return Response.ok(resource.buscarFornecedorPorId(id)).build();
    }

    @GET
    @Path("/pesquisar")
    public Response buscarFornecedorFiltro(@QueryParam("razaosocial") String razaosocial){
        return Response.ok(resource.buscarFornecedorFiltro(razaosocial)).build();
    }

    @GET
    @Path("/ativo")
    public Response buscarFornecedorAtivo(){
        return Response.ok(resource.buscarFornecedorAtivo()).build();
    }
}
