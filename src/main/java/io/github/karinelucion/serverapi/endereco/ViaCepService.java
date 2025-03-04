package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.endereco.dto.EnderecoDTO;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/ws")
@RegisterRestClient(configKey = "viacep-api")
public interface ViaCepService {

    @GET
    @Path("/{cep}/json/")
    @Produces("application/json")
    EnderecoDTO buscarEndereco(@PathParam("cep") String cep);
}