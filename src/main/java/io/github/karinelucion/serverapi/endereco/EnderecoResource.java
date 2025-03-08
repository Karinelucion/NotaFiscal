package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.endereco.dto.EnderecoRequest;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/endereco")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EnderecoService {
    @RestClient
    ViaCepClient viaCepService;

    @GET
    @Path("/{cep}")
    public EnderecoRequest buscarEndereco(@PathParam("cep") String cep) {
        return viaCepService.buscarEndereco(cep);
    }
}