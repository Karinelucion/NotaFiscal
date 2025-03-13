package io.github.karinelucion.serverapi.endereco;

import io.github.karinelucion.serverapi.error.FieldError;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.notafiscal.NotaFiscal;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;


@ApplicationScoped
public class EnderecoResource {
    @RestClient
    ViaCepClient viaCepClient;

    @Inject
    EnderecoRepository enderecoRepository;

    public Endereco buscarEnderecoPorCep(String cep) {
        var enderecoResponse = viaCepClient.buscarCep(cep);
        if (enderecoResponse == null || enderecoResponse.getCep() == null) {
            FieldError fieldError = new FieldError("cep", "Endereço não encontrado para o CEP informado.");
            ResponseError responseError = new ResponseError("Erro ao buscar o endereço.", List.of(fieldError));
            throw new WebApplicationException(responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS));
        }
        Endereco endereco = new Endereco();
        endereco.setCep(enderecoResponse.getCep().replaceAll("[^0-9]", ""));
        endereco.setLogradouro(enderecoResponse.getLogradouro());
        endereco.setBairro(enderecoResponse.getBairro());
        endereco.setLocalidade(enderecoResponse.getLocalidade());
        endereco.setUf(enderecoResponse.getUf());
        return endereco;
    }

    public List<Endereco> listarTodosEnderecos(){
        return enderecoRepository.findAll().list();
    }
}