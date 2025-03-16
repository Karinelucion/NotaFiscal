package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.notafiscal.NotaFiscal;
import io.github.karinelucion.serverapi.notafiscal.NotaFiscalRepository;
import io.github.karinelucion.serverapi.notafiscal.NotaFiscalResource;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/endereco")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EnderecoService {
    @Inject
    EnderecoResource enderecoResource;

    @GET
    public List<Endereco> listarTodosEnderecos() {
        return enderecoResource.listarTodosEnderecos();
    }

    @GET
    @Path("/buscaporcep/{cep}")
    public Endereco buscaEnderecoPorCep(@PathParam("cep") String cep){
        return enderecoResource.buscarEnderecoPorCep(cep);
    }
}
