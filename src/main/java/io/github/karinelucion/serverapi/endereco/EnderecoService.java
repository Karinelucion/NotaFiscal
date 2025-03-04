package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.endereco.dto.EnderecoDTO;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/endereco")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EnderecoService {
    @Inject
    EnderecoService enderecoService;

    @RestClient
    ViaCepService viaCepService;

    @GET
    @Path("/{cep}")
    public EnderecoDTO buscarEndereco(@PathParam("cep") String cep) {
        return viaCepService.buscarEndereco(cep);
    }
}