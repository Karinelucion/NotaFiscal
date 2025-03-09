package io.github.karinelucion.serverapi.endereco;

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
            throw new WebApplicationException("Endereço não encontrado para o CEP informado.", 404);
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