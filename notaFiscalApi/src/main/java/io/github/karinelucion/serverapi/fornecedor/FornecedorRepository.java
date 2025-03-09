package io.github.karinelucion.serverapi.fornecedor;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class FornecedorRepository implements PanacheRepository<Fornecedor> {
}
