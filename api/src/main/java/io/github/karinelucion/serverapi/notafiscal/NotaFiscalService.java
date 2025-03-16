package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalRequest;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Slf4j
@Path("/notafiscal")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NotaFiscalService {
    @Inject
    NotaFiscalResource notaFiscalResource;

    @POST
    public Response criarNotaFiscal(NotaFiscalRequest dto) {
        NotaFiscal notafiscal = notaFiscalResource.criarNotaFiscalComItem(dto);
        return Response.status(Response.Status.CREATED).entity(notafiscal).build();
    }

    @GET
    public List<NotaFiscal> listarTodasNotasFiscais() {
        return notaFiscalResource.listarTodasNotasFiscais();
    }

    @GET
    @Path("{id}")
    public Response listarNotafiscalPorId(@PathParam("id") Long id){
        return Response.ok(notaFiscalResource.buscarNotafiscalPorId(id)).build();
    }

    @DELETE
    @Path("{id}")
    public Response deletarNotaFiscal(@PathParam("id") Long id) {
        return notaFiscalResource.deletarNotaFiscal(id);
    }

    @PUT
    @Path("{id}")
    public Response atualizarNotaFiscal(@PathParam("id") Long id, NotaFiscalRequest notaFiscalRequest) {
        return notaFiscalResource.atualizarNotaFiscal(id, notaFiscalRequest);
    }

    @GET
    @Path("/pesquisar")
    public Response buscarFornecedorFiltro(@QueryParam("numero") String numero){
        return Response.ok(notaFiscalResource.buscarNotaficalFiltro(numero)).build();
    }
}
