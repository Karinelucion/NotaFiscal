package io.github.karinelucion.serverapi.endereco;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.Optional;

@RequestScoped
public class EnderecoRepository implements PanacheRepository<Endereco> {
}
