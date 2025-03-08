package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.endereco.dto.EnderecoRequest;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RegisterRestClient(baseUri = "https://viacep.com.br/ws")
public interface ViaCepClient {

    @GET
    @Path("/{cep}/json/")
    @Produces(MediaType.APPLICATION_JSON)
    EnderecoRequest buscarCep(@PathParam("cep") String cep);
}